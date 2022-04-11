import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { withI18n } from 'react-i18next';
import LocaleKeys from '../../locales/keys';
import { AppContext } from '../appContext/app.context';
import { MEDIA_CONTEXT_SIZES } from '../mediaContext/media.context.constants';
import './definition.list.scss';


const DefinitionList = ({ className, flush, list, stacked, t }) => (
  <AppContext.Consumer>
    {({ media }) => (
      <div
        className={classNames('c-definition-list', {
          'c-definition-list--flush': flush
        }, className)}
      >
        {list.length > 0 && (
          <dl className="c-definition-list__definitions">
            {list.map((definition) => (
              <React.Fragment key={definition.key ? definition.key : definition.label}>
                <div
                  className={classNames('c-definition-list__definition', {
                    'c-definition-list__definition--stacked': !media.includes(MEDIA_CONTEXT_SIZES.LARGE) || stacked
                  }, className)}
                >
                  <dt className="c-definition-list__label">{definition.label}</dt>
                  <dd className="c-definition-list__value">{definition.value || t(LocaleKeys.NA)}</dd>
                </div>
              </React.Fragment>
            ))}
          </dl>
        )}
      </div>
    )}
  </AppContext.Consumer>
);

DefinitionList.displayName = 'DefinitionList';
DefinitionList.propTypes = {
  /** Use to pass a custom class name to the component. */
  className: PropTypes.string,
  /** Flag to render definition list to the edge of parent container. */
  flush: PropTypes.bool,
  /** The list of key/value pairs to display in the definition list. */
  list: PropTypes.arrayOf(PropTypes.shape({
    /** The key to be used for tracking a definition */
    key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /** The item to be displayed for a definition */
    value: PropTypes.node,
    /** The label to be displayed for a definition */
    label: PropTypes.string
  })),
  /** Flag to force stacking of information - will always stack in mobile normally. */
  stacked: PropTypes.bool,
  /** [[IgnoreDoc]] Translate function provided by react-i18next */
  t: PropTypes.func.isRequired
};
DefinitionList.defaultProps = {
  flush: false,
  list: [],
  stacked: false
};

export const NakedDefinitionList = DefinitionList;
export default withI18n()(DefinitionList);
