import Immutable from 'seamless-immutable';

export const SubscriberRequirementsSampleObject = new Immutable({
  Value: '10102',
  AdditionalProperties: {
    minimum_age: '18',
    maximum_age: '200',
    display_home_phone: 'False',
    capture_home_phone: 'False',
    display_mobile_phone: 'True',
    capture_mobile_phone: 'True',
    display_business_phone: 'False',
    capture_business_phone: 'False',
    display_birthdate: 'True',
    capture_birthdate: 'True',
    display_gender: 'False',
    capture_gender: 'False',
    capture_email_as_login: 'False',
    display_subscriber_lead_source: 'False',
    capture_subscriber_lead_source: 'False',
    display_subscriber_contact_preference: 'False',
    capture_subscriber_contact_preference: 'False',
    display_subscribes_to_communications: 'False',
    display_subscribes_to_partners: 'False',
    subscribes_to_newsletter_alias: '',
    subscribes_to_partners_alias: '',
    require_device_on_signup: 'False',
    display_race: 'False',
    capture_race: 'False',
    display_ssn: 'False',
    capture_ssn: 'False',
    display_drivers_license_number: 'False',
    capture_drivers_license_number: 'False',
    display_drivers_license_state: 'False',
    capture_drivers_license_state: 'False',
    display_income_level: 'False',
    capture_income_level: 'False',
    display_preferred_language: 'False',
    capture_preferred_language: 'False',
    capture_subscriber_first_name: 'True',
    capture_subscriber_last_name: 'True',
    capture_challenge_response: 'False',
    require_email_verification: 'False',
    email_verification_expiration_days: '',
    display_subscriber_names: 'True',
    display_company_name: 'False',
    capture_company_name: 'False',
    capture_ssn_for_credit_check: 'False',
    capture_drivers_license_number_for_credit_check: 'False',
    capture_birthdate_for_credit_check: 'False',
    enable_custom_password_challenge: 'False',
    number_of_required_identification_types: '0',
    enable_prospect_lite: 'True',
    enable_prospect_lite_for_household: 'True',
    set_login_as_guid: 'False'
  }
});

export const FieldsSampleObject = new Immutable({
  birthdate: {
    type: 'text',
    label: 'subscriber.birth_date',
    validation: {
      minimum_age: null,
      maximum_age: null,
      required: true
    },
    key: 'BirthDate',
    display: true,
    size: 'medium'
  },
  business_phone: {
    type: 'text',
    label: 'subscriber.business_phone',
    validation: {
      minLength: 0,
      maxLength: 20
    },
    key: 'BusinessPhone',
    display: true,
    size: 'full'
  },
  email: {
    type: 'text',
    label: 'subscriber.email',
    validation: {
      regex: {
        pattern: '(?:[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*|"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)])',
        flag: 'g'
      },
      required: true
    },
    key: 'Email',
    display: true,
    size: 'full'
  },
  first_name: {
    type: 'text',
    label: 'subscriber.first_name',
    validation: {
      minLength: 0,
      maxLength: 100,
      required: true
    },
    key: 'FirstName',
    display: true,
    size: 'medium'
  },
  gender: {
    type: 'code_select',
    label: 'subscriber.gender',
    code: 63,
    validation: {},
    key: 'Gender',
    display: true,
    size: 'medium'
  },
  home_phone: {
    type: 'text',
    label: 'subscriber.home_phone',
    validation: {
      minLength: 0,
      maxLength: 20
    },
    key: 'HomePhone',
    display: true,
    size: 'full'
  },
  language: {
    type: 'code_select',
    label: 'subscriber.language',
    code: 188,
    validation: {},
    key: 'Language',
    display: true,
    size: 'full'
  },
  last_name: {
    type: 'text',
    label: 'subscriber.last_name',
    validation: {
      minLength: 0,
      maxLength: 100,
      required: true
    },
    key: 'LastName',
    display: true,
    size: 'medium'
  },
  mobile_phone: {
    type: 'text',
    label: 'subscriber.mobile_phone',
    validation: {
      minLength: 0,
      maxLength: 20
    },
    key: 'MobilePhone',
    display: true,
    size: 'full'
  }
});

export const UserInfoFormValuesSampleObject = new Immutable({
  BirthDate: '9/9/1978',
  LastSuccessfulLogin: '2019-11-06T20:16:01.793Z',
  LastFailedLogin: '2019-11-06T17:07:44.933Z',
  SubscriberConsents: [],
  StatusName: 'Active',
  LastSessionCountry: 'USA',
  HomeCountry: 'SWE',
  ContactPreferences: [
    {
      Id: 1629028,
      ContactEventType: 12,
      ContactMethod: 40
    }
  ],
  SubscriberTypeDetails: {
    InvoiceDisplay: 'Default',
    BillCycle: '40000500',
    BillCycleDay: 26,
    IsReadOnly: false
  },
  InvoiceConfiguration: {
    HideZeroAmount: true,
    InvoiceDetailLevel: 1
  },
  SubscriberCurrency: 'SEK',
  EffectiveStartDate: '2019-09-23T16:13:13.603Z',
  StateName: 'Active',
  SubscriberIdentifications: [
    {
      Id: 1942,
      SubscriberIdentificationTypeCode: 10011,
      SubscriberIdentificationValue: '******1221'
    }
  ],
  Id: 4113063,
  Created: '2019-09-23T16:13:13.630Z',
  FirstName: 'Michelle',
  LastName: 'Weeks',
  Email: 'michelle.weeks@aviture.us.com',
  MobilePhone: '9988776655',
  Language: 'sv-SE',
  Status: 1,
  Login: 'mkw',
  HasActiveSubscriptions: false,
  ConvergentBillerId: '40000418',
  SubscriberTypeCode: 5,
  State: 1,
  StateChangeDate: '2019-09-23T16:13:15.203Z',
  TaxExemption: {
    Id: '80921',
    CountyExempt: false,
    FederalExempt: false,
    Unincorporated: false,
    LocalExempt: false,
    StateExempt: false,
    Lifeline: false,
    WholesaleFlag: false
  },
  Category: 0
});
