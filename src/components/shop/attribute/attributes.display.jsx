import { FORMAT_LOCAL_SWEDISH_MOBILE_REGEX } from '@selfcare/core/constants/subscriber';
import { today, getNextAvailableDay } from '@selfcare/core/helpers/date.helper';
import classNames from 'classnames';
import addDays from 'date-fns/add_days';
import format from 'date-fns/format';
import isPast from 'date-fns/is_past';
import isValid from 'date-fns/is_valid';
import PropTypes from 'prop-types';
import path from 'ramda/src/path';
import React, { useCallback, useEffect, useState } from 'react';
import { withI18n } from 'react-i18next';
import FilledButton from 'selfcare-ui/src/components/button/filled.button';
import FormErrors from 'selfcare-ui/src/components/formErrors/form.errors';
import Heading from 'selfcare-ui/src/components/heading/heading';
import Input from 'selfcare-ui/src/components/input/input';
import InputField from 'selfcare-ui/src/components/inputField/input.field';
import LoadingIndicator from 'selfcare-ui/src/components/loadingIndicator/loading.indicator';
import Modal from 'selfcare-ui/src/components/modal/modal';
import Paragraph from 'selfcare-ui/src/components/paragraph/paragraph';
import Radio from 'selfcare-ui/src/components/radio/radio';
import RadioButton from 'selfcare-ui/src/components/radioButton/radio.button';
import RadioButtonGroup from 'selfcare-ui/src/components/radioButtonGroup/radio.button.group';
import RadioGroup from 'selfcare-ui/src/components/radioGroup/radio.group';
import IconStatusCompleteFilled from 'selfcare-ui/src/icons/react-icons/status-complete-filled';
import { DECISION_TYPE } from '../../../constants/order.constants';
import { checkForDisplayedErrors } from '../../../helpers/validation.helpers';
import LocaleKeys from '../../../locales/keys';
import { DISPLAY_ORDER_FOR_ACTIVATION_DATE, DISPLAY_ORDER_FOR_PORT_IN_NUMBER, HIDDEN_NUMBER_BUTTONS, REQUIRED_FIELDS } from '../../../redux/orderFlow/attributes/attributes.order.flow.constants';
import { shouldShowAttribute } from '../../../redux/orderFlow/attributes/attributes.order.flow.helper';
import DatePicker from '../../datePicker/date.picker';
import { PORTIN_VALUES } from '../../products/manageProduct/portIn/port.in.constants';
import Attribute from './attribute';
import './attributes.display.scss';

const AttributeInfoModal = withI18n()(
  ({ onClose, t }) => (
    <Modal
      heading={<Heading category="major">{t(LocaleKeys.OFFER_ATTRIBUTES.PORT_IN_MODAL.TITLE)}</Heading>}
      content={t(LocaleKeys.OFFER_ATTRIBUTES.PORT_IN_MODAL.DESCRIPTION)}
      onClose={onClose}
      size="small"
      buttons={(
        <FilledButton onClick={onClose} width="full">
          {t(LocaleKeys.OFFER_ATTRIBUTES.PORT_IN_MODAL.BUTTON_TEXT)}
        </FilledButton>
      )}
    />

  )
);

function AttributesDisplay({ defaultDays, maxDays, minDays, decisionAttributes, errors, title, touched, setFieldTouched, setFieldValue, inlineView, isMobileOffer, subtitle, t, updateAttributeValue, validateForm, values, updateBroadbandActivationDate, isBroadbandOffer }) {
  const [backupTouched, setBackupTouched] = useState({}); // the touched prop from formik is being cleared on prop update, so need another way to determine if errors should be shown.
  const [displayNow, setDisplayNow] = useState(null);
  const [keyList, setKeyList] = useState([]);
  const [valueList, setValueList] = useState([]);
  const [showAttributeModal, toggleAttributeModal] = useState(false);

  useEffect(() => {
    const potentialKeyList = Object.keys(decisionAttributes);

    // If we don't have a currently active displayNow, or if it's changed and we need to reset, load up the data
    if (potentialKeyList.length && (!displayNow || displayNow !== potentialKeyList[0])) {
      setKeyList(potentialKeyList);
      setDisplayNow(keyList[0]);
      setValueList(keyList.map((key) => {
        if (!decisionAttributes[key]) {
          return;
        }
        const metaAttr = decisionAttributes[key].find((attr) => {
          return attr.possibleValues.length === 0;
        });
        return {
          id: key,
          instance: decisionAttributes[key].length ? decisionAttributes[key][0].instanceNumber : '',
          name: decisionAttributes[key].length ? decisionAttributes[key][0].pricingPlanName : '',
          meta: metaAttr ? metaAttr.id : null
        };
      }));
      validateForm();
    }
  }, [decisionAttributes, displayNow, isMobileOffer, keyList, validateForm]);

  const updateValue = useCallback((attributeId, value, isRequired, attributeDisplayOrder) => {
    const attrList = decisionAttributes[displayNow];
    const optionId = path(['data', 'OfferingOptionPriceId'], attrList.find(({ id }) => id === attributeId));
    updateAttributeValue(DECISION_TYPE.QUANTITY, optionId, attributeId, value, isRequired, attributeDisplayOrder);
    setFieldValue(attributeId, value);
    setFieldTouched(attributeId);
    setBackupTouched({
      ...backupTouched,
      [attributeId]: true
    });
  }, [backupTouched, decisionAttributes, displayNow, updateAttributeValue, setFieldValue, setFieldTouched, setBackupTouched]);

  const checkForInvalidDates = useCallback((dateString) => {
    return isPast(new Date(dateString)) || !isValid(new Date(dateString)) || dateString === '12/31/9999' || dateString === '' || dateString === '01/01/0000';
  }, []);

  useEffect(() => {
    if (displayNow && decisionAttributes[displayNow]) {
      const attributes = decisionAttributes[displayNow];
      attributes.forEach((attribute) => {
        if (attribute.isDate && checkForInvalidDates(attribute.formValue) && defaultDays && attribute.formValue !== 'Invalid Date') {
          const initialValue = attribute.data.DisplayOrder === DISPLAY_ORDER_FOR_ACTIVATION_DATE ? addDays(today(), defaultDays) : getNextAvailableDay(PORTIN_VALUES.DEFAULT);
          updateValue(attribute.id, format(initialValue, 'YYYY-MM-DD'), attribute.isRequired, path(['data', 'DisplayOrder'], attribute));
        }
      });
    }
  }, [checkForInvalidDates, updateValue, isMobileOffer, decisionAttributes, displayNow, defaultDays]);

  useEffect(() => {
    if (!isMobileOffer && defaultDays) {
      updateBroadbandActivationDate(format(addDays(new Date(today()), defaultDays), 'MM/DD/YYYY'));
    }
  }, [updateBroadbandActivationDate, isMobileOffer, defaultDays]);

  const displayErrors = () => {
    return checkForDisplayedErrors(errors, touched);
  };

  const buildBinarySelectOptions = (attr) => {
    const possibleValues = [...REQUIRED_FIELDS, ...HIDDEN_NUMBER_BUTTONS];
    const requiredPossibleValues = attr.possibleValues.filter(item => possibleValues.includes(item));
    if (shouldShowAttribute(attr.data)) {
      return requiredPossibleValues.map((option) => (
        <RadioButton
          key={option}
          id={`${attr.id}-${option}`}
          value={option}
          checked={attr.formValue === option}
        >
          {option}
        </RadioButton>
      ));
    }

    return requiredPossibleValues.map((option) => (
      <Radio
        key={option}
        id={`${attr.id}-${option}`}
        value={option}
        checked={attr.formValue === option}
      >
        {option}
      </Radio>
    ));
  };

  const availableDays = (displayOrder) => {
    const fdaValues = {
      default: addDays(new Date(today()), defaultDays),
      min: minDays,
      max: maxDays
    };

    const portinValues = {
      default: getNextAvailableDay(PORTIN_VALUES.DEFAULT),
      min: PORTIN_VALUES.MIN,
      max: PORTIN_VALUES.MAX
    };

    return displayOrder === DISPLAY_ORDER_FOR_ACTIVATION_DATE ? fdaValues : portinValues;
  };


  if (isMobileOffer && displayNow && decisionAttributes[displayNow]) {
    const attributes = decisionAttributes[displayNow];

    const formatDisplaySerialNumber = (serialNumber) => {
      if (serialNumber && serialNumber.match(/^46[0-9]+$/)) {
        return serialNumber.replace(FORMAT_LOCAL_SWEDISH_MOBILE_REGEX.pattern, FORMAT_LOCAL_SWEDISH_MOBILE_REGEX.replace);
      }
      return serialNumber;
    };

    return (
      <div
        key={displayNow}
        className={classNames('c-attributes-display__content', {
          'c-attributes-display__content--has-navigation': keyList.length > 1
        })}
      >
        {showAttributeModal && <AttributeInfoModal onClose={() => toggleAttributeModal(false)} t={t} />}
        {keyList.length > 1 && (
          <div className="c-attributes-display__navigation">
            {valueList.map((item) => {
              const isValidItem = !errors[item.id];
              return (
                <div
                  key={item.id}
                  className={classNames('c-completion-tab', {
                    'c-completion-tab--active': item.id === displayNow
                  })}
                >
                  <div className="c-completion-tab__content">
                    <div className="c-completion-tab__name">{item.name}</div>
                    <div className="c-completion-tab__meta">{item.meta && values[item.meta]}</div>
                  </div>
                  <div
                    className={classNames('c-completion-tab__indicator', {
                      'c-completion-tab__indicator--valid': isValidItem
                    })}
                  >
                    {isValidItem && <IconStatusCompleteFilled />}
                  </div>
                </div>
              );
            })}
          </div>
        )}
        <div
          className={classNames('c-attributes-display__main', {
            'c-attributes-display__main-inline': inlineView
          })}
        >
          {!inlineView && <Heading category="brand" tone="normal">{title}</Heading>}
          {subtitle && <Heading category="major" tone="quiet" className="c-attributes-display__subtitle">{subtitle}</Heading>}
          {displayErrors() && <FormErrors className="c-subscriber-form__errors" />}
          <form>
            {attributes.map((attr) => {
              const inputParams = {};
              if ((touched[attr.id] || backupTouched[attr.id]) && errors[attr.id]) {
                inputParams.error = 'true';
              }

              return (
                <div key={attr.id}>
                  <Attribute
                    title={attr.title}
                    attrId={attr.id}
                    description={!attr.isDate ? attr.description : null}
                    isDependant={attr.dependentServiceAttributeId}
                    isLast={attr.isLast}
                    isRequired={attr.isRequired}
                    error={(touched[attr.id] || backupTouched[attr.id]) && errors[attr.id]}
                    inlineView={inlineView}
                  >
                    {attr.isRadio && attr.inventoryItemReservation.options.length > 2 && (
                      <RadioButtonGroup name={attr.id} className="c-attributes-display__radio-button-group" onChange={(e) => updateValue(e.target.name, e.target.value, attr.isRequired)}>
                        {attr.inventoryItemReservation.options.map((option) => (
                          <RadioButton
                            key={option.SerialNumber}
                            id={option.SerialNumber}
                            value={option.SerialNumber}
                            checked={attr.formValue === option.SerialNumber}
                            className="c-attributes-display__radio-button"
                          >
                            <div className="c-attributes-display__radio-button-content">
                              <span>{formatDisplaySerialNumber(option.SerialNumber)}</span>
                            </div>
                          </RadioButton>
                        ))}
                      </RadioButtonGroup>
                    )}
                    {attr.isRadio && attr.inventoryItemReservation.options.length === 2 && (
                      <RadioGroup inlineView name={attr.id} onChange={(e) => updateValue(e.target.name, e.target.value, attr.isRequired)}>
                        {attr.inventoryItemReservation.options.map((option) => (
                          <Radio
                            key={option.SerialNumber}
                            id={option.SerialNumber}
                            value={option.SerialNumber}
                            checked={attr.formValue === option.SerialNumber}
                          >
                            {option.SerialNumber}
                          </Radio>
                        ))}
                      </RadioGroup>
                    )}
                    {attr.isSelect && attr.possibleValues.length && (
                      <div>
                        <RadioGroup inlineView name={attr.id} onChange={(e) => updateValue(e.target.name, e.target.value, attr.isRequired)}>
                          {buildBinarySelectOptions(attr)}
                        </RadioGroup>
                      </div>
                    )}
                    {attr.isDate && (
                      <>
                        <Heading className="c-attributes-display__date-title" category="major" tone="normal">{attr.title ? attr.title : t(LocaleKeys.SHOP.DATE_SELECTION_TITLE)}</Heading>
                        <Paragraph className="c-attributes-display__date-description" tone="normal">{attr.description}</Paragraph>
                        <DatePicker
                          id={attr.id}
                          name={attr.name}
                          labelText={t(LocaleKeys.SHOP.DATE_SELECTION_PLACEHOLDER)}
                          allowNonBusinessDays={attr.data.DisplayOrder === DISPLAY_ORDER_FOR_ACTIVATION_DATE}
                          onDayChange={(day) => {
                            updateValue(attr.id, format(day, 'YYYY-MM-DD'), attr.isRequired, path(['data', 'DisplayOrder'], attr));
                          }}
                          initialValue={availableDays(attr.data.DisplayOrder).default}
                          maxDays={availableDays(attr.data.DisplayOrder).max}
                          minDays={availableDays(attr.data.DisplayOrder).min}
                          size="large"
                        />
                      </>
                    )}

                    {!attr.isRadio && !attr.isSelect && !attr.isDate && (
                      (attr.data.DisplayOrder === DISPLAY_ORDER_FOR_PORT_IN_NUMBER) ? (
                        <InputField
                          labelText={t(LocaleKeys.SHOP.ENTER_PORT_IN)}
                          info={t(LocaleKeys.SHOP.ENTER_PORT_IN_HINT)}
                          required
                          input={(
                            <Input
                              id={attr.id}
                              name=""
                              type="tel"
                              value={attr.formValue}
                              onChange={(e) => updateValue(e.target.id, e.target.value, true, path(['data', 'DisplayOrder'], attr))}
                              size="full"
                              {...inputParams}
                            />
                          )}
                        />
                      ) : (
                        <Input
                          id={attr.id}
                          type="text"
                          name={attr.name}
                          value={attr.formValue}
                          onChange={(e) => updateValue(e.target.id, e.target.value, attr.isRequired, path(['data', 'DisplayOrder'], attr))}
                          size="full"
                          {...inputParams}
                        />
                      )
                    )}
                  </Attribute>
                </div>
              );
            })}
          </form>
        </div>
      </div>
    );
  }

  if (isBroadbandOffer && displayNow && decisionAttributes[displayNow]) {
    const attributes = decisionAttributes[displayNow];
    return (
      <>
        <Heading category="brand" tone="normal">{title}</Heading>
        {subtitle && <Heading category="major" tone="quiet" className="c-attributes-display__subtitle">{subtitle}</Heading>}
        {displayErrors() && <FormErrors className="c-subscriber-form__errors" />}
        <div className="c-attributes-display__filler">
          {t(LocaleKeys.OFFER_ATTRIBUTES.BROADBAND)}
          <form>
            {attributes.map((attr) => (
              <Attribute
                key={attr.id}
                title={attr.name}
                attrId={attr.id}
                description={null}
                isDependant={attr.dependentServiceAttributeId}
                isLast={attr.isLast}
                isRequired={attr.isRequired}
                error={(touched[attr.id] || backupTouched[attr.id]) && errors[attr.id]}
                inlineView={inlineView}
              >
                {attr.data.DisplayOrder === DISPLAY_ORDER_FOR_ACTIVATION_DATE && (
                  <>
                    <Heading className="c-attributes-display__date-title" category="major" tone="normal">{attr.title ? attr.title : t(LocaleKeys.SHOP.DATE_SELECTION_TITLE)}</Heading>
                    <Paragraph className="c-attributes-display__date-description" tone="normal">{attr.description}</Paragraph>
                    <DatePicker
                      id={attr.id}
                      name={attr.title}
                      labelText={t(LocaleKeys.SHOP.DATE_SELECTION_PLACEHOLDER)}
                      allowNonBusinessDays
                      onDayChange={(day) => {
                        if (updateBroadbandActivationDate) {
                          updateBroadbandActivationDate(format(day, 'YYYY-MM-DD'));
                        }
                        updateValue(attr.id, format(day, 'YYYY-MM-DD'), attr.isRequired, path(['data', 'DisplayOrder'], attr));
                      }}
                      size="large"
                      initialValue={addDays(new Date(`${today()}T00:00:00`), defaultDays)}
                      maxDays={maxDays}
                      minDays={minDays}
                    />
                  </>
                )}

              </Attribute>
            ))}
          </form>
        </div>
      </>
    );
  }

  if (isBroadbandOffer && !inlineView) {
    return (
      <>
        <Heading category="brand" tone="normal">{title}</Heading>
        <div className="c-attributes-display__filler">
          {t(LocaleKeys.OFFER_ATTRIBUTES.BROADBAND)}
        </div>
      </>
    );
  }

  return (<LoadingIndicator />);
}

AttributesDisplay.displayName = 'AttributesDisplay';
AttributesDisplay.propTypes = {
  /** The number of days in the future to set the default date value */
  defaultDays: PropTypes.number,
  /** The number of days in the future to set the max date value */
  maxDays: PropTypes.number,
  /** The number of days in the future to set the min date value */
  minDays: PropTypes.number,
  /** List of attributes for the current active decision */
  decisionAttributes: PropTypes.object,
  /** Whether we want a slimmer view of the attributes (no side padding) */
  inlineView: PropTypes.bool,
  /** Bool flag if current offer is mobile */
  isMobileOffer: PropTypes.bool,
  /** Bool flag if current offer is broadband */
  isBroadbandOffer: PropTypes.bool,
  /** Function to update the attribute value */
  updateAttributeValue: PropTypes.func.isRequired,
  /** [[IgnoreDoc]] Validation errors passed in from Formik */
  errors: PropTypes.object.isRequired,
  /** [[IgnoreDoc]] Translate function provided by react-i18next */
  t: PropTypes.func.isRequired,
  /** Title to display */
  title: PropTypes.string,
  /** [[IgnoreDoc]] Is-touched passed in from Formik */
  touched: PropTypes.objectOf(PropTypes.bool).isRequired,
  /** [[IgnoreDoc]] Supplied by Formik. Allows us to override Formik's handling of touch state */
  setFieldTouched: PropTypes.func.isRequired,
  /** [[IgnoreDoc]] Supplied by Formik. Allows imperative value-setting */
  setFieldValue: PropTypes.func.isRequired,
  /** Subtitle to display (boleded) */
  subtitle: PropTypes.string,
  /** [[IgnoreDoc]] Supplied by Formik. Allows programmatic validation */
  validateForm: PropTypes.func.isRequired,
  /** [[IgnoreDoc]] Values passed in from Formik */
  values: PropTypes.object.isRequired,
  /** Function to update the activation date only if it's a broadband value */
  updateBroadbandActivationDate: PropTypes.func
};

export default withI18n()(AttributesDisplay);
