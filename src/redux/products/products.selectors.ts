import { CONFIGURATION } from '@selfcare/core/constants/configuration.constants';
import { FORMAT_LOCAL_SWEDISH_MOBILE_REGEX } from '@selfcare/core/constants/subscriber';
import { read } from '@selfcare/core/helpers/storage/local.storage';
import { ActivationIsLoading } from '@selfcare/core/redux/activation/activation.selectors';
import { AllowancesAcrossProducts, ConvergentBillerAccountUsageItems } from '@selfcare/core/redux/convergentBillerAccountUsageDetails/convergent.biller.account.usage.details.selectors';
import { ConvergentBillerSummaryData, IsConvergentBillerSummaryLoading } from '@selfcare/core/redux/convergentBillerSummary/convergent.biller.summary.selectors';
import { LockerItems } from '@selfcare/core/redux/locker/locker.selectors';
import { MarketingTemplatesBasedOnOffers } from '@selfcare/core/redux/marketingTemplates/marketing.templates.selectors';
import { CODES } from '@selfcare/core/redux/metadata/codes/codes.constants';
import { CodeItems, UnitsOfMeasure } from '@selfcare/core/redux/metadata/codes/codes.selectors';
import { OfferingExternalReferenceData } from '@selfcare/core/redux/metadata/offerings/offerings.selectors';
import { Base as ProductMetadata } from '@selfcare/core/redux/metadata/products/products.selectors';
import { AllExternalDisplayNames, isBenifyType, isBroadbandType, isMobileType, isStudentType } from '@selfcare/core/redux/offeringContext/offering.context.constants';
import { IsOfferingContextStatusLoading, OfferingContextsByInstanceId } from '@selfcare/core/redux/offeringContext/offering.context.selectors';
import { SelectedLocale } from '@selfcare/core/redux/preferences/preferences.selectors';
import { SavedShoppingCartItems } from '@selfcare/core/redux/savedCart/saved.cart.selectors';
import { EXTERNAL_REF_ICCID, EXTERNAL_REF_PUK1, EXTERNAL_REF_PUK2 } from '@selfcare/core/redux/searchServices/search.services.constants';
import { SearchServicesData } from '@selfcare/core/redux/searchServices/search.services.selectors';
import { RightToReturnDays } from '@selfcare/core/redux/settings/settings.selectors';
import { SubmitOneTimePaymentIsLoading } from '@selfcare/core/redux/submitOneTimePayment/submit.one.time.payment.selectors';
import { IsSubmittingOrder, SubmitOrderData } from '@selfcare/core/redux/submitOrder/submit.order.selectors';
import { Subscriber } from '@selfcare/core/redux/subscriber/subscriber.selectors';
import { SubscriberInventory } from '@selfcare/core/redux/subscriberInventory/subscriber.inventory.selectors';
import { OFFERING_OVERALL_STATUS, OFFERING_STATUS } from '@selfcare/core/redux/subscriberOfferings/subscriber.offering.constants';
import { GetDisplayName, GetOverallStatus, GetSmsAndVoiceIds } from '@selfcare/core/redux/subscriberOfferings/subscriber.offerings.helper';
import { SubscriberOfferingsIsLoading } from '@selfcare/core/redux/subscriberOfferings/subscriber.offerings.selectors';
import { FAILED_PAYMENT_ATTRIBUTE, SUPPORT_REQUEST_STATUS } from '@selfcare/core/redux/supportRequest/support.request.constants';
import { RecentlyNewOrOpenPaymentFailureRequests, RecentNewOrOpenSupportRequests, RequestsList } from '@selfcare/core/redux/supportRequest/support.request.selectors';
import AppConfig from 'AppConfig';
import addDays from 'date-fns/add_days';
import differenceInDays from 'date-fns/difference_in_days';
import differenceInHours from 'date-fns/difference_in_hours';
import format from 'date-fns/format';
import contains from 'ramda/src/contains';
import path from 'ramda/src/path';
import pathOr from 'ramda/src/pathOr';
import pluck from 'ramda/src/pluck';
import sum from 'ramda/src/sum';
import { createSelector } from 'reselect';
import Immutable from 'seamless-immutable';
import isNil from 'ramda/src/isNil';
import { formatDate } from 'selfcare-ui/src/utilities/localization/datetime';
import { CROSS_SELL_SUGGESTION } from '../../components/crossSell/cross.sell.constants';
import { getAllowanceViewData } from '../../components/shop/decision/decision.options.helper';
import { Client } from '../client.selectors';
import { DISPLAY_ORDER_FOR_PORT_IN_NUMBER } from '../orderFlow/attributes/attributes.order.flow.constants';
import { ActivationDate, OfferingAttributesForEdit, PortInDate, PortInNumberFromAttributes } from '../orderFlow/attributes/attributes.order.flow.selectors';
import { getActivePrimaryOption, getInActiveDecisionOption } from '../ordering/ordering.helpers';
import { AllowanceMarketingTemplate, IsCalculatingDecisionBeingModified, IsLoadingOfferingContextForDecision, PrimaryDecisionsForEveryContext } from '../ordering/ordering.selectors';
import { Offerings } from '../plansServices/plans.services.selectors';
import { getActivationRequestForServiceIdentifier } from '../supportRequest/support.request.helpers';
import { AllServiceEntitlements } from '../usage/usage.selectors';
import { DECOMMISSIONED_COAX_PRODUCTS, DECOMMISSIONED_MOBIL_PRODUCTS, ENTITLEMENT_NAMES, ENTITLEMENT_ADDITIONAL_DATA, ENTITLEMENT_UNIT_TYPE, ORDER_CHANGE_TYPE_CODE_RIGHT_TO_RETURN, ORDER_TYPE_CODE_CHANGE_OF_SERVICE, PRODUCT_METADATA } from './products.constants';
import { AccountSummary, Entitlements, ExternalReferences, InternalProduct } from './products.types';
import { RoamingByServiceId } from './serviceFeatures/product.service.feature.selectors';
import { enableDiscounts } from '@selfcare/core/redux/settings/settings.selectors.ts';

const EMPTY_OBJECT: any = {};
const EMPTY_ARRAY: any[] = [];

export const getPortInNumber = (serviceAttributeValues: any) => serviceAttributeValues.find(
  (attributeValue: any) => attributeValue.ServiceAttributeId.toString() === AppConfig.PORT_IN_NUMBER.toString()
);

export const getPortInIntent = (serviceAttributeValues: any, serviceAttributeId: any) => {
  const portInIntent = serviceAttributeValues.find(
    (attributeValue: any) => attributeValue.ServiceAttributeId === serviceAttributeId
  );
  return portInIntent;
};

export const getPortInDate = (serviceAttributeValues: any) =>
  serviceAttributeValues.find((attributeValue: any) => attributeValue.ServiceAttributeId.toString() === AppConfig.SERVICE_ATTRIBUTE_ID.toString()
  );

export const getFutureActivationDate = (serviceAttributeValues: any, serviceAttributeId: any) => {
  const match = serviceAttributeValues.find(
    (attributeValue: any) => attributeValue.ServiceAttributeId === serviceAttributeId
  );
  return match;
};

const Base = createSelector([Client], (client: any) => {
  return pathOr(null, ['products'], client);
});

const Products = createSelector([Base], (product) => {
  return pathOr(null, ['data'], product);
});

export const SelectedProductValue = createSelector([Products], (product) => {
  return pathOr(null, ['selectedProductId'], product);
});

export const getServiceIdentifierValue = (attributeValues: any) => {
  const valueToUse = attributeValues.find((value: any) => {
    return value.IsServiceIdentifier && value.ServiceInstanceId;
  });

  return valueToUse && valueToUse.Value;
};

const getSpeedsForBroadband = (productMetadata: any, activePrimaryDecision: any) => {
  if (Object.keys(productMetadata).length && activePrimaryDecision) {
    const productMetadataToUse = productMetadata[activePrimaryDecision.ProductId];
    const productPricingPlans = pathOr(EMPTY_ARRAY, ['product', 'PricingPlans'], productMetadataToUse);
    const metadataPricingPlan = productPricingPlans.find((plan) => {
      return plan.Id === activePrimaryDecision.PricingPlanId;
    });

    if (metadataPricingPlan) {
      const addProps = pathOr(EMPTY_ARRAY, ['AdditionalProperties'], metadataPricingPlan);
      return {
        downloadSpeed: pathOr(
          null,
          ['Values', 0],
          addProps.find((property) => {
            return property.ExternalReference === CONFIGURATION.BROADBAND_DOWNLOAD_SPEED;
          })
        ),
        uploadSpeed: pathOr(
          null,
          ['Values', 0],
          addProps.find((property) => {
            return property.ExternalReference === CONFIGURATION.BROADBAND_UPLOAD_SPEED;
          })
        )
      };
    }
  }

  return EMPTY_OBJECT;
};

const canOptOutOnRenew = (primaryOption: any, optionList: any, inGracePeriod: boolean = false) => {
  let option = primaryOption;
  if (!pathOr(false, ['SubscriberProductExpiration'], option)) {
    option = optionList.find(({ SubscriberProductExpiration }: any) => SubscriberProductExpiration);
  }
  return (
    (pathOr(false, ['SubscriberProductExpiration', 'CanOptOut'], option) &&
      !pathOr(false, ['SubscriberProductExpiration', 'CanOptIn'], option)) ||
    inGracePeriod
  );
};

const paymentFailureInGracePeriod = (failedPaymentRequest: any) => {
  let gracePeriodAttribute;
  if (failedPaymentRequest && failedPaymentRequest.customCaseDetails && failedPaymentRequest.customCaseDetails.length) {
    gracePeriodAttribute = pathOr(
      null,
      ['Value'],
      failedPaymentRequest.customCaseDetails.find((detail: any) => {
        return FAILED_PAYMENT_ATTRIBUTE.NAMES.GracePeriodIndicator === detail.Name;
      })
    );
  }
  return gracePeriodAttribute === FAILED_PAYMENT_ATTRIBUTE.VALUES.Yes;
};

const getFutureActivationDateFromAttributes = (serviceAttributeValues: any) => {
  const activationDate = serviceAttributeValues.find(
    (attributeValue: any) => attributeValue.ExternalReference === CONFIGURATION.PRODUCT_FUTURE_ACTIVATION_DATE
  );
  return activationDate && activationDate.Value;
};

export const ProductDefaultValues = createSelector(Products, (products) => {
  const defaultValues = pathOr([], ['productMetadata', 'Product', 'AdditionalProperties'], products);

  let defaultDays;
  let maxDays;
  let minDays;

  defaultValues.forEach((defaultValue) => {
    const externalReference = path(['ExternalReference'], defaultValue);
    switch (externalReference) {
    case PRODUCT_METADATA.defaultActivationDate:
      defaultDays = parseInt(defaultValue.Values[0], 10);
      break;
    case PRODUCT_METADATA.maxActivationDate:
      maxDays = parseInt(defaultValue.Values[0], 10);
      break;
    case PRODUCT_METADATA.minActivationDate:
      minDays = parseInt(defaultValue.Values[0], 10);
      break;
    default:
    }
  });
  return {
    defaultDays,
    maxDays,
    minDays
  };
});

export const AllProducts = createSelector(
  [
    Offerings,
    SubscriberInventory,
    PrimaryDecisionsForEveryContext,
    OfferingExternalReferenceData,
    ProductMetadata,
    MarketingTemplatesBasedOnOffers,
    SelectedLocale,
    RightToReturnDays,
    RecentlyNewOrOpenPaymentFailureRequests,
    RequestsList
  ],
  (
    offerings: any[],
    subscriberInventory: any[],
    primaryOptions: [string],
    externalReferences: ExternalReferences,
    productMetadata,
    marketingTemplates: any[],
    locale,
    rightToReturnDays,
    paymentFailures: any[],
    requestsList
  ): InternalProduct[] => {
    return offerings.map((offer: any) => {
      const referenceBasedOnOffer = Object.values(externalReferences).find((reference) => {
        return reference.offerId === offer.OfferingId;
      });

      const isBroadband = (referenceBasedOnOffer && isBroadbandType(referenceBasedOnOffer)) || DECOMMISSIONED_COAX_PRODUCTS.includes(offer.DisplayName);
      const isWireless = (referenceBasedOnOffer && (isMobileType(referenceBasedOnOffer) || isBenifyType(referenceBasedOnOffer))) || DECOMMISSIONED_MOBIL_PRODUCTS.includes(offer.DisplayName);
      const isBenify = referenceBasedOnOffer && isBenifyType(referenceBasedOnOffer);
      const isAllowance = referenceBasedOnOffer && referenceBasedOnOffer.type === AllExternalDisplayNames.ALLOWANCE;
      const isPennyPlay = referenceBasedOnOffer && referenceBasedOnOffer.type === AllExternalDisplayNames.PLAY;
      const isStudent = referenceBasedOnOffer && isStudentType(referenceBasedOnOffer);

      const connectivityOption =
        offer &&
        offer.Options.find((option: any) => {
          return option.ServiceAttributeValues.some((attribute: any) => {
            return attribute.Value === CONFIGURATION.ATTRIBUTE_INFO_FOR_CONNECTED_OPTION;
          });
        });

      const primaryOptionBasedOnInstanceId = primaryOptions ? primaryOptions[offer.OfferingInstanceId] : null;
      const activePrimaryDecisionOption =
        offer && primaryOptionBasedOnInstanceId ? getActivePrimaryOption(offer, primaryOptionBasedOnInstanceId) : {};
      let planName = pathOr(null, ['PlanName'], activePrimaryDecisionOption);

      if (!activePrimaryDecisionOption) {
        const inActiveOptions = getInActiveDecisionOption(offer, primaryOptionBasedOnInstanceId);
        planName = pathOr(null, ['PlanName'], inActiveOptions);
      }

      const broadbandSpeeds = getSpeedsForBroadband(productMetadata, activePrimaryDecisionOption);
      const hasDiscountExpirationDate = offer.Options.find((option: any) => {
        return pathOr(null, ['Discounts', '0', 'DiscountExpirationDate'], option);
      });

      const discountHasNotCycledOff = offer.Options.some((option: any) => {
        return pathOr(null, ['Discounts', '0'], option);
      });

      const hasRenewalDate = offer.Options.find((option: any) => {
        return pathOr(null, ['OffCycleDetail', 'NextRenewalDate'], option);
      });
      const hasFirstUsage = !!offer.Options.find((option: any) => {
        return pathOr(false, ['OffCycleDetail', 'NextScheduleId'], option);
      });
      const decisionToUseForRenewalDate =
        activePrimaryDecisionOption && Object.values(activePrimaryDecisionOption).length ?
          activePrimaryDecisionOption :
          hasRenewalDate;

      const paymentFailureRequest = paymentFailures.find((request: any) => {
        const instanceIdPropertyValue = request.AdditionalPropertyValues.filter(
          (obj: any) => obj.Id === AppConfig.OFFER_INSTANCE_ID
        );
        return path([0, 'Value'], instanceIdPropertyValue) === path(['OfferingInstanceId'], offer);
      });
      const inGracePeriod = paymentFailureInGracePeriod(paymentFailureRequest);
      const serviceAttributeValues = pathOr([], ['ServiceAttributeValues'], connectivityOption);
      const serviceIdentifier = getServiceIdentifierValue(serviceAttributeValues);
      const displayMobileNumber = (serviceIdentifier || '').replace(
        FORMAT_LOCAL_SWEDISH_MOBILE_REGEX.pattern,
        FORMAT_LOCAL_SWEDISH_MOBILE_REGEX.replace
      );
      const portInNumber = getPortInNumber(serviceAttributeValues);
      const canOptOut = canOptOutOnRenew(activePrimaryDecisionOption, offer.Options, inGracePeriod);
      const daysSinceConnectionDate = differenceInDays(new Date(), pathOr(new Date(), ['ConnectedDate'], offer));

      const marketingTemplateToUse = marketingTemplates.find((template: any) => {
        return template.Id === offer.OfferingId;
      });

      let futureActivationDate;

      const supportRequest = getActivationRequestForServiceIdentifier(
        requestsList,
        serviceIdentifier,
        SUPPORT_REQUEST_STATUS.OPEN
      );

      if (supportRequest) {
        const futureActivationDateOption = supportRequest.AdditionalPropertyValues.find(
          (item: any) => item.Id === AppConfig.FUTURE_ACTIVATION_DATE_ID
        );
        futureActivationDate = futureActivationDateOption ? futureActivationDateOption.Value : undefined;
      }

      if (futureActivationDate === undefined) {
        const getFutureActivationDateOption =
          offer &&
          offer.Options.find((option: any) => {
            return option.ServiceAttributeValues.some((attribute: any) => {
              return attribute.ExternalReference === CONFIGURATION.PRODUCT_FUTURE_ACTIVATION_DATE;
            });
          });

        const futureActivationDateAttributes = pathOr([], ['ServiceAttributeValues'], getFutureActivationDateOption);
        futureActivationDate = getFutureActivationDateFromAttributes(futureActivationDateAttributes);
      }

      const name = pathOr(null, ['Name'], offer);
      const offeringInstanceId = pathOr(null, ['OfferingInstanceId'], offer);
      const offeringId = pathOr(null, ['OfferingId'], offer);
      const externalDisplayName = referenceBasedOnOffer ? referenceBasedOnOffer.type : null;

      return {
        name,
        externalDisplayName,
        id: offeringInstanceId,
        offeringInstanceId,
        offeringId,
        displayServiceIdentifier: isWireless ? displayMobileNumber : serviceIdentifier,
        displayName: (!activePrimaryDecisionOption ? planName : GetDisplayName(activePrimaryDecisionOption, offer, isWireless, offer.Status)),
        options: pathOr([], ['Options'], offer),
        thumbnailUrl: pathOr('', ['ThumbnailUrl'], offer),
        planName,
        primaryOptionDisplayInfo: isBroadband ? broadbandSpeeds : EMPTY_OBJECT,
        productName: pathOr(null, ['DisplayName'], offer),
        currencyCode: pathOr(null, ['CurrencyCode'], offer),
        serviceIdentifier,
        status: GetOverallStatus(
          true,
          offer.Status,
          activePrimaryDecisionOption,
          offer.Options,
          isPennyPlay,
          hasFirstUsage,
          paymentFailureRequest,
          inGracePeriod
        ),
        isAllowance,
        isBenify,
        isBroadband,
        isPennyPlay,
        isWireless,
        isStudent,
        billing: {
          totalAmount: canOptOut ? pathOr(0, ['TotalAmount'], offer) : 0,
          nextChargeDate: formatDate(
            pathOr('', ['OffCycleDetail', 'NextRenewalDate'], decisionToUseForRenewalDate),
            locale
          ),
          unformattedNextChargeDate: pathOr('', ['OffCycleDetail', 'NextRenewalDate'], activePrimaryDecisionOption),
          // ToDo: point to the payment device once we have it surfacing on a subscriber offering.
          paymentDevice: null
        },
        campaign: {
          amount: pathOr(0, ['Total'], offer),
          totalAmount: pathOr(0, ['TotalAmount'], offer),
          discountExpirationDate: formatDate(
            pathOr('', ['Discounts', '0', 'DiscountExpirationDate'], hasDiscountExpirationDate),
            locale
          ),
          discountHasNotCycledOff
        },
        rightToReturn: daysSinceConnectionDate <= rightToReturnDays,
        rightToReturnTimeLeft: {
          days: rightToReturnDays - daysSinceConnectionDate,
          hours:
            !(rightToReturnDays - daysSinceConnectionDate) &&
            differenceInHours(new Date(), addDays(pathOr(new Date(), ['ConnectedDate'], offer), rightToReturnDays))
        },
        hasPrimaryOption: activePrimaryDecisionOption ?
          pathOr(null, ['OfferingOptionPriceId'], activePrimaryDecisionOption) :
          '',
        intentToPort: Boolean(portInNumber),
        inventoryItem:
          connectivityOption &&
          subscriberInventory.find((item) => {
            return item.SubscriberProductId === connectivityOption.SubscriberProductId;
          }),
        canOptOutOnRenew: canOptOut,
        hasFirstUsage,
        inGracePeriod,
        marketingTemplate: marketingTemplateToUse,
        smsAndVoiceIds: GetSmsAndVoiceIds(offer, isWireless),
        futureActivationDate,
        currentPricingPlanId: pathOr(undefined, ['PricingPlanId'], activePrimaryDecisionOption),
        placeholder: false
      };
    });
  }
);

export const HasPennyPlayProduct = createSelector([AllProducts], (products) =>
  products.some(({ isPennyPlay }) => isPennyPlay)
);

export const MainProductsList = createSelector([AllProducts], (products) => {
  return products.filter((product) => {
    return product.isWireless || product.isBroadband || product.isPennyPlay || product.isBenify;
  });
});

export const AllowanceProduct = createSelector(
  [AllProducts, ConvergentBillerSummaryData, AllowanceMarketingTemplate],
  (products, accountSummary: AccountSummary, allowanceMarketingTemplate) => {
    const allowanceProduct =
      products.find((product) => {
        return product.isAllowance && product.status === OFFERING_OVERALL_STATUS.ACTIVE;
      }) || EMPTY_OBJECT;

    if (accountSummary && allowanceMarketingTemplate) {
      const accountSummaries = pathOr({}, ['AccountSummaries', 0], accountSummary);
      const allAllowanceEntitlements = accountSummaries.SharedEntitlementBalances ? accountSummaries.SharedEntitlementBalances.filter((entitlement: any) => {
        return entitlement.EntitlementName === CONFIGURATION.ALLOWANCE_ENTITLEMENT_NAME;
      }) : [];

      if (allAllowanceEntitlements.length) {
        const currentBalance = sum(pluck('BalanceRemaining', allAllowanceEntitlements));
        const smallestPurchasableOption = getAllowanceViewData(allowanceMarketingTemplate)[0];

        return {
          ...allowanceProduct,
          currentBalance,
          canAddAllowance: currentBalance + smallestPurchasableOption.amount < CONFIGURATION.ALLOWANCE_AMOUNT_THRESHOLD
        };
      }
    }

    return EMPTY_OBJECT;
  }
);

export const SelectedProduct = createSelector([SelectedProductValue, AllProducts], (productId, products): InternalProduct => {
  const selectedProduct = products.find((product) => {
    return product.offeringInstanceId === productId;
  });

  if (selectedProduct) {
    return selectedProduct;
  }

  return {
    name: '',
    id: null,
    externalDisplayName: null,
    isBenify: false,
    isPennyPlay: false,
    marketingTemplate: {},
    isStudent: false,
    rightToReturnTimeLeft: {
      days: 0,
      hours: 0
    },
    hasPrimaryOption: '',
    inGracePeriod: false,
    planName: '',
    displayServiceIdentifier: '',
    smsAndVoiceIds: [],
    futureActivationDate: '',
    primaryOptionDisplayInfo: {},
    offeringInstanceId: null,
    offeringId: null,
    displayName: null,
    hasFirstUsage: false,
    canOptOutOnRenew: false,
    options: [],
    status: null,
    productName: null,
    currencyCode: null,
    thumbnailUrl: '',
    serviceIdentifier: undefined,
    billing: {
      totalAmount: 0,
      nextChargeDate: '',
      unformattedNextChargeDate: '',
      paymentDevice: null
    },
    campaign: {
      amount: 0,
      totalAmount: 0,
      discountExpirationDate: '',
      discountHasNotCycledOff: false
    },
    inventoryItem: [],
    rightToReturn: true,
    intentToPort: false,
    isAllowance: false,
    isWireless: false,
    isBroadband: false,
    placeholder: true
  };
});

export const SelectedProductSetting = createSelector(
  [SelectedProduct, OfferingAttributesForEdit, SearchServicesData],
  (product: InternalProduct, attributes: { [key: string]: any }, servicesData) => {
    const service = pathOr(
      EMPTY_ARRAY,
      [product.serviceIdentifier, 'ServiceThumbnails', 0, 'ServiceAttributeValues'],
      servicesData
    );
    const simIdObj = service.find(({ ExternalReference }) => ExternalReference === EXTERNAL_REF_ICCID);
    const pukIdObj1 = service.find(({ ExternalReference }) => ExternalReference === EXTERNAL_REF_PUK1);
    const pukIdObj2 = service.find(({ ExternalReference }) => ExternalReference === EXTERNAL_REF_PUK2);

    return {
      msisdn: product.serviceIdentifier,
      sim: path(['Value'], simIdObj),
      attributes: {
        [product.offeringInstanceId]: attributes[product.offeringInstanceId] || EMPTY_ARRAY
      },
      pukCode: path(['Value'], pukIdObj1) ? [path(['Value'], pukIdObj1), path(['Value'], pukIdObj2)] : undefined
    };
  }
);

export const EditedPortInNumber = createSelector([Products], (productState) => {
  return pathOr(null, ['customPortInNumber'], productState);
});

export const EditedPortInNumberInvalid = createSelector(Products, (productState) => {
  return pathOr(true, ['customPortInNumberInvalid'], productState);
});

export const SelectedProductPortInNumber = createSelector(
  [SelectedProduct, PortInNumberFromAttributes, EditedPortInNumber],
  (selectedProduct, portInNumberFromAttributes, editedPortInNumber) => {
    if (editedPortInNumber) {
      return {
        displayOrder: DISPLAY_ORDER_FOR_PORT_IN_NUMBER,
        value: editedPortInNumber
      };
    }

    if (!portInNumberFromAttributes && selectedProduct) {
      const mobileOption = selectedProduct.options.find((option) => option.ServiceAttributeValues.length > 0);

      let portInNumber;
      if (mobileOption) {
        portInNumber = getPortInNumber(mobileOption.ServiceAttributeValues);
      }

      return {
        displayOrder: DISPLAY_ORDER_FOR_PORT_IN_NUMBER,
        value: portInNumber ?
          portInNumber.Value.replace(
            FORMAT_LOCAL_SWEDISH_MOBILE_REGEX.pattern,
            FORMAT_LOCAL_SWEDISH_MOBILE_REGEX.replace
          ) :
          null
      };
    }

    return portInNumberFromAttributes;
  }
);

const productMobileEntitlementObjectCreate = (codesUnits: any[], entitlements: any[], roaming: any, bonusData: any) => {
  if (entitlements && roaming) {
    // Get all core (main) entitlements and then sort so latest to expire is first
    const bonusDataSubId = path(['EntitlementIdentifier', 'SubscriberProductId'], bonusData);
    const coreEntitlements = Immutable.asMutable(entitlements).filter((item) => {
      if (item.BalanceUnitCode === ENTITLEMENT_UNIT_TYPE.MOBILE_DATA && !ENTITLEMENT_ADDITIONAL_DATA.includes(item.EntitlementName)) {
        if (bonusDataSubId) {
          return path(['EntitlementIdentifier', 'SubscriberProductId'], item) !== bonusDataSubId;
        }
        return true;
      }
      return false;
    });
    // Get all data addon entitlements
    const addonEntitlements = entitlements.filter((item) => item.EntitlementName === ENTITLEMENT_NAMES.DATA_ADD_ON);

    // Get all penny data promo entitlements
    const dataPromo = entitlements.filter((item) => item.EntitlementName === ENTITLEMENT_NAMES.PROMO_DATA);

    // The first in the coreEntitlements array is this month's data (the furthest to expire). Shift removes it from the array for reduce() later
    const currentMonthsMainEntitlement = coreEntitlements.shift();
    const roamingEntitlment = pathOr(EMPTY_OBJECT, ['entitlement'], roaming);
    return {
      totalMonthlyDataRemaining: addonEntitlements.reduce(
        // Starting with current entitlement as seed, sum over all addons
        (total, { BalanceRemaining }) => total + BalanceRemaining,
        pathOr(0, ['BalanceRemaining'], currentMonthsMainEntitlement) + pathOr(0, ['BalanceRemaining'], bonusData)
      ),
      monthlyDataUnitOfMeasure: pathOr('', ['unitOfMeasure'], currentMonthsMainEntitlement),
      totalRolloverData:
        coreEntitlements
          // coreEntitlements now only has rollover data, sum them up
          .reduce((total, { BalanceRemaining }) => total + BalanceRemaining, 0) +
        pathOr(0, ['BalanceRemaining'], dataPromo[0]),
      rolloverUnitOfMeasure: pathOr('', ['unitOfMeasure'], currentMonthsMainEntitlement),
      totalRoamingDataRemaining: roamingEntitlment.BalanceRemaining,
      roamingDataUnitOfMeasure: pathOr(
        '',
        ['AdditionalProperties', 'short_name'],
        codesUnits.find(({ Value }) => {
          return Value === roamingEntitlment.BalanceUnitCode;
        })
      )
    };
  }
  return {
    totalMonthlyDataRemaining: 0,
    monthlyDataUnitOfMeasure: '',
    totalRolloverData: 0,
    rolloverUnitOfMeasure: '',
    totalRoaming: 0,
    roamingUnitOfMeasure: ''
  };
};

const forProductFindBonusData = (entitlements: any[], locker: any[], bonusProductId: any) =>
  entitlements.find(({ EntitlementIdentifier }) => {
    const subProdId = path(['SubscriberProductId'], EntitlementIdentifier);
    const lockerItem = locker.find(({ Id }) => Id === subProdId);
    return path(['Product', 'Id'], lockerItem) === bonusProductId;
  });

export const BonusEntitlementData = createSelector(
  LockerItems,
  SelectedProduct,
  AllServiceEntitlements,
  (locker: any, selectedProduct, allEntitlements: { [key: string]: any[] }) => {
    const entitlements = allEntitlements[selectedProduct.serviceIdentifier];
    return path(['length'], entitlements) && path(['length'], locker) ?
      forProductFindBonusData(entitlements, locker, AppConfig.BONUS_DATA_PRODUCT_VALUE) :
      undefined;
  }
);

export const SelectedProductMobileEntitlements = createSelector(
  [CodeItems(CODES.UnitOfMeasure), SelectedProduct, AllServiceEntitlements, RoamingByServiceId, BonusEntitlementData],
  (codesUnits, selectedProduct, allEntitlements: Entitlements, roamingData: [string], bonusData) => {
    const entitlements = allEntitlements[selectedProduct.serviceIdentifier];
    const roaming = roamingData[selectedProduct.serviceIdentifier];
    return productMobileEntitlementObjectCreate(codesUnits, entitlements, roaming, bonusData);
  }
);

export const ProductMobileEntitlements = createSelector(
  CodeItems(CODES.UnitOfMeasure),
  AllProducts,
  AllServiceEntitlements,
  RoamingByServiceId,
  LockerItems,
  (codesUnits: any, allProducts: InternalProduct[], allEntitlements: Entitlements, roamingData: { [key: string]: any }, locker: any[]) => {
    const allUsage: { [key: string]: any } = {};
    allProducts.forEach((product) => {
      const entitlements = allEntitlements[product.serviceIdentifier];
      const roaming = roamingData[product.serviceIdentifier];
      const bonusData =
        path(['length'], entitlements) && path(['length'], locker) ?
          forProductFindBonusData(entitlements, locker, AppConfig.BONUS_DATA_PRODUCT_VALUE) :
          undefined;
      allUsage[product.serviceIdentifier] = productMobileEntitlementObjectCreate(
        codesUnits,
        entitlements,
        roaming,
        bonusData
      );
    });
    return allUsage;
  }
);

export const UpcomingPaymentsAcrossProducts = createSelector([
  OfferingContextsByInstanceId,
  AllProducts
], (offeringContexts, allProducts) => {
  if (!offeringContexts) {
    return [];
  }

  const allUpcomingPaymentAcrossProducts = allProducts.reduce((products, product) => {
    const activeOptions = product.options.filter((o) => o.Status === 1);
    const discountExpirationDate = pathOr(null, [0, 'LifeCycleDetail', 'NextLifeCycleTransitionDate'], activeOptions);
    const context = pathOr({}, [product.id], offeringContexts);

    const productDecision = pathOr({}, [0], pathOr([], ['Context', 'Decisions'], context)
      .filter((d) => d.productId === product.productId));
    const decisionOption = pathOr({}, [0],
      pathOr([], ['Options'], productDecision)
        .filter((o) => o.PricingPlanId === product.currentPricingPlanId)
    );

    const amount = pathOr(0, ['Amount'], decisionOption);
    const discountAmount = pathOr(0, ['DiscountAmount'], decisionOption);
    const chargingAmount = amount - discountAmount;
    const originalAmount = amount;
    const hasDiscount = enableDiscounts() && chargingAmount < originalAmount;

    if ((product.status === OFFERING_OVERALL_STATUS.ORDER_PENDING || product.status === OFFERING_OVERALL_STATUS.ACTIVE) && product.name !== AllExternalDisplayNames.ALLOWANCE) {
      products.push({
        ...product,
        date: product.hasFirstUsage ? product.billing.nextChargeDate : null,
        product: product.displayName,
        chargingAmount,
        originalAmount,
        discountExpirationDate: discountExpirationDate || product.campaign.discountExpirationDate,
        status: product.status,
        hasFirstUsage: product.hasFirstUsage,
        hasDiscount
      });
    }
    return products;
  }, []);

  return [...allUpcomingPaymentAcrossProducts].sort((a, b) => {
    const d1 = new Date(b.date);
    const d2 = new Date(a.date);
    return d1.getTime() - d2.getTime();
  });
});

export const IsHandlingProductAction = createSelector(
  [
    ActivationIsLoading,
    IsCalculatingDecisionBeingModified,
    IsLoadingOfferingContextForDecision,
    IsSubmittingOrder,
    SubscriberOfferingsIsLoading,
    IsOfferingContextStatusLoading,
    SubmitOneTimePaymentIsLoading,
    IsConvergentBillerSummaryLoading
  ],
  (
    activationLoading,
    calculatingDecisions,
    loadingOfferingContext,
    submittingOrder,
    loadingOfferings,
    offeringStatusLoading,
    submittingOneTimePayment,
    isConvergentBillerSummaryLoading
  ) => {
    return (
      activationLoading ||
      calculatingDecisions ||
      loadingOfferingContext ||
      submittingOrder ||
      submittingOneTimePayment ||
      loadingOfferings ||
      offeringStatusLoading ||
      isConvergentBillerSummaryLoading
    );
  }
);

export const ActiveWirelessProducts = createSelector([AllProducts], (allProducts) => {
  return allProducts.filter(({ hasFirstUsage, isWireless }) => isWireless && hasFirstUsage);
});

export const HasInactivePennyPlay = createSelector(
  [ConvergentBillerSummaryData, OfferingExternalReferenceData],
  (accountSummary: AccountSummary | null, externalIds): boolean => {
    if (!accountSummary) {
      return false;
    }
    const pennyPlayOfferId = path([AllExternalDisplayNames.PLAY, 'offerId'], externalIds);
    const hasInactivePlay =
      accountSummary.OfferingSummaries?.findIndex(
        (offer) => offer.OfferingId === pennyPlayOfferId && offer.Status === OFFERING_STATUS.REMOVED
      ) !== -1;
    return hasInactivePlay;
  });

export const CrossSellProducts = createSelector(
  [AllProducts, HasPennyPlayProduct, ConvergentBillerSummaryData, OfferingExternalReferenceData, HasInactivePennyPlay],
  (allProducts, hasPennyPlayOffer, accountSummary: AccountSummary, externalIds, hasInactivePlay: boolean) => {
    if (!accountSummary) {
      return [];
    }
    const hasMobileOffers = allProducts.some(({ isWireless }) => isWireless);
    const hasBroadbandOffers = allProducts.some(({ isBroadband }) => isBroadband);
    const crossSellProducts = [];

    const hasReturnedPennyPlayOffer = !hasPennyPlayOffer && hasInactivePlay;

    // Have they at some point returned the penny play product?
    // SELL SELL SELL again!
    if (hasReturnedPennyPlayOffer) {
      crossSellProducts.push(CROSS_SELL_SUGGESTION.REACTIVATE_PENNY_PLAY);
    } else if (!hasPennyPlayOffer) {
      crossSellProducts.push(CROSS_SELL_SUGGESTION.ADD_PENNY_PLAY);
    }

    // No mobile? offer that. No BB? offer that. They have both? Offer more mobile.
    if (!hasMobileOffers && hasBroadbandOffers) {
      crossSellProducts.push(CROSS_SELL_SUGGESTION.ADD_MOBILE);
    } else if (!hasBroadbandOffers && hasMobileOffers) {
      crossSellProducts.push(CROSS_SELL_SUGGESTION.ADD_BROADBAND);
    } else if (hasBroadbandOffers && hasMobileOffers) {
      crossSellProducts.push(CROSS_SELL_SUGGESTION.ADD_MORE_MOBILE);
    }

    return crossSellProducts;
  }
);

export const SubscriberProductTypes = createSelector(
  [Subscriber, MainProductsList],
  (subscriber, subscriberProducts) => {
    const hasMobileOffers = subscriberProducts.some((product) => {
      return product.isWireless;
    });
    const hasBroadbandOffers = !!subscriberProducts.some((product) => {
      return product.isBroadband;
    });
    return {
      isLoggedIn: !!subscriber,
      hasMobileOffers,
      hasBroadbandOffers
    };
  }
);

export const RightToReturnReasons = createSelector(
  [CodeItems(CODES.RemoveReasons)],
  (returnReasons: any[]) =>
    returnReasons
      .filter(
        (code) =>
          path(['AdditionalProperties', 'order_type_code'], code) === ORDER_TYPE_CODE_CHANGE_OF_SERVICE &&
          path(['AdditionalProperties', 'order_change_type_code'], code) === ORDER_CHANGE_TYPE_CODE_RIGHT_TO_RETURN
      )
      .map((code) => ({
        label: code.Name,
        value: code.Value
      }))
);

export const PortInNumberAdditionalPropertyValueId = () => AppConfig.PORT_IN_NUMBER_CLOSED_ATTRIBUTE_ID;

const UsageItemsForSelectedProduct = createSelector(
  ConvergentBillerAccountUsageItems,
  SelectedProduct,
  (usageItems, selectedProduct) => {
    const items = pathOr(EMPTY_ARRAY, [selectedProduct.serviceIdentifier], usageItems);
    return Immutable.asMutable(items).sort((a, b) => {
      return Number(new Date(a.EventStartTime)) - Number(new Date(b.EventStartTime));
    });
  }
);

const convertUsageToGB = (item: any, unitsOfMeasure: any) => {
  let usage = item.UsageAmount;
  const NOT_VALID_DATA = 0;

  const validUnitCode = Object.keys(unitsOfMeasure).find((code) => {
    return code === item.UnitOfMeasureCode;
  });
  if (validUnitCode) {
    usage /= unitsOfMeasure[validUnitCode].Conversion;
  } else {
    usage = NOT_VALID_DATA;
  }

  return usage;
};

const getMonthlySum = (month: any, usageList: any[]) => {
  let usage = 0;
  usageList.forEach((item: any) => {
    if (item.month === month) {
      usage += item.usage;
    }
  });
  return usage.toFixed(2);
};

export const UsageDetailsForSelectedProduct = createSelector(
  [UsageItemsForSelectedProduct, UnitsOfMeasure],
  (usageItems, unitsOfMeasure) => {
    const usageList = usageItems.map((item) => {
      return {
        month: format(item.EventStartTime, 'MMM'),
        usage: convertUsageToGB(item, unitsOfMeasure)
      };
    });

    const months: any[] = [];
    usageList.forEach((item) => {
      if (!contains(item.month, months)) {
        months.push(item.month);
      }
    });

    const formattedUsage = months.map((month) => {
      return {
        month,
        usage: getMonthlySum(month, usageList)
      };
    });

    return formattedUsage;
  }
);

export const AllowancesForSelectedProduct = createSelector(
  [AllowancesAcrossProducts, SelectedProduct],
  (allAllowances: any[], selectedProduct: { serviceIdentifier: any; }) => {
    return allAllowances.filter(
      (allowance) =>
        allowance.sender === selectedProduct.serviceIdentifier ||
        allowance.receiver === selectedProduct.serviceIdentifier
    );
  }
);

export const PortInNumberFromAttributesOrCart = createSelector(
  [PortInNumberFromAttributes, SavedShoppingCartItems],
  (portInNumberFromAttributes: any, cartItems: any[]) => {
    if (portInNumberFromAttributes) {
      return portInNumberFromAttributes;
    }

    const portInNumberObj = cartItems
      .map((item) => {
        return getPortInNumber(item.ServiceAttributes || []);
      })
      .find((portInNumber) => portInNumber);

    if (portInNumberObj) {
      return {
        displayOrder: DISPLAY_ORDER_FOR_PORT_IN_NUMBER,
        value: path(['Value'], portInNumberObj)
      };
    }
  }
);

export const PortInDateFromAttributesOrCart = createSelector(
  [PortInDate, SavedShoppingCartItems],
  (portInDateFromAttributes: any, cartItems: any[]) => {
    if (portInDateFromAttributes) {
      return portInDateFromAttributes;
    }

    const portInDateObj = cartItems
      .map((item) => {
        return getPortInDate(item.ServiceAttributes || []);
      })
      .find((portInDate) => portInDate);

    return portInDateObj && portInDateObj.Value;
  }
);

export const ActivationDateFromAttributesOrCart = createSelector(
  [ActivationDate, SavedShoppingCartItems],
  (activationDateFromAttributes: any, cartItems: any[]) => {
    const serviceAttributeId = AppConfig.FUTURE_ACTIVATION_DATE_SERVICE_ATTRIBUTE_ID;

    if (activationDateFromAttributes) {
      return activationDateFromAttributes;
    }

    const activationDateObj = cartItems
      .map((item) => {
        return getFutureActivationDate(item.ServiceAttributes || [], serviceAttributeId);
      })
      .find((activationDate) => activationDate);

    return activationDateObj && activationDateObj.Value;
  }
);

export const ActivationDateFromAttributes = createSelector(
  [SubmitOrderData],
  (submitOrderData: any[]) => {
    const serviceAttributeId = AppConfig.FUTURE_ACTIVATION_DATE_SERVICE_ATTRIBUTE_ID;
    const submitOrderAttributes = pathOr(EMPTY_ARRAY, ['Items'], submitOrderData);
    const activationDateObj = submitOrderAttributes
      .map((item) => {
        return getFutureActivationDate(item.ServiceAttributeValues || [], serviceAttributeId);
      })
      .find((activationDate) => activationDate);

    return activationDateObj && activationDateObj.Value;
  }
);

export const ActivationDateForBroadband = createSelector([Products], (productsData: { broadbandActivationDate: Date }) => {
  const date = productsData.broadbandActivationDate;
  if (!date) {
    return read('broadbandActivationDate');
  }
  return date;
});

export const ActivationDateForMobile = createSelector([Products], (productsData: { mobileActivationDate: Date }) => {
  const date = productsData.mobileActivationDate;
  if (!date) {
    return read('mobileActivationDate');
  }
  return date;
});

export const ValidatePortInDateOnSupportRequests = createSelector(
  [RecentNewOrOpenSupportRequests],
  (recentNewOrOpenSupportRequests: { AdditionalPropertyValues: any[] }[]) => {
    return recentNewOrOpenSupportRequests.some((entry) =>
      entry.AdditionalPropertyValues ?
        entry.AdditionalPropertyValues.some((item) => item.Id.includes(AppConfig.PORT_IN_DATE_ATTRIBUTE_ID.toString())) :
        false
    );
  }
);

export const SubmittedShoppingCartIsPortIn = createSelector(
  [SubmitOrderData],
  (submitOrderData: any[]) => {
    const serviceAttributeId = AppConfig.PORT_IN_INTENT;
    const submitOrderAttributes = pathOr(EMPTY_ARRAY, ['Items'], submitOrderData);
    let isPortInIntent = false;

    const portInIntentObj = submitOrderAttributes.map((item) => {
      return getPortInIntent(item.ServiceAttributeValues || [], serviceAttributeId);
    }).find((portInDate) => portInDate);

    if (!isNil(portInIntentObj)) {
      // TODO: Relying on a hard coded string needs to be changed once #TEL2PEN-1200 work covered under feature is completed.
      isPortInIntent = (portInIntentObj.ServiceAttributeId === serviceAttributeId && portInIntentObj.Value === 'Behåll nummer');
    }

    return isPortInIntent;
  }
);
