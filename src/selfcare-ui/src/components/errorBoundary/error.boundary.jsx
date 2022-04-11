import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router';
import './error.boundary.scss';
import ErrorZeroState from './error.zero.state';
import { isClientSide } from '../../../../helpers/ssr.helpers.ts';
const ErrorBoundaryComponent = ({ children, faultContent, disable, hasError }) => {
  if (hasError && !disable) {
    const content = faultContent || (
      <ErrorZeroState />
    );

    return (
      <div className="c-error-boundary">
        {content}
      </div>
    );
  }

  return children;
};

ErrorBoundaryComponent.displayName = 'ErrorBoundary';
ErrorBoundaryComponent.propTypes = {
  /** Content to display if there is no error */
  children: PropTypes.node,
  /** Content to display if there is an error */
  faultContent: PropTypes.node,
  /** [[IgnoreDoc]] Determines whether to display error state or not */
  hasError: PropTypes.bool,
  disable: PropTypes.bool
};

export const ErrorBoundary = ErrorBoundaryComponent;

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

function errorBoundaryWithRouter(useRouter = false) {
  return (WrappedComponent) => {
    class ErrorBoundaryRouter extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          hasError: false
        };

        if (!useRouter) {
          return;
        }

        const { history } = this.props;
        this.removeListenerEvent = history.listen(() => {
          if (this.state.hasError) {
            this.setState({
              hasError: false
            });
          }
        });
      }

      static getDerivedStateFromError() {
        return {
          hasError: true
        };
      }

      componentDidCatch(error, info) {
        this.setState({
          hasError: true
        });
        if (isClientSide() && !!window.rg4js) {
          rg4js('send', error);
          rg4js('customTags', info);
        }
      }

      componentWillUnmount() {
        if (this.removeListenerEvent) {
          this.removeListenerEvent();
        }
      }

      render() {
        return (
          <WrappedComponent
            {...this.props}
            hasError={this.state.hasError}
          />
        );
      }
    }

    ErrorBoundaryRouter.displayName = `ErrorBoundaryRouter(${getDisplayName(WrappedComponent)})`;
    ErrorBoundaryRouter.propTypes = {
      /** Content to display if there is no error */
      children: PropTypes.node,
      /** Content to display if there is an error */
      faultContent: PropTypes.node,
      /** [[IgnoreDoc]] History instance provided by react-router */
      history: PropTypes.object
    };

    if (useRouter) {
      return withRouter(ErrorBoundaryRouter);
    }

    return ErrorBoundaryRouter;
  };
}

export const ErrorBoundaryWithRouter = errorBoundaryWithRouter(true)(ErrorBoundary);
export const ErrorBoundaryWithState = errorBoundaryWithRouter(false)(ErrorBoundary);
