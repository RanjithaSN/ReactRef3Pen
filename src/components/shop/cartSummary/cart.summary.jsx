import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { withI18n } from 'react-i18next';
import { AppContext } from 'selfcare-ui/src/components/appContext/app.context';
import CostWithLabel from 'selfcare-ui/src/components/costWithLabel/cost.with.label';
import Currency from 'selfcare-ui/src/components/currency/currency';
import Divider from 'selfcare-ui/src/components/divider/divider';
import ExpandableSection from 'selfcare-ui/src/components/expandableSection/expandable.section';
import Flag from 'selfcare-ui/src/components/flag/flag';
import Heading from 'selfcare-ui/src/components/heading/heading';
import Ledger, { LedgerRow, LedgerSection, LedgerTotal } from 'selfcare-ui/src/components/ledger/ledger';
import Link from 'selfcare-ui/src/components/link/link';
import Paragraph from 'selfcare-ui/src/components/paragraph/paragraph';
import ZeroState from 'selfcare-ui/src/components/zeroState/zero.state';
import IconBoxOpen from 'selfcare-ui/src/icons/react-icons/box-open';
import IconMapPin from 'selfcare-ui/src/icons/react-icons/map-pin';
import IconPlus from 'selfcare-ui/src/icons/react-icons/plus';
import IconTag from 'selfcare-ui/src/icons/react-icons/tag';
import { formatCurrency } from 'selfcare-ui/src/utilities/localization/currency';
import LocaleKeys from '../../../locales/keys';
import './cart.summary.scss';

class CartSummary extends React.Component {
  zeroState(className) {
    const { t } = this.props;

    return (
      <ZeroState
        title={t(LocaleKeys.CART.ZERO_STATE_DESCRIPTION)}
        className={className}
      />
    );
  }

  render() {
    const { isDbss } = this.context;
    const {
      className, currencyCode, disableClearCart, discounts, downPaymentTotalAmount, isEditingOffer, items, postalCode, selectedLocale, shippingTotal,
      shippingFeatures, showConditions, subtotalDueOnInvoice, subTotalDueToday, subTotals, t, taxTotal, totalDueOnInvoice, totalDueToday, onClearCart
    } = this.props;
    const isZeroState = !items.length;

    return (
      <div>
        { isZeroState ? this.zeroState(className) : (
          <div className={classNames('c-cart-summary', className)}>
            <div className="c-cart-summary__header">
              <Heading>{t(LocaleKeys.CART_SUMMARY.CART_SUMMARY)}</Heading>
            </div>
            <Divider />
            <div>
              {items.map(({ discountTotal, depositTotal, downPaymentTotal, id, name, oneTimeTotal, quantity, totals }) => (
                <div key={id} className="c-cart-summary__item">
                  <ExpandableSection
                    alignToggle="top"
                    className="c-cart-summary__item"
                    heading={(
                      <Heading
                        className={classNames({
                          'c-cart-summary__item-heading': true,
                          'c-cart-summary__item-heading--disabled': quantity < 0
                        })}
                        category="major"

                      >
                        {name}
                      </Heading>
                    )}
                    isDisabled={quantity < 0}
                    body={(
                      <React.Fragment>
                        {Boolean(totals.length) && (
                          <div className="c-cart-summary__item-totals">
                            {totals.map((total) => (
                              <CostWithLabel
                                key={`${id}_${total.label}_${total.amount}`}
                                alternate
                                cost={formatCurrency(total.amount, currencyCode, selectedLocale)}
                                label={total.label}
                                note={total.beforeDiscount && t(LocaleKeys.CART_SUMMARY.BEFORE_DISCOUNT, {
                                  amount: formatCurrency(total.beforeDiscount, currencyCode, selectedLocale)
                                })}
                              />
                            ))}
                            {Boolean(oneTimeTotal) && (
                              <CostWithLabel
                                key={`${id}_one_time_${oneTimeTotal}`}
                                alternate
                                cost={formatCurrency(oneTimeTotal, currencyCode, selectedLocale)}
                                label={t(LocaleKeys.CART_SUMMARY.DUE_TODAY)}
                              />
                            )}
                          </div>
                        )}
                        <div className="c-cart-summary__item-details">
                          {Boolean(discountTotal) && (
                            <Flag
                              className="c-cart-summary__item-detail-flag"
                              text={t(LocaleKeys.CART_SUMMARY.DISCOUNTS, {
                                amount: formatCurrency(discountTotal, currencyCode, selectedLocale)
                              })}
                              icon={<IconTag />}
                            />
                          )}
                          {Boolean(depositTotal) && (
                            <Flag
                              className="c-cart-summary__item-detail-flag"
                              text={t(LocaleKeys.CART_SUMMARY.DEPOSITS, {
                                amount: formatCurrency(depositTotal, currencyCode, selectedLocale)
                              })}
                              icon={<IconPlus />}
                            />
                          )}
                          {Boolean(downPaymentTotal || downPaymentTotalAmount) && (
                            <Flag
                              className="c-cart-summary__item-detail-flag"
                              text={t(LocaleKeys.CART_SUMMARY.DOWN_PAYMENTS, {
                                amount: formatCurrency(downPaymentTotal || downPaymentTotalAmount, currencyCode, selectedLocale)
                              })}
                              icon={<IconPlus />}
                            />
                          )}
                        </div>
                      </React.Fragment>
                    )}
                  />
                </div>
              ))}
            </div>
            <Divider />
            <Ledger className="c-cart-summary__ledger">
              {Boolean(discounts.length) && (
                <LedgerSection>
                  {discounts.map(({ amount, labels: [name, subtext] }) => (
                    Boolean(amount) && (
                      <LedgerRow
                        key={`${name}_${amount}`}
                        name={name}
                        amount={<Currency value={amount} code={currencyCode} locale={selectedLocale} />}
                        subtext={subtext}
                      />
                    )
                  ))}
                </LedgerSection>
              )}
              {Boolean(subTotals.length) && (
                <LedgerSection>
                  {subTotals.map(({ amount, labels: [name, subtext] }) => (
                    Boolean(amount) && (
                      <LedgerRow
                        key={`${name}_${amount}`}
                        name={name}
                        amount={<Currency value={amount} code={currencyCode} locale={selectedLocale} />}
                        subtext={subtext}
                      />
                    )
                  ))}
                  {isDbss && subtotalDueOnInvoice !== undefined && (
                    <LedgerRow
                      name={t(LocaleKeys.CART_SUMMARY.SUBTOTAL_DUE_ON_INVOICE)}
                      amount={<Currency value={subtotalDueOnInvoice} code={currencyCode} locale={selectedLocale} />}
                    />
                  )}
                </LedgerSection>
              )}
              {showConditions ? (
                <LedgerSection>
                  <LedgerRow
                    name={t(LocaleKeys.CART_SUMMARY.TAXES)}
                    note={t(LocaleKeys.CART_SUMMARY.CALCULATED_IN_CHECKOUT)}
                  />
                  <LedgerRow
                    name={t(LocaleKeys.CART_SUMMARY.SHIPPING)}
                    note={t(LocaleKeys.CART_SUMMARY.CALCULATED_IN_CHECKOUT)}
                  />
                </LedgerSection>
              ) : Boolean(taxTotal || shippingTotal) && (
                <LedgerSection>
                  {Boolean(taxTotal) && (
                    <LedgerRow
                      name={t(LocaleKeys.CART_SUMMARY.TAXES)}
                      amount={<Currency value={taxTotal} code={currencyCode} locale={selectedLocale} />}
                    />
                  )}
                  {Boolean(shippingTotal) && (
                    <LedgerRow
                      name={t(LocaleKeys.CART_SUMMARY.SHIPPING)}
                      amount={<Currency value={shippingTotal} code={currencyCode} locale={selectedLocale} />}
                    />
                  )}
                </LedgerSection>
              )}
              {(subTotalDueToday !== undefined || totalDueToday !== undefined || totalDueOnInvoice !== undefined) && (
                <LedgerSection borderless>
                  {subTotalDueToday !== undefined && (
                    <LedgerTotal
                      hasEmphasis
                      name={t(LocaleKeys.CART_SUMMARY.SUBTOTAL_TODAY)}
                      amount={<Currency value={isDbss && isEditingOffer ? 0 : subTotalDueToday} code={currencyCode} locale={selectedLocale} />}
                    />
                  )}
                  {totalDueToday !== undefined && (
                    <LedgerTotal
                      hasEmphasis
                      name={t(LocaleKeys.CART_SUMMARY.TOTAL_DUE_TODAY)}
                      amount={<Currency value={isDbss && isEditingOffer ? 0 : totalDueToday} code={currencyCode} locale={selectedLocale} />}
                    />
                  )}
                  {isDbss && totalDueOnInvoice !== undefined && (
                    <LedgerTotal
                      hasEmphasis
                      name={t(LocaleKeys.CART_SUMMARY.TOTAL_DUE_ON_INVOICE)}
                      amount={<Currency value={totalDueOnInvoice} code={currencyCode} locale={selectedLocale} />}
                    />
                  )}
                  <Divider />
                </LedgerSection>
              )}
            </Ledger>
            <div className="c-cart-summary__notes">
              {!disableClearCart && (
                <div className="c-cart-summary__actions">
                  <Link onClick={onClearCart}>
                    {t(LocaleKeys.CART_SUMMARY.CLEAR_CART)}
                  </Link>
                </div>
              )}
              {showConditions && (
                <Paragraph className="c-cart-summary__conditions">
                  {`* ${t(LocaleKeys.CART_SUMMARY.CONDITIONS)}`}
                </Paragraph>
              )}
              {postalCode && (
                <React.Fragment>
                  <Flag
                    text={t(LocaleKeys.OFFER_SUMMARY.AVAILABLE_OFFERS_FOR, {
                      postal_code: postalCode
                    })}
                    icon={<IconMapPin />}
                  />
                  <Divider />
                </React.Fragment>
              )}
              {shippingFeatures && (
                <React.Fragment>
                  <Flag
                    text={t(LocaleKeys.CART_SUMMARY.FREE_SHIPPING_ON, {
                      amount: shippingFeatures.freeShippingAmount
                    })}
                    icon={<IconTag />}
                  />
                  <Flag text={t(LocaleKeys.CART_SUMMARY.EASY_RETURNS)} icon={<IconBoxOpen />} />
                  <Divider />
                </React.Fragment>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}

CartSummary.displayName = 'CartSummary';
CartSummary.contextType = AppContext;
CartSummary.propTypes = {
  className: PropTypes.string,
  /** Currency Code */
  currencyCode: PropTypes.string,
  /** Whether to disable the clear cart button */
  disableClearCart: PropTypes.bool,
  /** Discounts associated with the Offer */
  discounts: PropTypes.arrayOf(PropTypes.shape({
    /** Amount of Discount */
    amount: PropTypes.number,
    /** BRI type, in context */
    type: PropTypes.string
  })).isRequired,
  /** Down payments subtotal from quote */
  downPaymentTotalAmount: PropTypes.number,
  /** User is editing a purchased offer */
  isEditingOffer: PropTypes.bool.isRequired,
  /** Individual Cart items; typically Offers */
  items: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.string,
    totals: PropTypes.arrayOf(PropTypes.shape({
      amount: PropTypes.number,
      label: PropTypes.string,
      beforeDiscount: PropTypes.number
    })),
    discountTotal: PropTypes.number,
    depositTotal: PropTypes.number,
    downPaymentTotal: PropTypes.number,
    oneTimeTotal: PropTypes.number
  })),
  /** Callback invoked when Clear Cart is selected */
  onClearCart: PropTypes.func.isRequired,
  /** Zip code for the current offering context */
  postalCode: PropTypes.number,
  /** Current locale code */
  selectedLocale: PropTypes.string,
  /** TBD shipping-related information and promotions */
  shippingFeatures: PropTypes.shape({
    freeShippingAmount: PropTypes.string
  }),
  /** Quote total for shipping */
  shippingTotal: PropTypes.number,
  /** Whether to render the Conditions note & to-be-calculated messages for shipping and taxes */
  showConditions: PropTypes.bool,
  /** Quote subTotals, by BRI */
  subTotals: PropTypes.arrayOf(PropTypes.shape({
    /** Amount of Discount */
    amount: PropTypes.number,
    /** BRI type, in context */
    type: PropTypes.string
  })).isRequired,
  /** SubTotal Due on Invoice for edit offer flow */
  subtotalDueOnInvoice: PropTypes.number,
  /** Sub total of deposits due today */
  subTotalDueToday: amountDueToday,
  /** [[IgnoreDoc]] Translate function provided by react-i18next */
  t: PropTypes.func.isRequired,
  /** Quote total for taxes */
  taxTotal: PropTypes.number,
  /** Total Due on Invoice for edit offer flow */
  totalDueOnInvoice: PropTypes.number,
  /** Total deposit due today */
  totalDueToday: amountDueToday
};
CartSummary.defaultProps = {
  disableClearCart: false,
  showConditions: false
};

function amountDueToday(props, componentName) {
  const subtotal = props.subTotalDueToday;
  const total = props.totalDueToday;

  if (subtotal !== undefined && typeof subtotal !== 'number') {
    return new Error(`Invalid prop 'subTotalDueToday' of type '${typeof subtotal}' supplied to '${componentName}'. Expected number.`);
  }

  if (total !== undefined && typeof total !== 'number') {
    return new Error(`Invalid prop 'totalDueToday' of type '${typeof total}' supplied to '${componentName}'. Expected number.`);
  }

  if (subtotal !== undefined && total !== undefined) {
    return new Error('subTotalDueToday and totalDueToday cannot be used at the same time.');
  }

  return null;
}

export default withI18n()(CartSummary);
