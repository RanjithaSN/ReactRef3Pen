import classNames from 'classnames';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import React from 'react';
import { withI18n } from 'react-i18next';
import Input from 'selfcare-ui/src/components/input/input';
import Select from 'selfcare-ui/src/components/select/select';
import { withStandardSize } from 'selfcare-ui/src/components/withStandardSize/with.standard.size';
import LocaleKeys from '../../locales/keys';
import './code.selector.scss';


class CodeSelector extends React.PureComponent {
  componentDidMount() {
    this.props.fetchCodes(this.props.code);
  }

  render() {
    const { className, error, id, name, onBlur, onChange, options, readOnly, selected, t } = this.props;
    if (readOnly) {
      const optObj = options.find((opt) => String(opt.value) === String(selected));
      return (
        <Input
          id={id}
          name={name}
          className={classNames('c-code-selector', className)}
          value={optObj ? optObj.label : selected}
          readOnly
        />
      );
    }
    return (
      options ? (
        <Select
          id={id}
          name={name}
          className={classNames('c-code-selector', className)}
          placeholder={t(LocaleKeys.SELECT)}
          options={options}
          onChange={onChange}
          onBlur={onBlur}
          selected={selected}
          error={error}
        />
      ) : null
    );
  }
}

CodeSelector.displayName = 'CodeSelector';
CodeSelector.propTypes = {
  /** Use to pass a custom class name to the component. */
  className: PropTypes.string,
  /** Code to be loaded */
  code: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  /** Error to display, will also change the form field styling */
  error: PropTypes.node,
  /** The ID of the input */
  id: PropTypes.string.isRequired,
  /** The list of codes to be selected from */
  options: PropTypes.arrayOf(PropTypes.shape({
    /** The label to be displayed for an option */
    label: PropTypes.string
  })),
  /** The function to be called when the code has not been loaded */
  fetchCodes: PropTypes.func.isRequired,
  /** Name of the field */
  name: PropTypes.string.isRequired,
  /** Function to be called when the user blurs the input */
  onBlur: PropTypes.func.isRequired,
  /** Function to be called when the user changes selection */
  onChange: PropTypes.func.isRequired,
  /** True to display the read only version of this component */
  readOnly: PropTypes.bool,
  /** The selected value to be passed through to the select element */
  selected: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Permitted, pre-defined component sizes. */
  size: PropTypes.oneOf(['full', 'large', 'medium', 'small', 'x-small', 'xx-small']),
  /** [[IgnoreDoc]] Translate function provided by react-i18next */
  t: PropTypes.func.isRequired
};

export const NakedCodeSelector = CodeSelector;
export default compose(
  withI18n(),
  withStandardSize
)(CodeSelector);
