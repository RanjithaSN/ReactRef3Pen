import React from 'react';
import PropTypes from 'prop-types';
import POPPER_CONSTANTS from './popper.constants';

class ClickableArea extends React.Component {
  componentWillUnmount() {
    if (this.refEl) {
      this.refEl.removeEventListener('mousedown', ignoreEvent);
    }
  }

    setRef = (el) => {
      if (el) {
        this.refEl = el;
        this.refEl.addEventListener('mousedown', ignoreEvent);
      }
    };

    render() {
      return (
        <div ref={this.setRef}>
          {this.props.children}
        </div>
      );
    }
}

ClickableArea.displayName = 'ClickableArea';
ClickableArea.propTypes = {
  children: PropTypes.node
};

export default ClickableArea;

function ignoreEvent(e) {
  e[POPPER_CONSTANTS.IGNORED_EVENT] = true;
}
