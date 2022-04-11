import { mount } from 'enzyme';
import React from 'react';
import { withMedia } from './media.context';
import { MEDIA_CONTEXT_SIZES as SIZES } from './media.context.constants';

const TestDiv = () => <div />;
const WrappedTestDiv = withMedia(TestDiv);

describe('MediaContext', () => {
  test('It should have a non-empty initial state', () => {
    window.matchMedia = () => ({
      matches: true
    });
    expect(mount(<WrappedTestDiv />).find(TestDiv).prop('media')).toEqual([
      SIZES.SMALL,
      SIZES.NOTSMALL,
      SIZES.MEDIUM,
      SIZES.LARGE,
      SIZES.MAX
    ]);
  });
});
