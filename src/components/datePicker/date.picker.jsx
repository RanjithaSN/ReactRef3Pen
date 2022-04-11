/* eslint-disable import/no-duplicates */
import { inRange, isSwedishHoliday, today, getNextAvailableDay } from '@selfcare/core/helpers/date.helper';
import classNames from 'classnames';
import addDays from 'date-fns/add_days';
import format from 'date-fns/format';
import isWeekend from 'date-fns/is_weekend';
import parse from 'date-fns/parse';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import React from 'react';
import LocaleUtils from 'react-day-picker/src/LocaleUtils';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { withI18n } from 'react-i18next';

import Input from 'selfcare-ui/src/components/input/input';
import InputField from 'selfcare-ui/src/components/inputField/input.field';
import LocaleKeys from '../../locales/keys';
import './date.picker.scss';

const DatePicker = ({ allowNonBusinessDays, className, initialValue, id, maxDays, minDays, labelText, onDayChange, size, t, isPortInUpdateDate }) => {
  const type = 'text';

  const isDayDisabled = (day) => {
    const startDate = allowNonBusinessDays ?
      addDays(new Date(today()), minDays) :
      getNextAvailableDay(minDays);
    const endDate = addDays(new Date(today()), maxDays + minDays);
    const isInRange = inRange(day, startDate, endDate);

    if (allowNonBusinessDays) {
      return !isInRange;
    }

    return !isInRange || isSwedishHoliday(day) || isWeekend(day);
  };

  const onChange = (day) => {
    const date = `${format(day, 'YYYY-MM-DD')}T00:00:00`;
    onDayChange(new Date(date));
  };

  const renderInput = (props) => (
    <Input
      type={type}
      id={id}
      placeholder={labelText}
      className={classNames(
        `c-input c-input--${type} c-with-standard-size--full c-input__calendar`,
        className
      )}
      {...props}
    />
  );

  const getFirstDayOfWeek = () => {
    return t(LocaleKeys.DATE_PICKER.FIRST_DAY_OF_WEEK);
  };

  return (
    <InputField
      key={`${maxDays}_${minDays}`}
      required
      size={size}
      input={(
        <DayPickerInput
          onDayChange={onChange}
          value={format(initialValue, t(LocaleKeys.DATE.DATE_FORMAT))}
          formatDate={(date) => format(`${format(date, 'YYYY-MM-DD')}T00:00:00`, t(LocaleKeys.DATE.DATE_FORMAT))}
          parseDate={(dateStr) => parse(dateStr, t(LocaleKeys.DATE.DATE_FORMAT))}
          id={id}
          placeholder={labelText}
          component={renderInput}
          inputProps={{
            ref: null,
            onKeyDown: (e) => e.preventDefault(),
            readOnly: true
          }}
          dayPickerProps={{
            localeUtils: {
              ...LocaleUtils,
              getFirstDayOfWeek
            },
            showOutsideDays: false,
            fromMonth: new Date(),
            modifiers: {
              disabled: [
                isDayDisabled,
                isPortInUpdateDate ? new Date(isPortInUpdateDate) : null
              ]
            },
            months: [
              t(LocaleKeys.DATE.MONTHS[1]),
              t(LocaleKeys.DATE.MONTHS[2]),
              t(LocaleKeys.DATE.MONTHS[3]),
              t(LocaleKeys.DATE.MONTHS[4]),
              t(LocaleKeys.DATE.MONTHS[5]),
              t(LocaleKeys.DATE.MONTHS[6]),
              t(LocaleKeys.DATE.MONTHS[7]),
              t(LocaleKeys.DATE.MONTHS[8]),
              t(LocaleKeys.DATE.MONTHS[9]),
              t(LocaleKeys.DATE.MONTHS[10]),
              t(LocaleKeys.DATE.MONTHS[11]),
              t(LocaleKeys.DATE.MONTHS[12])
            ],
            weekdaysShort: [
              t(LocaleKeys.DATE.DAYS_OF_THE_WEEK[1]),
              t(LocaleKeys.DATE.DAYS_OF_THE_WEEK[2]),
              t(LocaleKeys.DATE.DAYS_OF_THE_WEEK[3]),
              t(LocaleKeys.DATE.DAYS_OF_THE_WEEK[4]),
              t(LocaleKeys.DATE.DAYS_OF_THE_WEEK[5]),
              t(LocaleKeys.DATE.DAYS_OF_THE_WEEK[6]),
              t(LocaleKeys.DATE.DAYS_OF_THE_WEEK[7])
            ]
          }}
        />
      )}
    />

  );
};

DatePicker.displayName = 'DatePicker';
DatePicker.propTypes = {
  /** Whether or not to show non-business days (weekends and holidays) as pickable in the datepicker. */
  allowNonBusinessDays: PropTypes.bool,
  /** Additional classnames for the element. */
  className: PropTypes.string,
  /** The ID of the element */
  id: PropTypes.string.isRequired,
  /** The initial value of the element */
  initialValue: PropTypes.instanceOf(Date).isRequired,
  /** Whether or not there has been a Port In date update request */
  isPortInUpdateDate: PropTypes.instanceOf(Date),
  /** The number of days in the future to set the max date value */
  maxDays: PropTypes.number,
  /** The number of days in the future to set the min date value */
  minDays: PropTypes.number,
  /** Label of the Date Picker */
  labelText: PropTypes.string,
  /** Method to call when the date changes */
  onDayChange: PropTypes.func.isRequired,
  /** Permitted, pre-defined component sizes. */
  size: PropTypes.oneOf(['full', 'large', 'medium', 'small', 'x-small', 'xx-small']),
  /** [[IgnoreDoc]] Translate function provided by react-i18next */
  t: PropTypes.func.isRequired
};
DatePicker.defaultProps = {
  allowNonBusinessDays: false
};

export default compose(
  withI18n()
)(DatePicker);
