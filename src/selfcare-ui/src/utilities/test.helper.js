import {mount as enzymeMount} from 'enzyme'; // eslint-disable-line
import React from 'react';
import AppContextProvider from '../components/appContext/app.context';

export const mount = (node, options) => enzymeMount(
  React.createElement(
    AppContextProvider,
    {
      isDbss: true
    },
    node
  ),
  options
).childAt(0);
