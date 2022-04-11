import React from 'react';
import '../polyfills';
import 'raf/polyfill';
import './matchMedia.polyfill';
import 'jest-localstorage-mock';
import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import i18next from 'i18next';

configure({
    adapter: new Adapter()
});

jest.mock('../../src/i18n', () => { }); // Make sure we don't set up an i18n that's unnecessary
jest.mock('selfcare-ui/src/locales/i18n', () => { }); // Make sure we don't set up an i18n that's unnecessary
jest.mock('react-i18next', () => ({
    setI18n: () => { },
    // this mock makes sure any components using the withI18n HoC receive the t function as a prop
    withI18n: () => (Component) => (props) => <Component t={(key) => key} {...props} /> // eslint-disable-line
}));

jest.mock('i18next');
i18next.mockReturn = 'translated';
i18next.t.mockReturnValue(i18next.mockReturn);
