import { getCustomHeaderToDisplay } from './navigation';

describe('When the getCustomHeaderToDisplay function is used...', () => {
  const CURRENT_NAV_ITEM = {
    url: './test'
  };

  test('It should return the component of a header for the matching header.', () => {
    const CUSTOM_HEADER_LIST = [{
      url: './test',
      component: 'this is a component'
    }];
    const header = getCustomHeaderToDisplay(CURRENT_NAV_ITEM, CUSTOM_HEADER_LIST);
    expect(header).toEqual(CUSTOM_HEADER_LIST[0].component);
  });

  test('It should return null if it cannot find the component for the matching header', () => {
    const CUSTOM_HEADER_LIST = [{
      url: './failed-test',
      component: 'this is a component'
    }];

    const header = getCustomHeaderToDisplay(CURRENT_NAV_ITEM, CUSTOM_HEADER_LIST);
    expect(header).toBe(null);
  });

  test('It should return null if the custom header list is not provided.', () => {
    const CUSTOM_HEADER_LIST = undefined;

    const header = getCustomHeaderToDisplay(CURRENT_NAV_ITEM, CUSTOM_HEADER_LIST);
    expect(header).toBe(null);
  });
});
