import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import OpaquePane from '../opaquePane/opaque.pane';

import './overlay.scss';


class Overlay extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.el = document.createElement('div');
    this.el.className = classNames('c-overlay', props.className);
  }

  componentDidMount() {
    document.getElementById('overlay-root').appendChild(this.el);
  }

  componentWillUnmount() {
    const element = document.getElementById('overlay-root');
    if (element) {
      element.removeChild(this.el);
    }
  }

  render() {
    return ReactDOM.createPortal(
      <React.Fragment>
        <OpaquePane />
        <div className="c-overlay-content">
          {this.props.children}
        </div>
      </React.Fragment>,
      this.el,
    );
  }
}

Overlay.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

export default Overlay;
