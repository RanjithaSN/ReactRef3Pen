import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import Heading from 'selfcare-ui/src/components/heading/heading';
import './unordered.list.scss';


const UnorderedList = ({ className, direction, list, variant }) => (
  <ul
    className={classNames(
      `c-unordered-list
            c-unordered-list--${direction}
            c-unordered-list--${variant}`, className
    )}
  >
    {
      list.map((item) => (
        item.description && <li className="c-unordered-list__item" key={item.key}>
          <Heading category="major" tone="quiet" className="c-unordered-list__item--description">{item.description}</Heading>
        </li>
      ))
    }
  </ul>
);

UnorderedList.displayName = 'UnorderedList';
UnorderedList.propTypes = {
  className: PropTypes.string,
  /** Selects horizontal or vertical direction of list */
  direction: PropTypes.oneOf(['horizontal', 'vertical']),
  /** The value of the id property will be set as the HTML ID attribute on the radio button. */
  list: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    description: PropTypes.string
  })),
  variant: PropTypes.oneOf(['standard', 'condensed'])
};

UnorderedList.defaultProps = {
  direction: 'vertical',
  list: [],
  variant: 'standard'
};

export default UnorderedList;
