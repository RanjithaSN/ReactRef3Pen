import merge from 'deepmerge';
import PopperJS from 'popper.js';
import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import POPPER_CONSTANTS from './popper.constants';
import './popper.scss';

const DEFAULT_OPTIONS = {
  placement: 'top'
};

class Popper extends React.Component {
  state = {
    popper: null,
    isOpen: this.props.defaultToOpen,
    options: this.props.options,
    control: this.props.control,
    content: this.props.content,
    controlForwardRef: Popper.createForwardRef(this.props.control),
    contentForwardRef: Popper.createForwardRef(this.props.content)
  };

  constructor(props, context) {
    super(props, context);
    this.controlRef = React.createRef();
    this.contentRef = React.createRef();
    this.actions = {
      openPopper: this.open,
      closePopper: this.close,
      togglePopper: this.toggle
    };
  }

    static createForwardRef = (component) => {
      if (component instanceof React.Component) {
        return null;
      }
      return React.forwardRef((props, ref) => component(props, ref));
    };

    static getDerivedStateFromProps(nextProps, prevState) {
      const state = {};

      if (nextProps.options !== prevState.options) {
        state.options = nextProps.options;
      }

      if (nextProps.control !== prevState.control) {
        state.control = nextProps.control;
        state.controlForwardRef = Popper.createForwardRef(nextProps.control);
      }

      if (nextProps.content !== prevState.content) {
        state.content = nextProps.content;
        state.contentForwardRef = Popper.createForwardRef(nextProps.content);
      }

      return Object.keys(state).length ? state : null;
    }

    componentDidMount() {
      document.addEventListener('mouseup', this.onClick);

      if (this.state.isOpen) {
        this.createPopper();
      }
    }

    componentDidUpdate(prevProps, prevState, updated) {
      if (this.contentRef.current && updated) {
        this.createPopper();
      }
    }

    componentWillUnmount() {
      document.removeEventListener('mouseup', this.onClick);

      if (this.state.popper) {
        this.state.popper.destroy();
      }
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
      const isOpen = !prevState.isOpen && this.state.isOpen;
      const optsChanged = prevState.options !== prevProps.options;
      if (isOpen || optsChanged) {
        return true;
      }
      return null;
    }

    createPopper = () => {
      if (this.state.popper) {
        this.state.popper.destroy();
      }

      const options = merge(DEFAULT_OPTIONS, this.props.options);
      const popper = new PopperJS(
        this.controlRef.current,
        this.contentRef.current,
        options
      );

      this.setState({
        popper
      });
    };

    open = () => {
      this.setState({
        isOpen: true
      });
    };

    close = () => {
      this.setState({
        isOpen: false
      });
    };

    toggle = () => {
      this.setState((previousState) => {
        return {
          isOpen: !previousState.isOpen
        };
      });
    };

    onClick = (e) => {
      if (!this.props.allowClickOutside && !e[POPPER_CONSTANTS.IGNORED_EVENT]) {
        const isInsidePop =
                this.contentRef.current &&
                (this.contentRef.current.contains(e.target) && !e.target.classList.contains('popper-override'));
        if (!isInsidePop) {
          this.close();
        }
      }
    };

    renderContent() {
      const { content: ContentComponent, contentProps } = this.props;
      return (
        <div className="c-popper__content" ref={this.contentRef}>
          <ContentComponent
            {...contentProps}
            {...this.actions}
          />
        </div>
      );
    }

    renderContentWithForwardRef() {
      const { contentProps } = this.props;
      const RefContent = this.state.contentForwardRef;
      return (
        <RefContent
          {...contentProps}
          {...this.actions}
          innerRef={this.contentRef}
        />
      );
    }

    renderControl() {
      const { control: ControlComponent, controlProps } = this.props;
      return (
        <div ref={this.controlRef} className="c-popper__default-control">
          <ControlComponent
            {...controlProps}
            {...this.actions}
          />
        </div>
      );
    }

    renderControlWithForwardRef() {
      const { controlProps } = this.props;
      const RefControl = this.state.controlForwardRef;
      return (
        <RefControl
          {...controlProps}
          {...this.actions}
          innerRef={this.controlRef}
        />
      );
    }

    render() {
      return (
        <React.Fragment>
          {this.props.emitControlRef ?
            this.renderControlWithForwardRef() :
            this.renderControl()
          }
          {this.state.isOpen && ReactDOM.createPortal(
            this.props.emitContentRef ?
              this.renderContentWithForwardRef() :
              this.renderContent(),
            document.body
          )}
        </React.Fragment>
      );
    }
}

Popper.displayName = 'Popper';
Popper.propTypes = {
  /** The component whose interactions will control the visibility of the pop out content; must be a SFC if using emitted refs */
  control: PropTypes.func.isRequired,
  /** Props to pass down to the pop out control component */
  controlProps: PropTypes.shape({}),
  /** Passes a ref (as innerRef) to be used in the control Component */
  emitControlRef: PropTypes.bool,
  /** The pop out content component to be rendered, must be a SFC if using emitted refs */
  content: PropTypes.func.isRequired,
  /** Props to pass down to the pop out content component */
  contentProps: PropTypes.shape({}),
  /** Passes a ref (as innerRef) to be used in the content Component */
  emitContentRef: PropTypes.bool,
  /** Popper.js options to override default behavior. See https://popper.js.org/popper-documentation.html#Popper.Defaults */
  options: PropTypes.shape({}),
  /** Allow for the Popper to open at render */
  defaultToOpen: PropTypes.bool,
  /** Prevents clicks outside the Reference and Popper from closing the Popper */
  allowClickOutside: PropTypes.bool
};
Popper.defaultProps = {
  allowClickOutside: false,
  contentProps: {},
  controlProps: {},
  defaultToOpen: false,
  emitContentRef: false,
  emitControlRef: false,
  options: {}
};
export default Popper;
