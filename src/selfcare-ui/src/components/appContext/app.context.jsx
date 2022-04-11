import PropTypes from 'prop-types';
import React from 'react';
import { withMedia } from '../mediaContext/media.context';

export const AppContext = React.createContext();

class AppContextProvider extends React.Component {
    state = {
      context: {
        isDbss: this.props.isDbss,
        media: this.props.media
      }
    };

    componentDidUpdate(prevProps) {
      const contextChanges = ['isDbss', 'media'].reduce((acc, prop) => {
        const value = this.props[prop];
        if (value !== prevProps[prop]) {
          return {
            ...acc,
            [prop]: value
          };
        }
        return acc;
      }, null);

      if (contextChanges) {
        this.setState((prevState) => ({
          context: {
            ...prevState.context,
            ...contextChanges
          }
        }));
      }
    }

    render() {
      const { children } = this.props;
      const { context } = this.state;
      return (
        <AppContext.Provider value={context}>
          {children}
        </AppContext.Provider>
      );
    }
}

AppContextProvider.displayName = 'AppContextProvider';
AppContextProvider.propTypes = {
  children: PropTypes.node,
  isDbss: PropTypes.bool.isRequired,
  media: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default withMedia(AppContextProvider);
