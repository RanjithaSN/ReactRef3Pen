import React from 'react';
import classNames from 'classnames';

import './with.standard.size.scss';

export const withStandardSize = (FormComponent) => (
  ({ className, size = 'large', ...rest }) => (
    <FormComponent
      className={
        classNames(
          {
            [`c-with-standard-size--${size}`]: !className || !className.includes('c-with-standard-size')
          },
          className,
        )
      }
      {...rest}
    />
  )
);
