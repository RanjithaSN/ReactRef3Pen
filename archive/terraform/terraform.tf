########################################
########## REMOTE BACKENDS & PROVIDERS
########################################
terraform {
  backend "s3" {
    key             = "selfcare.tfstate"
    dynamodb_table  = "terraform-state-locking"
  }
  required_version = "0.11.8"
}

provider "aws" {
  region  = "${var.target_region}"
  version = "1.49.0"
}

# NOTE: CloudFront requires ACM-generated certificates to be in "us-east-1" regardless of region and
# Lambda functions are global so a second, aliased provider is necessary
provider "aws" {
  alias   = "useast1"
  region  = "us-east-1"
  version = "1.49.0"
}

########################################
########## VARIABLES
########################################
# Variables without a default value.
variable "environment_id" {
  type = "string"
}

# SelfCare-specific
# NOTE: SelfCare contains multiple versions so `selfcare_app_versions` is used instead of `version`
variable "selfcare_app_names" {
  type = "list"
}

variable "selfcare_app_versions" {
  type = "list"
}

# Variables that have a default value.

# NOTE: SelfCare contains multiple versions so `selfcare_app_versions` is used instead
# but `version` is defaulted to an empty value for consistency and any
# downstream assumptions (e.g. resource reporting)
variable "version" {
  type    = "string"
  default = ""
}

variable "target_region" {
  type    = "string"
  default = "us-east-1"
}

variable "source_tag" {
  type    = "string"
  default = "Terraform"
}

variable "owner_tag" {
  type    = "string"
  default = "WebArchitecture"
}

variable "support_category_tag" {
  type    = "string"
  default = "1"
}

variable "lifecycle_tag" {
  type    = "string"
  default = "1"
}

variable "project_tag" {
  type    = "string"
  default = "Ascendon SelfCare"
}

variable "environment_type_tag" {
  type    = "string"
  default = "development"
}

variable "contact_tag" {
  type    = "string"
  default = "webarchitecture@csgsystems.onmicrosoft.com"
}

########################################
########## LOCALS
########################################
locals {
  service_name = "SelfCare"
  common_tags = {
    Source  = "${var.source_tag}"
    Owner  = "${var.owner_tag}"
    Name  = "${var.environment_id}-${local.service_name}"
    Solution  = "${local.service_name}"
    SupportCategory  = "${var.support_category_tag}"
    Lifecycle  = "${var.lifecycle_tag}"
    Project  = "${var.project_tag}"
    EnvironmentType  = "${var.environment_type_tag}"
    Environment  = "${var.environment_id}"
    Contact  = "${var.contact_tag}"
  }
  LastModifiedTime = "${timestamp()}"
  LastModifiedBy = "${data.aws_caller_identity.current.arn}"

  # SelfCare-specific
  cache_duration_day  = 86400
  cache_duration_none = 0
  cache_duration_week = 604800
  cache_duration_year = 31536000

  # NOTE: Parse the environment "type" from `environment_id` to toggle various properties
  # (e.g. CloudFront distribution "price class", CloudFront distribution "trusted_signers" for styleguide access, and S3 CORS configuration)
  environment_id_prefix = "${lower(replace(replace(substr(var.environment_id, 0, 3), "/^(ci|qa)([0-9]{1,2})/", "$1::x"), "::", ""))}"

  # NOTE: The mapping of environment name to AWS account for `selfcare_s3_bucket_type_names` is taken from https://confluence.csgicorp.com/x/xgrhKg
  # NOTE: `selfcare_s3_config_origin_path` references the SelfCare build since that's the only application that has the environment configurations
  # TODO: Refactor "environment type" mappings
  selfcare_cf_distribution_price_class = {
    bor = "PriceClass_100"
    cix = "PriceClass_100"
    edg = "PriceClass_100"
    int = "PriceClass_100"
    mig = "PriceClass_200"
    nig = "PriceClass_100"
    ops = "PriceClass_200"
    prd = "PriceClass_All"
    prf = "PriceClass_200"
    qax = "PriceClass_100"
    sbx = "PriceClass_200"
    sls = "PriceClass_200"
    stg = "PriceClass_All"
    tig = "PriceClass_200"
  }
  selfcare_cf_route_lambda_filename = "cloudfront_route.js"
  selfcare_cf_distribution_trusted_signers = {
    bor = []
    cix = []
    edg = []
    int = []
    mig = ["self"]
    nig = []
    ops = ["self"]
    prd = ["self"]
    prf = []
    qax = []
    sbx = []
    sls = []
    stg = ["self"]
    tig = []
  }
  selfcare_fqdn = "selfcare.${data.terraform_remote_state.environment_state.environment_domain_suffix}"
  selfcare_index = 0
  selfcare_lambda_runtime = "nodejs8.10"
  selfcare_s3_bucket_type_names = {
    bor = "unstable"
    cix = "unstable"
    edg = "unstable"
    int = "stable"
    mig = "stable"
    nig = "unstable"
    ops = "stable"
    prd = "stable"
    prf = "stable"
    qax = "unstable"
    sbx = "stable"
    sls = "stable"
    stg = "stable"
    tig = "stable"
  }
  selfcare_s3_config_origin_path = "/${var.selfcare_app_names[local.selfcare_index]}/${var.selfcare_app_versions[local.selfcare_index]}/code/terraform/environments/${var.environment_id}"
  selfcare_s3_artifact_bucket_name = "asc-selfcare-${local.selfcare_s3_bucket_type_names[local.environment_id_prefix]}-${var.target_region}-${data.aws_caller_identity.current.account_id}"
}

########################################
########## DATA SOURCES
########################################
data "aws_caller_identity" "current" {}

data "aws_region" "current" {}

data "terraform_remote_state" "environment_state" {
  backend   = "s3"
  workspace = "${var.environment_id}"

  config {
    bucket         = "terraform-${data.aws_caller_identity.current.account_id}"
    key            = "microservices-environment.tfstate"
    dynamodb_table = "terraform-state-locking"
    region         = "us-east-1"
  }
}

# SelfCare-specific
data "archive_file" "selfcare_cf_route_lambda_zip" {
  output_path = "${local.selfcare_cf_route_lambda_filename}.zip"
  source_file = "${local.selfcare_cf_route_lambda_filename}"
  type        = "zip"
}

data "aws_s3_bucket" "selfcare_artifact_bucket" {
  bucket = "${local.selfcare_s3_artifact_bucket_name}"
}

data "template_file" "selfcare_lambda_assume_role_policy_contents" {
  template = "${file("lambda_assume_role_policy.json")}"
}

data "template_file" "selfcare_lambda_role_policy_contents" {
  template = "${file("lambda_role_policy.json")}"
}

########################################
########## RESOURCES
########################################

# ACM
# NOTE: CloudFront requires ACM-generated certificates to be in "us-east-1" regardless of region
# so an "aliased" provider is used here
resource "aws_acm_certificate" "selfcare_certificate" {
  domain_name       = "${local.selfcare_fqdn}"
  provider          = "aws.useast1"
  validation_method = "DNS"

  # Tags defined in locals only.
  tags = "${local.common_tags}"
}

resource "aws_route53_record" "selfcare_certificate_validation_record" {
  name      = "${aws_acm_certificate.selfcare_certificate.domain_validation_options.0.resource_record_name}"
  provider  = "aws.useast1"
  records   = ["${aws_acm_certificate.selfcare_certificate.domain_validation_options.0.resource_record_value}"]
  ttl       = 60
  type      = "${aws_acm_certificate.selfcare_certificate.domain_validation_options.0.resource_record_type}"
  zone_id   = "${data.terraform_remote_state.environment_state.public_zone_id}"
}

resource "aws_acm_certificate_validation" "selfcare_certificate_validation" {
  certificate_arn         = "${aws_acm_certificate.selfcare_certificate.arn}"
  provider                = "aws.useast1"
  validation_record_fqdns = ["${aws_route53_record.selfcare_certificate_validation_record.fqdn}"]
}

# S3
# Managed by the microservices environment Terraform plan

# Lambda
resource "aws_iam_role" "selfcare_lambda_role" {
  assume_role_policy  = "${data.template_file.selfcare_lambda_assume_role_policy_contents.rendered}"
  name                = "selfcare-lambda@edge-role-${var.environment_id}"
  provider            = "aws.useast1"
}

resource "aws_iam_role_policy" "selfcare_lambda_role_policy" {
  name      = "selfcare-lambda@edge-role-policy-${var.environment_id}"
  policy    = "${data.template_file.selfcare_lambda_role_policy_contents.rendered}"
  provider  = "aws.useast1"
  role      = "${aws_iam_role.selfcare_lambda_role.id}"
}

# NOTE: Lambda functions are global so an "aliased" provider is used here for cross-region support
resource "aws_lambda_alias" "selfcare_route_lambda_alias" {
  name              = "selfcare-cloudfront-route-handler-alias-${var.environment_id}"
  description       = "Alias for 'selfcare-cloudfront-route-handler'"
  function_name     = "${aws_lambda_function.selfcare_route_lambda_function.arn}"
  function_version  = "$LATEST"
  provider          = "aws.useast1"
}

resource "aws_lambda_function" "selfcare_route_lambda_function" {
  description       = "Handle routing of SelfCare apps between CloudFront and S3"
# depends_on        = ["selfcare_cf_route_lambda_zip"]
  filename          = "${local.selfcare_cf_route_lambda_filename}.zip"
  function_name     = "selfcare-cloudfront-route-handler-${var.environment_id}"
  handler           = "cloudfront_route.handler"
  memory_size       = 128
  provider          = "aws.useast1"
  publish           = true
  role              = "${aws_iam_role.selfcare_lambda_role.arn}"
# role              = "arn:aws:iam::${data.aws_caller_identity.current.account_id}:role/service-role/lambda@edge_exec"
  runtime           = "${local.selfcare_lambda_runtime}"
  source_code_hash  = "${data.archive_file.selfcare_cf_route_lambda_zip.output_base64sha256}"
  tags              = "${local.common_tags}"
  timeout           = 10
}

resource "aws_lambda_permission" "selfcare_route_lambda_permission" {
  action        = "lambda:GetFunction"
  function_name = "${aws_lambda_function.selfcare_route_lambda_function.function_name}"
  principal     = "replicator.lambda.amazonaws.com"
  provider      = "aws.useast1"
  qualifier     = "${aws_lambda_alias.selfcare_route_lambda_alias.name}"
  statement_id  = "SelfCareRouteLambdaReplicationPermission"
}

# CloudFront
resource "aws_cloudfront_origin_access_identity" "selfcare_origin_access_identity" {
  comment = "CloudFront-to-S3 OAI for SelfCare - ${var.environment_id}"
}

resource "aws_cloudfront_distribution" "selfcare_distribution" {
  aliases         = ["${local.selfcare_fqdn}"]
  comment         = "${local.selfcare_fqdn}"
  depends_on      = ["aws_acm_certificate.selfcare_certificate"]
  enabled         = true
  is_ipv6_enabled = true
  price_class     = "${local.selfcare_cf_distribution_price_class[local.environment_id_prefix]}"
  tags            = "${local.common_tags}"

  # Custom error handling
# custom_error_response {}

  # Caching
  default_cache_behavior {
    allowed_methods         = ["GET", "HEAD"]
    cached_methods          = ["GET", "HEAD"]
    compress                = true
    default_ttl             = "${local.cache_duration_none}"
    max_ttl                 = "${local.cache_duration_none}"
    min_ttl                 = "${local.cache_duration_none}"
    target_origin_id        = "${var.environment_id}"
    viewer_protocol_policy  = "redirect-to-https"

    forwarded_values {
      query_string            = true
      query_string_cache_keys = []

      cookies {
        forward = "none"
      }
    }

    lambda_function_association {
        event_type      = "origin-request"
        include_body    = false
        lambda_arn      = "${aws_lambda_function.selfcare_route_lambda_function.qualified_arn}"
    }
  }

  ########## SelfCare/Storybook

  # NOTE: Storybook does not require the `config.json` cache behavior

  ordered_cache_behavior {
      allowed_methods         = ["GET", "HEAD"]
      cached_methods          = ["GET", "HEAD"]
      compress                = true
      default_ttl             = "${local.cache_duration_week}"
      max_ttl                 = "${local.cache_duration_week}"
      min_ttl                 = "${local.cache_duration_week}"
      path_pattern            = "/${var.selfcare_app_names[1]}/favicon.ico"
      target_origin_id        = "${var.environment_id}-${var.selfcare_app_names[1]}"
      viewer_protocol_policy  = "redirect-to-https"

      forwarded_values {
          query_string = false

        cookies {
          forward = "none"
        }
      }

      lambda_function_association {
          event_type      = "origin-request"
          include_body    = false
          lambda_arn      = "${aws_lambda_function.selfcare_route_lambda_function.qualified_arn}"
      }
  }

  ordered_cache_behavior {
      allowed_methods         = ["GET", "HEAD", "OPTIONS"]
      cached_methods          = ["GET", "HEAD"]
      compress                = true
      default_ttl             = "${local.cache_duration_none}"
      max_ttl                 = "${local.cache_duration_none}"
      min_ttl                 = "${local.cache_duration_none}"
      path_pattern            = "/${var.selfcare_app_names[1]}/manifest.json"
      target_origin_id        = "${var.environment_id}-${var.selfcare_app_names[1]}"
      viewer_protocol_policy  = "redirect-to-https"

      forwarded_values {
          query_string = false

        cookies {
          forward = "none"
        }
      }

      lambda_function_association {
          event_type      = "origin-request"
          include_body    = false
          lambda_arn      = "${aws_lambda_function.selfcare_route_lambda_function.qualified_arn}"
      }
  }

  ordered_cache_behavior {
      allowed_methods         = ["GET", "HEAD"]
      cached_methods          = ["GET", "HEAD"]
      compress                = true
      default_ttl             = "${local.cache_duration_year}"
      max_ttl                 = "${local.cache_duration_year}"
      min_ttl                 = "${local.cache_duration_year}"
      path_pattern            = "/${var.selfcare_app_names[1]}/locales/*"
      target_origin_id        = "${var.environment_id}-${var.selfcare_app_names[1]}"
      viewer_protocol_policy  = "redirect-to-https"

      forwarded_values {
          query_string = false

        cookies {
          forward = "none"
        }
      }

      lambda_function_association {
          event_type      = "origin-request"
          include_body    = false
          lambda_arn      = "${aws_lambda_function.selfcare_route_lambda_function.qualified_arn}"
      }
  }

  ordered_cache_behavior {
      allowed_methods         = ["GET", "HEAD"]
      cached_methods          = ["GET", "HEAD"]
      compress                = true
      default_ttl             = "${local.cache_duration_year}"
      max_ttl                 = "${local.cache_duration_year}"
      min_ttl                 = "${local.cache_duration_year}"
      path_pattern            = "/${var.selfcare_app_names[1]}/*.css"
      target_origin_id        = "${var.environment_id}-${var.selfcare_app_names[1]}"
      viewer_protocol_policy  = "redirect-to-https"

      forwarded_values {
          query_string = false

        cookies {
          forward = "none"
        }
      }

      lambda_function_association {
          event_type      = "origin-request"
          include_body    = false
          lambda_arn      = "${aws_lambda_function.selfcare_route_lambda_function.qualified_arn}"
      }
  }

  ordered_cache_behavior {
      allowed_methods         = ["GET", "HEAD"]
      cached_methods          = ["GET", "HEAD"]
      compress                = true
      default_ttl             = "${local.cache_duration_year}"
      max_ttl                 = "${local.cache_duration_year}"
      min_ttl                 = "${local.cache_duration_year}"
      path_pattern            = "/${var.selfcare_app_names[1]}/*.js"
      target_origin_id        = "${var.environment_id}-${var.selfcare_app_names[1]}"
      viewer_protocol_policy  = "redirect-to-https"

      forwarded_values {
          query_string = false

        cookies {
          forward = "none"
        }
      }

      lambda_function_association {
          event_type      = "origin-request"
          include_body    = false
          lambda_arn      = "${aws_lambda_function.selfcare_route_lambda_function.qualified_arn}"
      }
  }

  ordered_cache_behavior {
      allowed_methods         = ["GET", "HEAD"]
      cached_methods          = ["GET", "HEAD"]
      compress                = true
      default_ttl             = "${local.cache_duration_none}"
      max_ttl                 = "${local.cache_duration_none}"
      min_ttl                 = "${local.cache_duration_none}"
      path_pattern            = "/${var.selfcare_app_names[1]}*"
      target_origin_id        = "${var.environment_id}-${var.selfcare_app_names[1]}"
      viewer_protocol_policy  = "redirect-to-https"

      forwarded_values {
        query_string            = true
        query_string_cache_keys = []

        cookies {
          forward = "none"
        }
      }

      lambda_function_association {
          event_type      = "origin-request"
          include_body    = false
          lambda_arn      = "${aws_lambda_function.selfcare_route_lambda_function.qualified_arn}"
      }
  }

  ########## SelfCare/UI Storybook

  # NOTE: UI Storybook does not require the `config.json` cache behavior

  ordered_cache_behavior {
      allowed_methods         = ["GET", "HEAD"]
      cached_methods          = ["GET", "HEAD"]
      compress                = true
      default_ttl             = "${local.cache_duration_week}"
      max_ttl                 = "${local.cache_duration_week}"
      min_ttl                 = "${local.cache_duration_week}"
      path_pattern            = "/${var.selfcare_app_names[2]}/favicon.ico"
      target_origin_id        = "${var.environment_id}-${var.selfcare_app_names[2]}"
      viewer_protocol_policy  = "redirect-to-https"

      forwarded_values {
          query_string = false

        cookies {
          forward = "none"
        }
      }

      lambda_function_association {
          event_type      = "origin-request"
          include_body    = false
          lambda_arn      = "${aws_lambda_function.selfcare_route_lambda_function.qualified_arn}"
      }
  }

  ordered_cache_behavior {
      allowed_methods         = ["GET", "HEAD", "OPTIONS"]
      cached_methods          = ["GET", "HEAD"]
      compress                = true
      default_ttl             = "${local.cache_duration_none}"
      max_ttl                 = "${local.cache_duration_none}"
      min_ttl                 = "${local.cache_duration_none}"
      path_pattern            = "/${var.selfcare_app_names[2]}/manifest.json"
      target_origin_id        = "${var.environment_id}-${var.selfcare_app_names[2]}"
      viewer_protocol_policy  = "redirect-to-https"

      forwarded_values {
          query_string = false

        cookies {
          forward = "none"
        }
      }

      lambda_function_association {
          event_type      = "origin-request"
          include_body    = false
          lambda_arn      = "${aws_lambda_function.selfcare_route_lambda_function.qualified_arn}"
      }
  }

  ordered_cache_behavior {
      allowed_methods         = ["GET", "HEAD"]
      cached_methods          = ["GET", "HEAD"]
      compress                = true
      default_ttl             = "${local.cache_duration_year}"
      max_ttl                 = "${local.cache_duration_year}"
      min_ttl                 = "${local.cache_duration_year}"
      path_pattern            = "/${var.selfcare_app_names[2]}/locales/*"
      target_origin_id        = "${var.environment_id}-${var.selfcare_app_names[2]}"
      viewer_protocol_policy  = "redirect-to-https"

      forwarded_values {
          query_string = false

        cookies {
          forward = "none"
        }
      }

      lambda_function_association {
          event_type      = "origin-request"
          include_body    = false
          lambda_arn      = "${aws_lambda_function.selfcare_route_lambda_function.qualified_arn}"
      }
  }

  ordered_cache_behavior {
      allowed_methods         = ["GET", "HEAD"]
      cached_methods          = ["GET", "HEAD"]
      compress                = true
      default_ttl             = "${local.cache_duration_year}"
      max_ttl                 = "${local.cache_duration_year}"
      min_ttl                 = "${local.cache_duration_year}"
      path_pattern            = "/${var.selfcare_app_names[2]}/*.css"
      target_origin_id        = "${var.environment_id}-${var.selfcare_app_names[2]}"
      viewer_protocol_policy  = "redirect-to-https"

      forwarded_values {
          query_string = false

        cookies {
          forward = "none"
        }
      }

      lambda_function_association {
          event_type      = "origin-request"
          include_body    = false
          lambda_arn      = "${aws_lambda_function.selfcare_route_lambda_function.qualified_arn}"
      }
  }

  ordered_cache_behavior {
      allowed_methods         = ["GET", "HEAD"]
      cached_methods          = ["GET", "HEAD"]
      compress                = true
      default_ttl             = "${local.cache_duration_year}"
      max_ttl                 = "${local.cache_duration_year}"
      min_ttl                 = "${local.cache_duration_year}"
      path_pattern            = "/${var.selfcare_app_names[2]}/*.js"
      target_origin_id        = "${var.environment_id}-${var.selfcare_app_names[2]}"
      viewer_protocol_policy  = "redirect-to-https"

      forwarded_values {
          query_string = false

        cookies {
          forward = "none"
        }
      }

      lambda_function_association {
          event_type      = "origin-request"
          include_body    = false
          lambda_arn      = "${aws_lambda_function.selfcare_route_lambda_function.qualified_arn}"
      }
  }

  ordered_cache_behavior {
      allowed_methods         = ["GET", "HEAD"]
      cached_methods          = ["GET", "HEAD"]
      compress                = true
      default_ttl             = "${local.cache_duration_none}"
      max_ttl                 = "${local.cache_duration_none}"
      min_ttl                 = "${local.cache_duration_none}"
      path_pattern            = "/${var.selfcare_app_names[2]}*"
      target_origin_id        = "${var.environment_id}-${var.selfcare_app_names[2]}"
      viewer_protocol_policy  = "redirect-to-https"

      forwarded_values {
        query_string            = true
        query_string_cache_keys = []

        cookies {
          forward = "none"
        }
      }

      lambda_function_association {
          event_type      = "origin-request"
          include_body    = false
          lambda_arn      = "${aws_lambda_function.selfcare_route_lambda_function.qualified_arn}"
      }
  }

  ########## SelfCare/Widgets

  ordered_cache_behavior {
      allowed_methods         = ["GET", "HEAD"]
      cached_methods          = ["GET", "HEAD"]
      compress                = true
      default_ttl             = "${local.cache_duration_none}"
      max_ttl                 = "${local.cache_duration_none}"
      min_ttl                 = "${local.cache_duration_none}"
      path_pattern            = "/${var.selfcare_app_names[3]}/config.json"
      target_origin_id        = "${var.environment_id}-${var.selfcare_app_names[3]}-config"
      viewer_protocol_policy  = "redirect-to-https"

      forwarded_values {
          query_string = false

        cookies {
          forward = "none"
        }
      }
  }

  ordered_cache_behavior {
      allowed_methods         = ["GET", "HEAD"]
      cached_methods          = ["GET", "HEAD"]
      compress                = true
      default_ttl             = "${local.cache_duration_week}"
      max_ttl                 = "${local.cache_duration_week}"
      min_ttl                 = "${local.cache_duration_week}"
      path_pattern            = "/${var.selfcare_app_names[3]}/favicon.ico"
      target_origin_id        = "${var.environment_id}-${var.selfcare_app_names[3]}"
      viewer_protocol_policy  = "redirect-to-https"

      forwarded_values {
          query_string = false

        cookies {
          forward = "none"
        }
      }

      lambda_function_association {
          event_type      = "origin-request"
          include_body    = false
          lambda_arn      = "${aws_lambda_function.selfcare_route_lambda_function.qualified_arn}"
      }
  }

  ordered_cache_behavior {
      allowed_methods         = ["GET", "HEAD", "OPTIONS"]
      cached_methods          = ["GET", "HEAD"]
      compress                = true
      default_ttl             = "${local.cache_duration_none}"
      max_ttl                 = "${local.cache_duration_none}"
      min_ttl                 = "${local.cache_duration_none}"
      path_pattern            = "/${var.selfcare_app_names[3]}/manifest.json"
      target_origin_id        = "${var.environment_id}-${var.selfcare_app_names[3]}"
      viewer_protocol_policy  = "redirect-to-https"

      forwarded_values {
          query_string = false

        cookies {
          forward = "none"
        }
      }

      lambda_function_association {
          event_type      = "origin-request"
          include_body    = false
          lambda_arn      = "${aws_lambda_function.selfcare_route_lambda_function.qualified_arn}"
      }
  }

  ordered_cache_behavior {
      allowed_methods         = ["GET", "HEAD"]
      cached_methods          = ["GET", "HEAD"]
      compress                = true
      default_ttl             = "${local.cache_duration_year}"
      max_ttl                 = "${local.cache_duration_year}"
      min_ttl                 = "${local.cache_duration_year}"
      path_pattern            = "/${var.selfcare_app_names[3]}/locales/*"
      target_origin_id        = "${var.environment_id}-${var.selfcare_app_names[3]}"
      viewer_protocol_policy  = "redirect-to-https"

      forwarded_values {
          query_string = false

        cookies {
          forward = "none"
        }
      }

      lambda_function_association {
          event_type      = "origin-request"
          include_body    = false
          lambda_arn      = "${aws_lambda_function.selfcare_route_lambda_function.qualified_arn}"
      }
  }

  ordered_cache_behavior {
      allowed_methods         = ["GET", "HEAD"]
      cached_methods          = ["GET", "HEAD"]
      compress                = true
      default_ttl             = "${local.cache_duration_year}"
      max_ttl                 = "${local.cache_duration_year}"
      min_ttl                 = "${local.cache_duration_year}"
      path_pattern            = "/${var.selfcare_app_names[3]}/*.css"
      target_origin_id        = "${var.environment_id}-${var.selfcare_app_names[3]}"
      viewer_protocol_policy  = "redirect-to-https"

      forwarded_values {
          query_string = false

        cookies {
          forward = "none"
        }
      }

      lambda_function_association {
          event_type      = "origin-request"
          include_body    = false
          lambda_arn      = "${aws_lambda_function.selfcare_route_lambda_function.qualified_arn}"
      }
  }

  ordered_cache_behavior {
      allowed_methods         = ["GET", "HEAD"]
      cached_methods          = ["GET", "HEAD"]
      compress                = true
      default_ttl             = "${local.cache_duration_year}"
      max_ttl                 = "${local.cache_duration_year}"
      min_ttl                 = "${local.cache_duration_year}"
      path_pattern            = "/${var.selfcare_app_names[3]}/*.js"
      target_origin_id        = "${var.environment_id}-${var.selfcare_app_names[3]}"
      viewer_protocol_policy  = "redirect-to-https"

      forwarded_values {
          query_string = false

        cookies {
          forward = "none"
        }
      }

      lambda_function_association {
          event_type      = "origin-request"
          include_body    = false
          lambda_arn      = "${aws_lambda_function.selfcare_route_lambda_function.qualified_arn}"
      }
  }

  ordered_cache_behavior {
      allowed_methods         = ["GET", "HEAD"]
      cached_methods          = ["GET", "HEAD"]
      compress                = true
      default_ttl             = "${local.cache_duration_none}"
      max_ttl                 = "${local.cache_duration_none}"
      min_ttl                 = "${local.cache_duration_none}"
      path_pattern            = "/${var.selfcare_app_names[3]}*"
      target_origin_id        = "${var.environment_id}-${var.selfcare_app_names[3]}"
      viewer_protocol_policy  = "redirect-to-https"

      forwarded_values {
        query_string            = true
        query_string_cache_keys = []

        cookies {
          forward = "none"
        }
      }

      lambda_function_association {
          event_type      = "origin-request"
          include_body    = false
          lambda_arn      = "${aws_lambda_function.selfcare_route_lambda_function.qualified_arn}"
      }
  }

  ########## SelfCare/SelfCare

  ordered_cache_behavior {
      allowed_methods         = ["GET", "HEAD"]
      cached_methods          = ["GET", "HEAD"]
      compress                = true
      default_ttl             = "${local.cache_duration_none}"
      max_ttl                 = "${local.cache_duration_none}"
      min_ttl                 = "${local.cache_duration_none}"
      path_pattern            = "/config.json"
      target_origin_id        = "${var.environment_id}-${var.selfcare_app_names[0]}-config"
      viewer_protocol_policy  = "redirect-to-https"

      forwarded_values {
          query_string = false

        cookies {
          forward = "none"
        }
      }
  }

  ordered_cache_behavior {
      allowed_methods         = ["GET", "HEAD"]
      cached_methods          = ["GET", "HEAD"]
      compress                = true
      default_ttl             = "${local.cache_duration_week}"
      max_ttl                 = "${local.cache_duration_week}"
      min_ttl                 = "${local.cache_duration_week}"
      path_pattern            = "/favicon.ico"
      target_origin_id        = "${var.environment_id}-${var.selfcare_app_names[0]}"
      viewer_protocol_policy  = "redirect-to-https"

      forwarded_values {
          query_string = false

        cookies {
          forward = "none"
        }
      }
  }

  ordered_cache_behavior {
      allowed_methods         = ["GET", "HEAD", "OPTIONS"]
      cached_methods          = ["GET", "HEAD"]
      compress                = true
      default_ttl             = "${local.cache_duration_none}"
      max_ttl                 = "${local.cache_duration_none}"
      min_ttl                 = "${local.cache_duration_none}"
      path_pattern            = "/manifest.json"
      target_origin_id        = "${var.environment_id}-${var.selfcare_app_names[0]}"
      viewer_protocol_policy  = "redirect-to-https"

      forwarded_values {
          query_string = false

        cookies {
          forward = "none"
        }
      }
  }

  ordered_cache_behavior {
      allowed_methods         = ["GET", "HEAD"]
      cached_methods          = ["GET", "HEAD"]
      compress                = true
      default_ttl             = "${local.cache_duration_year}"
      max_ttl                 = "${local.cache_duration_year}"
      min_ttl                 = "${local.cache_duration_year}"
      path_pattern            = "/locales/*"
      target_origin_id        = "${var.environment_id}-${var.selfcare_app_names[0]}"
      viewer_protocol_policy  = "redirect-to-https"

      forwarded_values {
          query_string = false

        cookies {
          forward = "none"
        }
      }
  }

  ordered_cache_behavior {
      allowed_methods         = ["GET", "HEAD"]
      cached_methods          = ["GET", "HEAD"]
      compress                = true
      default_ttl             = "${local.cache_duration_year}"
      max_ttl                 = "${local.cache_duration_year}"
      min_ttl                 = "${local.cache_duration_year}"
      path_pattern            = "/*.css"
      target_origin_id        = "${var.environment_id}-${var.selfcare_app_names[0]}"
      viewer_protocol_policy  = "redirect-to-https"

      forwarded_values {
          query_string = false

        cookies {
          forward = "none"
        }
      }
  }

  ordered_cache_behavior {
      allowed_methods         = ["GET", "HEAD"]
      cached_methods          = ["GET", "HEAD"]
      compress                = true
      default_ttl             = "${local.cache_duration_year}"
      max_ttl                 = "${local.cache_duration_year}"
      min_ttl                 = "${local.cache_duration_year}"
      path_pattern            = "/*.js"
      target_origin_id        = "${var.environment_id}-${var.selfcare_app_names[0]}"
      viewer_protocol_policy  = "redirect-to-https"

      forwarded_values {
          query_string = false

        cookies {
          forward = "none"
        }
      }
  }

  ordered_cache_behavior {
      allowed_methods         = ["GET", "HEAD"]
      cached_methods          = ["GET", "HEAD"]
      compress                = true
      default_ttl             = "${local.cache_duration_none}"
      max_ttl                 = "${local.cache_duration_none}"
      min_ttl                 = "${local.cache_duration_none}"
      path_pattern            = "/*"
      target_origin_id        = "${var.environment_id}-${var.selfcare_app_names[0]}"
      viewer_protocol_policy  = "redirect-to-https"

      forwarded_values {
        query_string            = true
        query_string_cache_keys = []

        cookies {
          forward = "none"
        }
      }

      lambda_function_association {
          event_type      = "origin-request"
          include_body    = false
          lambda_arn      = "${aws_lambda_function.selfcare_route_lambda_function.qualified_arn}"
      }
  }

  # Origins
  # TODO: The "config" origins could be consolidated into a single origin if the `domain_name` property includes the
  # shared part of the `origin_path` property (e.g. `domain_name = "${data.aws_s3_bucket.selfcare_artifact_bucket.bucket_domain_name}"` -->
  # domain_name = "${data.aws_s3_bucket.selfcare_artifact_bucket.bucket_domain_name}/environments/${var.environment_id}")
  origin {
    domain_name = "${data.aws_s3_bucket.selfcare_artifact_bucket.bucket_domain_name}"
    origin_id   = "${var.environment_id}"
    origin_path = ""

#   s3_origin_config {
#     origin_access_identity = "${aws_cloudfront_origin_access_identity.selfcare_origin_access_identity.cloudfront_access_identity_path}"
#   }
  }

  origin {
    domain_name = "${data.aws_s3_bucket.selfcare_artifact_bucket.bucket_domain_name}"
    origin_id   = "${var.environment_id}-${var.selfcare_app_names[0]}"
    origin_path = "/${var.selfcare_app_names[0]}/${var.selfcare_app_versions[0]}/content"

#   s3_origin_config {
#     origin_access_identity = "${aws_cloudfront_origin_access_identity.selfcare_origin_access_identity.cloudfront_access_identity_path}"
#   }
  }

  origin {
    domain_name = "${data.aws_s3_bucket.selfcare_artifact_bucket.bucket_domain_name}"
    origin_id   = "${var.environment_id}-${var.selfcare_app_names[0]}-config"
    origin_path = "${local.selfcare_s3_config_origin_path}/${var.selfcare_app_names[0]}"

#   s3_origin_config {
#     origin_access_identity = "${aws_cloudfront_origin_access_identity.selfcare_origin_access_identity.cloudfront_access_identity_path}"
#   }
  }

  origin {
    domain_name = "${data.aws_s3_bucket.selfcare_artifact_bucket.bucket_domain_name}"
    origin_id   = "${var.environment_id}-${var.selfcare_app_names[1]}"
    origin_path = "/${var.selfcare_app_names[1]}/${var.selfcare_app_versions[1]}/content"

#   s3_origin_config {
#     origin_access_identity = "${aws_cloudfront_origin_access_identity.selfcare_origin_access_identity.cloudfront_access_identity_path}"
#   }
  }

  origin {
    domain_name = "${data.aws_s3_bucket.selfcare_artifact_bucket.bucket_domain_name}"
    origin_id   = "${var.environment_id}-${var.selfcare_app_names[2]}"
    origin_path = "/${var.selfcare_app_names[2]}/${var.selfcare_app_versions[2]}/content"

#   s3_origin_config {
#     origin_access_identity = "${aws_cloudfront_origin_access_identity.selfcare_origin_access_identity.cloudfront_access_identity_path}"
#   }
  }

  origin {
    domain_name = "${data.aws_s3_bucket.selfcare_artifact_bucket.bucket_domain_name}"
    origin_id   = "${var.environment_id}-${var.selfcare_app_names[3]}"
    origin_path = "/${var.selfcare_app_names[3]}/${var.selfcare_app_versions[3]}/content"

#   s3_origin_config {
#     origin_access_identity = "${aws_cloudfront_origin_access_identity.selfcare_origin_access_identity.cloudfront_access_identity_path}"
#   }
  }

  origin {
    domain_name = "${data.aws_s3_bucket.selfcare_artifact_bucket.bucket_domain_name}"
    origin_id   = "${var.environment_id}-${var.selfcare_app_names[3]}-config"
    origin_path = "${local.selfcare_s3_config_origin_path}/${var.selfcare_app_names[3]}"

#   s3_origin_config {
#     origin_access_identity = "${aws_cloudfront_origin_access_identity.selfcare_origin_access_identity.cloudfront_access_identity_path}"
#   }
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  # TODO: Upgrade `minimum_protocol_version` to "TLSv1.1_2016" or "TLSv1.2_2018"?
  viewer_certificate {
    acm_certificate_arn       = "${aws_acm_certificate.selfcare_certificate.arn}"
    minimum_protocol_version  = "TLSv1_2016"
    ssl_support_method        = "sni-only"
  }
}

# Null
resource "null_resource" "wait_for_distribution_deployed" {
  triggers {
    task_definition = "${aws_cloudfront_distribution.selfcare_distribution.id}"
  }

  provisioner "local-exec" {
    command = "aws cloudfront wait distribution-deployed --id ${aws_cloudfront_distribution.selfcare_distribution.id}"
  }

  depends_on = ["aws_cloudfront_distribution.selfcare_distribution"]
}

# Route53
resource "aws_route53_record" "selfcare_private_record" {
  count = "${data.terraform_remote_state.environment_state.is_dev ? 0 : 1}"

  name       = "${local.selfcare_fqdn}"
  type       = "A"
  zone_id    = "${data.terraform_remote_state.environment_state.private_zone_id}"

  alias {
    name                   = "${aws_cloudfront_distribution.selfcare_distribution.domain_name}"
    evaluate_target_health = false
    zone_id                = "${aws_cloudfront_distribution.selfcare_distribution.hosted_zone_id}"
  }
}

resource "aws_route53_record" "selfcare_public_record" {
  name       = "${local.selfcare_fqdn}"
  type       = "A"
  zone_id    = "${data.terraform_remote_state.environment_state.public_zone_id}"

  alias {
    name                   = "${aws_cloudfront_distribution.selfcare_distribution.domain_name}"
    evaluate_target_health = false
    zone_id                = "${aws_cloudfront_distribution.selfcare_distribution.hosted_zone_id}"
  }
}

########################################
########## OUTPUTS
########################################
# Outputs from this configuration.
output "selfcare_artifact_bucket_name" {
  value = "${data.aws_s3_bucket.selfcare_artifact_bucket.bucket}"
}

output "selfcare_distribution_arn" {
  value = "${aws_cloudfront_distribution.selfcare_distribution.arn}"
}

output "selfcare_distribution_domain_name" {
  value = "${aws_cloudfront_distribution.selfcare_distribution.domain_name}"
}

output "selfcare_distribution_id" {
  value = "${aws_cloudfront_distribution.selfcare_distribution.id}"
}

output "selfcare_distribution_hosted_zone_id" {
  value = "${aws_cloudfront_distribution.selfcare_distribution.hosted_zone_id}"
}

output "selfcare_origin_access_identity_id" {
  value = "${aws_cloudfront_origin_access_identity.selfcare_origin_access_identity.id}"
}

output "selfcare_route_lambda_arn" {
  value = "${aws_lambda_function.selfcare_route_lambda_function.arn}"
}

output "selfcare_public_route53_record" {
  value = "${aws_route53_record.selfcare_public_record.name}"
}

output "selfcare_private_route53_record" {
  value = "${data.terraform_remote_state.environment_state.is_dev ? "" : "${join("", aws_route53_record.selfcare_private_record.*.name)}" }"
}

# Input Variables.
output "input_selfcare_app_names" {
  value = "${var.selfcare_app_names}"
}

# NOTE: SelfCare contains multiple versions so `selfcare_app_versions` is used instead of `version`
output "input_selfcare_app_versions" {
  value = "${var.selfcare_app_versions}"
}

output "input_selfcare_environment_id" {
  value = "${var.environment_id}"
}

# NOTE: SelfCare contains multiple versions so `app_versions` is used instead
# but `version` is output for consistency and any downstream assumptions
# (e.g. resource reporting)
output "input_selfcare_version" {
  value = "${var.version}"
}

# Change tracking
output "caller_arn" {
  value = "${data.aws_caller_identity.current.arn}"
}

output "caller_user" {
  value = "${data.aws_caller_identity.current.user_id}"
}

output "caller_datetime" {
  value = "${timestamp()}"
}
