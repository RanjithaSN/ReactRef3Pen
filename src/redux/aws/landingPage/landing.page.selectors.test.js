import Immutable from 'seamless-immutable';
import * as LandingPage from './landing.page.selectors';

const initializedStore = new Immutable({});

const LANDINGPAGE = {
  ID: 1,
  post_title: 'Landing Page',
  guid: 'https://csg-penny-dev.aviture-sandbox.com/?post_type=faqs&#038;p=20',
  post_type: 'landing_page',
  post_uri: '/20',
  post_categories: [],
  custom_fields: {
    'cross-sell_upsell_section': {
      description: 'description',
      header: 'header',
      hero_image: 'something/uploads/somethingElse?garbage',
      action_link: '/shop'
    },
    shop: {
      unique_selling_points: {
        item_1: {
          title: 'Stream Everything',
          description: 'Duis sit amet tempor nisl, quis pulvinar sapien. Vestibulum commodo dictum commodo. Morbi facilisis ligula ut nulla aliquam, non luctus nunc hendrerit. Proin eu est tellus. Maecenas malesuada ut neque ultrices mattis.'
        },
        item_2: {
          title: 'Complay for Free',
          description: 'Duis sit amet tempor nisl, quis pulvinar sapien. Vestibulum commodo dictum commodo. Morbi facilisis ligula ut nulla aliquam, non luctus nunc hendrerit. Proin eu est tellus. Maecenas malesuada ut neque ultrices mattis.'
        },
        item_3: {
          title: 'Double Your Data',
          description: 'Duis sit amet tempor nisl, quis pulvinar sapien. Vestibulum commodo dictum commodo. Morbi facilisis ligula ut nulla aliquam, non luctus nunc hendrerit. Proin eu est tellus. Maecenas malesuada ut neque ultrices mattis.'
        }
      }
    },
    hero: {
      actionLabel: '',
      actionLink: '',
      description: '',
      header: 'header',
      hero_image: 'something/uploads/somethingElse?garbage'
    },
    marketing_callout_1: {
      title: 'Stuff 1',
      content: 'things 1',
      image_url: '/media/uploads/callout1?garbage',
      action_label: 'Go To Place 1',
      action_link: '/place1'
    },
    marketing_callout_2: {
      title: 'Stuff 2',
      content: 'things 2',
      image_url: '/media/uploads/callout2?garbage',
      action_label: 'Go To Place 2',
      action_link: '/place2'
    },
    marketing_callout_3: {
      title: 'Stuff 3',
      content: 'things 3',
      image_url: '/media/uploads/callout3?garbage',
      action_label: 'Go To Place 3',
      action_link: '/place3'
    }
  }
};

const mappedCustomFields = {
  crossSellUpsellSection: {
    description: 'description',
    header: 'header',
    heroImage: '/media/uploads/somethingElse',
    actionLink: '/shop'
  },
  shop: {
    uniqueSellingPoints: [
      {
        title: 'Stream Everything',
        description: 'Duis sit amet tempor nisl, quis pulvinar sapien. Vestibulum commodo dictum commodo. Morbi facilisis ligula ut nulla aliquam, non luctus nunc hendrerit. Proin eu est tellus. Maecenas malesuada ut neque ultrices mattis.'
      },
      {
        title: 'Complay for Free',
        description: 'Duis sit amet tempor nisl, quis pulvinar sapien. Vestibulum commodo dictum commodo. Morbi facilisis ligula ut nulla aliquam, non luctus nunc hendrerit. Proin eu est tellus. Maecenas malesuada ut neque ultrices mattis.'
      },
      {
        title: 'Double Your Data',
        description: 'Duis sit amet tempor nisl, quis pulvinar sapien. Vestibulum commodo dictum commodo. Morbi facilisis ligula ut nulla aliquam, non luctus nunc hendrerit. Proin eu est tellus. Maecenas malesuada ut neque ultrices mattis.'
      }
    ]
  },
  hero: {
    actionLabel: '',
    actionLink: '',
    description: '',
    header: 'header',
    heroImage: '/media/uploads/somethingElse'
  },
  marketingCallouts: [
    {
      title: 'Stuff 1',
      content: 'things 1',
      imageUrl: '/media/uploads/callout1',
      actionLabel: 'Go To Place 1',
      actionLink: '/place1'
    },
    {
      title: 'Stuff 2',
      content: 'things 2',
      imageUrl: '/media/uploads/callout2',
      actionLabel: 'Go To Place 2',
      actionLink: '/place2'
    },
    {
      title: 'Stuff 3',
      content: 'things 3',
      imageUrl: '/media/uploads/callout3',
      actionLabel: 'Go To Place 3',
      actionLink: '/place3'
    }
  ]
};

const emptyCustomFields = {
  hero: {
    actionLabel: '',
    actionLink: '',
    description: '',
    header: '',
    heroImage: ''
  },
  shop: {
    uniqueSellingPoints: []
  },
  crossSellUpsellSection: {
    header: '',
    description: '',
    heroImage: '',
    actionLink: ''
  },
  marketingCallouts: []
};

describe('LandingPage ', () => {
  xdescribe('When the LandingPageContent selector is used...', () => {
    test('It should return the mapped custom fields object.', () => {
      const CUSTOM_STATE = initializedStore.setIn(['client', 'landingPage', 'landingPage'], LANDINGPAGE);
      expect(LandingPage.LandingPageContent(CUSTOM_STATE)).toEqual(mappedCustomFields);
    });
    test('It should return null when no landingPage object exists.', () => {
      const CUSTOM_STATE = initializedStore.setIn(['client', 'landingPage', 'landingPage'], null);
      expect(LandingPage.LandingPageContent(CUSTOM_STATE)).toEqual(emptyCustomFields);
    });
  });
});
