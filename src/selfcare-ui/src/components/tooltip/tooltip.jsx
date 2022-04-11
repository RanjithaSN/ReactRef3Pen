import classNames from 'classnames';
import merge from 'deepmerge';
import PropTypes from 'prop-types';
import React from 'react';
import Button from '../button/button';
import Popper from '../popper/popper';
import './tooltip.scss';


const DEFAULT_OPTIONS = {
  modifiers: {
    arrow: {
      element: '.c-tooltip-arrow',
      enabled: true
    },
    offset: {
      offset: '0, 8'
    }
  }
};

class Control extends React.Component {
  onClick(e) {
    const { togglePopper, clearState } = this.props;
    if (clearState) {
      clearState(e);
    }
    togglePopper(e);
  }

  render() {
    const { children, togglePopper } = this.props;
    return typeof children === 'string' ? (
      <Button className="c-tooltipAttachment" onClick={togglePopper}>
        {children}
      </Button>
    ) : (
      React.cloneElement(children, {
        onClick: this.onClick.bind(this),
        className: classNames(children.props.className, 'c-tooltipAttachment')
      })
    );
  }
}

Control.propTypes = {
  /** Tooltip attachment point. Needs to be a string or a single element */
  children: PropTypes.node.isRequired,
  /** Control for clearing internal state on close / open of popper if needed */
  clearState: PropTypes.func,
  /** Control for opening and closing the Popper */
  togglePopper: PropTypes.func.isRequired
};

const PopContent = ({ className, closePopper, content, isArrowEnabled, openPopper, togglePopper, variant }) => (
  <div className={classNames('c-tooltip', className, [`c-tooltip--${variant}`])}>
    {(typeof content === 'object' && typeof content.type !== 'string') ? ( // if `content` is not a string or a DOM element
      React.cloneElement(content, {
        closePopper,
        openPopper,
        togglePopper
      })
    ) : (
      <React.Fragment>{content}</React.Fragment>
    )}
    {isArrowEnabled && <div className="c-tooltip-arrow" />}
  </div>
);

PopContent.propTypes = {
  className: PropTypes.string,
  /** Control for closing the Popper */
  closePopper: PropTypes.func.isRequired,
  /** Content to populate the tooltip */
  content: PropTypes.node.isRequired,
  /** true is the arrow should be displayed */
  isArrowEnabled: PropTypes.bool.isRequired,
  /** Control for opening the Popper */
  openPopper: PropTypes.func.isRequired,
  /** Control for opening and closing the Popper */
  togglePopper: PropTypes.func.isRequired,
  /** Theme variant: affects the background color */
  variant: PropTypes.oneOf(['light', 'dark'])
};

const Tooltip = ({ children, clearState, content, className, options, variant }) => {
  const opts = merge(DEFAULT_OPTIONS, options);
  return (
    <Popper
      options={opts}
      control={Control}
      controlProps={{
        children,
        clearState
      }}
      content={PopContent}
      contentProps={{
        className,
        content,
        isArrowEnabled: opts.modifiers.arrow.enabled,
        variant
      }}
    />
  );
};

Tooltip.displayName = 'Tooltip';
Tooltip.propTypes = {
  /** Tooltip attachment point. Needs to be a string or a single element */
  children: PropTypes.node.isRequired,
  /** Control for clearing internal state on close / open of popper if needed */
  clearState: PropTypes.func,
  /** Content to populate the tooltip */
  content: PropTypes.node.isRequired,
  /** className to pass to the tooltip */
  className: PropTypes.string,
  /** Popper.js options to override default behavior. See https://popper.js.org/popper-documentation.html#Popper.Defaults */
  options: PropTypes.object,
  /** Theme variant: affects the background color */
  variant: PropTypes.oneOf(['light', 'dark'])
};
Tooltip.defaultProps = {
  options: {},
  variant: 'dark'
};

export default Tooltip;
