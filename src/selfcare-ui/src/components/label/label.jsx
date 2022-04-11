import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { withI18n } from 'react-i18next';
import IconInfoFilled from '../../icons/react-icons/info-filled';
import LocaleKeys from '../../locales/keys';
import Tooltip from '../tooltip/tooltip';

import './label.scss';

const Label = ({ children, className, htmlFor }) => (
  <label className={classNames('c-label', className)} htmlFor={htmlFor}>
    {children}
  </label>
);

Label.displayName = 'Label';
Label.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  htmlFor: PropTypes.string.isRequired
};

export default Label;

const NakedLabelAffix = ({ arrowEnabled, className, children, required, help, t }) => {
  const optional = !required && (
    <span className="c-labelAffix-optional">
      {t(LocaleKeys.OPTIONAL)}
    </span>
  );

  const helpAffix = help && (
    <Tooltip
      content={help}
      options={{
        modifiers: {
          arrow: {
            enabled: arrowEnabled
          }
        }
      }}
    >
      <span className="c-labelAffix-help">
        <IconInfoFilled className="c-labelAffix-help__icon" />
      </span>
    </Tooltip>
  );

  return (
    <div className={classNames('c-labelAffix', className)}>
      {children}
      {optional}
      <div className="c-labelAffix-right">
        {helpAffix}
      </div>
    </div>
  );
};

NakedLabelAffix.displayName = 'LabelAffix';
NakedLabelAffix.propTypes = {
  /** Whether or not the tooltip arrow is enabled */
  arrowEnabled: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node,
  /** The tooltip content to be displayed in the info icon */
  help: PropTypes.node,
  /** Indicates whether the affixed input control is required; appends an (optional) tag to the label */
  required: PropTypes.bool,
  /** [[IgnoreDoc]] Translate function provided by react-i18next */
  t: PropTypes.func.isRequired
};
NakedLabelAffix.defaultProps = {
  arrowEnabled: false
};

export const LabelAffix = withI18n()(NakedLabelAffix);
