import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import IconMinus from '../../icons/react-icons/minus';
import IconPlus from '../../icons/react-icons/plus';
import Button from '../button/button';
import FilledButton from '../button/filled.button';
import OutlineButton from '../button/outline.button';
import './expandable.section.scss';


class ExpandableSection extends React.PureComponent {
    state = {
      isOpen: this.props.isOpen && !this.props.isDisabled
    };

    componentWillReceiveProps(nextProps) {
      if (nextProps.isClose) {
        this.setState(() => ({
          isOpen: !nextProps.isClose
        }));
      }
    }


    toggleOpen = () => {
      this.setState((prevState) => ({
        isOpen: !prevState.isOpen
      }));
      if (this.props.postToggle) {
        this.props.postToggle();
      }
    };

    render() {
      const {
        alignToggle,
        body,
        putButtonsFirst,
        className,
        footer,
        footerCustomToggleText,
        headerButtonText,
        heading,
        highlightButton,
        isDisabled
      } = this.props;
      const { isOpen } = this.state;
      const alignHeaderClass = `c-expandable-section__header--align-${alignToggle}`;
      const alignToggleClass = `c-expandable-section__toggle--align-${alignToggle}`;

      const showButton = this.props.showButton ?
        React.cloneElement(this.props.showButton, {
          onClick: this.toggleOpen
        }) :
        (
          <IconPlus
            className={classNames({
              'c-expandable-section__icon-highlight': highlightButton
            })}
          />
        );

      const hideButton = this.props.hideButton ?
        React.cloneElement(this.props.hideButton, {
          onClick: this.toggleOpen
        }) :
        (
          <IconMinus
            className={classNames({
              'c-expandable-section__icon-highlight': highlightButton
            })}
          />
        );

      return (
        <div
          className={classNames('c-expandable-section', className, {
            'is-open': isOpen
          })}
        >
          <Button
            onClick={this.toggleOpen}
            className={classNames('c-expandable-section__header', alignHeaderClass)}
          >
            <div className="c-expandable-section__heading">
              {putButtonsFirst ? (
                <React.Fragment>
                  {!isDisabled && !isOpen && !headerButtonText && showButton}
                  {!isDisabled && isOpen && !footerCustomToggleText && hideButton}
                  <span
                    className="c-expandable-section__heading--after-icon"
                  >
                    {heading}
                  </span>
                </React.Fragment>
              ) : heading}
            </div>
            <div
              className={classNames('c-expandable-section__toggle', alignToggleClass)}
            >
              {!isOpen && headerButtonText && (
                <OutlineButton
                  onClick={this.toggleOpen}
                >
                  {headerButtonText}
                </OutlineButton>
              )}
              {!putButtonsFirst && !isDisabled && !isOpen && !headerButtonText && showButton}
              {!putButtonsFirst && !isDisabled && isOpen && !footerCustomToggleText && hideButton}
            </div>
          </Button>
          <div
            className={classNames('c-expandable-section__body', {
              'is-open': isOpen
            })}
          >
            {body}
          </div>
          {footer && (
            <div className="c-expandable-section__footer">
              {isOpen && footerCustomToggleText && (
                <FilledButton onClick={this.toggleOpen}>
                  {footerCustomToggleText}
                </FilledButton>
              )}
              {footer}
            </div>
          )}
        </div>
      );
    }
}

ExpandableSection.displayName = 'ExpandableSection';
ExpandableSection.propTypes = {
  alignToggle: PropTypes.oneOf(['top', 'center', 'bottom']),
  /** Main content area; collapsed by default */
  body: PropTypes.node.isRequired,
  /** Allows you to pass additional classes for layout concerns */
  className: PropTypes.string,
  /** Optional content to display below the Header and Body; typically actions */
  footer: PropTypes.node,
  /** Text to be displayed in the footer button */
  footerCustomToggleText: PropTypes.string,
  /** Custom header button text */
  headerButtonText: PropTypes.string,
  /** Content area inline with the toggle */
  heading: PropTypes.node,
  /** "hide" button to display */
  hideButton: PropTypes.node,
  /** Boolean to tell us whether to give the Show/Hide button the action color. */
  highlightButton: PropTypes.bool,
  /** Indicates whether the body can be displayed. */
  isDisabled: PropTypes.bool,
  /** Boolean to tell us whether to default it to open or not. */
  isOpen: PropTypes.bool,
  /** Boolean to tell us whether to default it to close or not. */
  isClose: PropTypes.bool,
  /** function called after toggleOpen has finished. */
  postToggle: PropTypes.func,
  /** Boolean to tell us placement on the header line of the button. */
  putButtonsFirst: PropTypes.bool,
  /** "show" button to display */
  showButton: PropTypes.node
};
ExpandableSection.defaultProps = {
  alignToggle: 'center',
  hideButton: false,
  highlightButton: false,
  isDisabled: false,
  putButtonsFirst: false
};

export default ExpandableSection;
