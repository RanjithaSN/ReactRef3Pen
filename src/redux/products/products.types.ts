export interface ExternalReferences {
  [key: string]: ExternalReference
}
export interface ExternalReference {
  type: string;
  offerId: string;
}
export interface AccountSummary {
  AccountSummaries: {
    EntitlementBalances: { BalanceRemaining: number }[];
    Services: {
      EntitlementBalances: {
        BalanceRemaining: number }[]
      }[]
  }[];
  OfferingSummaries: any[];
}
export interface Entitlements {[key: string]: any[]}
export type Speeds = any;
export type Option = any;
export type Item = any;
export type MarketingTemplate = any;
export interface InternalProduct {
  name: string,
  currentPricingPlanId?: number,
  externalDisplayName: string | null,
  id: string | null,
  offeringInstanceId: string | null,
  offeringId: string | null,
  displayServiceIdentifier: string,
  displayName: string,
  options: Option[],
  thumbnailUrl: string,
  planName: string | null,
  primaryOptionDisplayInfo: Speeds
  productName: string,
  currencyCode: string,
  serviceIdentifier: string,
  status: string,
  isAllowance: boolean,
  isBenify: boolean,
  isBroadband: boolean,
  isPennyPlay: boolean,
  isWireless: boolean,
  isStudent: boolean,
  billing: {
      totalAmount: number,
      nextChargeDate: string,
      unformattedNextChargeDate: string,
      // ToDo: point to the payment device once we have it surfacing on a subscriber offering.
      paymentDevice: null
  },
  campaign: {
      amount: number,
      totalAmount: number,
      discountExpirationDate: string,
      discountHasNotCycledOff: boolean
  },
  rightToReturn: boolean,
  rightToReturnTimeLeft: {
      days: number,
      hours: number
  },
  hasPrimaryOption: string,
  intentToPort: boolean,
  inventoryItem: Item[],
  canOptOutOnRenew: boolean,
  hasFirstUsage: boolean,
  inGracePeriod: boolean,
  marketingTemplate: MarketingTemplate,
  smsAndVoiceIds: string[],
  futureActivationDate: string
  placeholder: boolean;
}
