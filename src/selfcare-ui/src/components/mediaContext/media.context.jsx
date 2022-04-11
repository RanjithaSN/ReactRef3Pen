import React from 'react';
import debounce from '../../utilities/debounce';
import { MEDIA_CONTEXT_MAP } from './media.context.constants';

export const withMedia = (Component) => {
  return class extends React.Component {
        static displayName = `withMedia(${Component.displayName || Component.name || 'Component'})`;

        state = {
          media: []
        };

        constructor() {
          super();
          this.updateQueriesDebounced = debounce(this.updateQueries, 100);
        }

        componentDidMount() {
          window.addEventListener('resize', this.updateQueriesDebounced);
          this.updateQueries();
        }

        componentWillUnmount() {
          this.isUnmounting = true;
          window.removeEventListener('resize', this.updateQueriesDebounced);
        }

        updateQueries = () => {
          if (this.isUnmounting) {
            return;
          }
          const media = Object.keys(MEDIA_CONTEXT_MAP).reduce((acc, key) => {
            const { matches } = window.matchMedia(MEDIA_CONTEXT_MAP[key]);
            return matches ? acc.concat(key) : acc;
          }, []);
          this.setState({
            media
          });
        };

        render() {
          const { media } = this.state;
          return <Component media={media} {...this.props} />;
        }
  };
};
