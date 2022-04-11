import Immutable from 'seamless-immutable';
import { GetAboutPages } from './about.pages.selectors';

const initializedStore = new Immutable({});

const archivedAboutPage = {
  ID: 125,
  post_title: 'Mobile',
  guid: 'https://csg-penny-dev.aviture-sandbox.com/?post_type=about_pages&#038;p=125',
  post_type: 'about_pages',
  post_uri: '/mobile',
  post_tags: false,
  custom_fields: {
    information: '<p>string content</p>',
    key: 'mobile',
    'cross-sell_upsell_section': {
      description: 'description',
      header: 'header',
      hero_image: 'something/uploads/somethingElse?garbage',
      action_link: '/shop'
    },
    hero: {
      action_label: 'Action Label',
      action_link: '/here',
      header: 'This is the hero!',
      hero_image: 'https://s3-us-east-2.amazonaws.com/csg-penny-dev/uploads/2019/10/03200539/fake.jpg?haha'
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
    },
    product_pill: 'Product;pill',
    products_more_information: {
      table: 'Table',
      description: 'Description'
    },
    product_information: {
      item_1: {
        title: 'Item 1',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ultrices quam sed eros scelerisque elementum. Proin convallis nibh id hendrerit dapibus. Donec a enim dignissim, consequat nulla non, placerat risus. Vestibulum vel ex convallis, venenatis est ut, pretium nulla. Vestibulum mattis, lacus convallis commodo mollis, erat tortor sagittis felis, a euismod justo mi at justo. Donec a est nec felis feugiat ultrices at quis dolor. Aliquam erat volutpat. Pellentesque semper malesuada velit eget posuere. In hac habitasse platea dictumst. Pellentesque vehicula sodales felis, ut laoreet diam congue vel. Nulla non erat lacus.'
      },
      item_2: {
        title: 'Item 2',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ultrices quam sed eros scelerisque elementum. Proin convallis nibh id hendrerit dapibus. Donec a enim dignissim, consequat nulla non, placerat risus. Vestibulum vel ex convallis, venenatis est ut, pretium nulla. Vestibulum mattis, lacus convallis commodo mollis, erat tortor sagittis felis, a euismod justo mi at justo. Donec a est nec felis feugiat ultrices at quis dolor. Aliquam erat volutpat. Pellentesque semper malesuada velit eget posuere. In hac habitasse platea dictumst. Pellentesque vehicula sodales felis, ut laoreet diam congue vel. Nulla non erat lacus.'
      },
      item_3: {
        title: 'Item 3',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ultrices quam sed eros scelerisque elementum. Proin convallis nibh id hendrerit dapibus. Donec a enim dignissim, consequat nulla non, placerat risus. Vestibulum vel ex convallis, venenatis est ut, pretium nulla. Vestibulum mattis, lacus convallis commodo mollis, erat tortor sagittis felis, a euismod justo mi at justo. Donec a est nec felis feugiat ultrices at quis dolor. Aliquam erat volutpat. Pellentesque semper malesuada velit eget posuere. In hac habitasse platea dictumst. Pellentesque vehicula sodales felis, ut laoreet diam congue vel. Nulla non erat lacus.'
      }
    },
    more_information: {
      item_1: {
        icon: 'pie',
        title: 'Some feature',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ultrices quam sed eros scelerisque elementum. Proin convallis nibh id hendrerit dapibus. Donec a enim dignissim, consequat nulla non, placerat risus. Vestibulum vel ex convallis, venenatis est ut, pretium nulla. Vestibulum mattis, lacus convallis commodo mollis, erat tortor sagittis felis, a euismod justo mi at justo. Donec a est nec felis feugiat ultrices at quis dolor. Aliquam erat volutpat. Pellentesque semper malesuada velit eget posuere. In hac habitasse platea dictumst. Pellentesque vehicula sodales felis, ut laoreet diam congue vel. Nulla non erat lacus.'
      },
      item_2: {
        icon: 'heart',
        title: 'Another feature',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ultrices quam sed eros scelerisque elementum. Proin convallis nibh id hendrerit dapibus. Donec a enim dignissim, consequat nulla non, placerat risus. Vestibulum vel ex convallis, venenatis est ut, pretium nulla. Vestibulum mattis, lacus convallis commodo mollis, erat tortor sagittis felis, a euismod justo mi at justo. Donec a est nec felis feugiat ultrices at quis dolor. Aliquam erat volutpat. Pellentesque semper malesuada velit eget posuere. In hac habitasse platea dictumst. Pellentesque vehicula sodales felis, ut laoreet diam congue vel. Nulla non erat lacus.'
      },
      item_3: {
        icon: 'bag',
        title: 'Yet another feature',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ultrices quam sed eros scelerisque elementum. Proin convallis nibh id hendrerit dapibus. Donec a enim dignissim, consequat nulla non, placerat risus. Vestibulum vel ex convallis, venenatis est ut, pretium nulla. Vestibulum mattis, lacus convallis commodo mollis, erat tortor sagittis felis, a euismod justo mi at justo. Donec a est nec felis feugiat ultrices at quis dolor. Aliquam erat volutpat. Pellentesque semper malesuada velit eget posuere. In hac habitasse platea dictumst. Pellentesque vehicula sodales felis, ut laoreet diam congue vel. Nulla non erat lacus.'
      },
      item_4: {
        icon: 'customizable',
        title: 'Feature 4',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ultrices quam sed eros scelerisque elementum. Proin convallis nibh id hendrerit dapibus. Donec a enim dignissim, consequat nulla non, placerat risus. Vestibulum vel ex convallis, venenatis est ut, pretium nulla. Vestibulum mattis, lacus convallis commodo mollis, erat tortor sagittis felis, a euismod justo mi at justo. Donec a est nec felis feugiat ultrices at quis dolor. Aliquam erat volutpat. Pellentesque semper malesuada velit eget posuere. In hac habitasse platea dictumst. Pellentesque vehicula sodales felis, ut laoreet diam congue vel. Nulla non erat lacus.'
      },
      item_5: {
        icon: 'profile',
        title: 'Feature 5',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ultrices quam sed eros scelerisque elementum. Proin convallis nibh id hendrerit dapibus. Donec a enim dignissim, consequat nulla non, placerat risus. Vestibulum vel ex convallis, venenatis est ut, pretium nulla. Vestibulum mattis, lacus convallis commodo mollis, erat tortor sagittis felis, a euismod justo mi at justo. Donec a est nec felis feugiat ultrices at quis dolor. Aliquam erat volutpat. Pellentesque semper malesuada velit eget posuere. In hac habitasse platea dictumst. Pellentesque vehicula sodales felis, ut laoreet diam congue vel. Nulla non erat lacus.'
      },
      item_6: {
        icon: 'profile',
        title: 'Feature 6',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ultrices quam sed eros scelerisque elementum. Proin convallis nibh id hendrerit dapibus. Donec a enim dignissim, consequat nulla non, placerat risus. Vestibulum vel ex convallis, venenatis est ut, pretium nulla. Vestibulum mattis, lacus convallis commodo mollis, erat tortor sagittis felis, a euismod justo mi at justo. Donec a est nec felis feugiat ultrices at quis dolor. Aliquam erat volutpat. Pellentesque semper malesuada velit eget posuere. In hac habitasse platea dictumst. Pellentesque vehicula sodales felis, ut laoreet diam congue vel. Nulla non erat lacus.'
      }
    },
    offer_details: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ultrices quam sed eros scelerisque elementum. Proin convallis nibh id hendrerit dapibus. Donec a enim dignissim, consequat nulla non, placerat risus. Vestibulum vel ex convallis, venenatis est ut, pretium nulla. Vestibulum mattis, lacus convallis commodo mollis, erat tortor sagittis felis, a euismod justo mi at justo. Donec a est nec felis feugiat ultrices at quis dolor. Aliquam erat volutpat. Pellentesque semper malesuada velit eget posuere. In hac habitasse platea dictumst. Pellentesque vehicula sodales felis, ut laoreet diam congue vel. Nulla non erat lacus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ultrices quam sed eros scelerisque elementum. Proin convallis nibh id hendrerit dapibus. Donec a enim dignissim, consequat nulla non, placerat risus. Vestibulum vel ex convallis, venenatis est ut, pretium nulla. Vestibulum mattis, lacus convallis commodo mollis, erat tortor sagittis felis, a euismod justo mi at justo. Donec a est nec felis feugiat ultrices at quis dolor. Aliquam erat volutpat. Pellentesque semper malesuada velit eget posuere. In hac habitasse platea dictumst. Pellentesque vehicula sodales felis, ut laoreet diam congue vel. Nulla non erat lacus.</p>'
  }
};

const mappedAboutPage = {
  id: 125,
  name: 'Mobile',
  key: 'mobile',
  crossSellUpsellSection: {
    description: 'description',
    header: 'header',
    heroImage: '/media/uploads/somethingElse',
    actionLink: '/shop'
  },
  hero: {
    actionLabel: 'Action Label',
    actionLink: '/here',
    header: 'This is the hero!',
    heroImage: '/media/uploads/2019/10/03200539/fake.jpg'
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
  ],
  productInformation: [
    {
      title: 'Item 1',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ultrices quam sed eros scelerisque elementum. Proin convallis nibh id hendrerit dapibus. Donec a enim dignissim, consequat nulla non, placerat risus. Vestibulum vel ex convallis, venenatis est ut, pretium nulla. Vestibulum mattis, lacus convallis commodo mollis, erat tortor sagittis felis, a euismod justo mi at justo. Donec a est nec felis feugiat ultrices at quis dolor. Aliquam erat volutpat. Pellentesque semper malesuada velit eget posuere. In hac habitasse platea dictumst. Pellentesque vehicula sodales felis, ut laoreet diam congue vel. Nulla non erat lacus.'
    },
    {
      title: 'Item 2',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ultrices quam sed eros scelerisque elementum. Proin convallis nibh id hendrerit dapibus. Donec a enim dignissim, consequat nulla non, placerat risus. Vestibulum vel ex convallis, venenatis est ut, pretium nulla. Vestibulum mattis, lacus convallis commodo mollis, erat tortor sagittis felis, a euismod justo mi at justo. Donec a est nec felis feugiat ultrices at quis dolor. Aliquam erat volutpat. Pellentesque semper malesuada velit eget posuere. In hac habitasse platea dictumst. Pellentesque vehicula sodales felis, ut laoreet diam congue vel. Nulla non erat lacus.'
    },
    {
      title: 'Item 3',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ultrices quam sed eros scelerisque elementum. Proin convallis nibh id hendrerit dapibus. Donec a enim dignissim, consequat nulla non, placerat risus. Vestibulum vel ex convallis, venenatis est ut, pretium nulla. Vestibulum mattis, lacus convallis commodo mollis, erat tortor sagittis felis, a euismod justo mi at justo. Donec a est nec felis feugiat ultrices at quis dolor. Aliquam erat volutpat. Pellentesque semper malesuada velit eget posuere. In hac habitasse platea dictumst. Pellentesque vehicula sodales felis, ut laoreet diam congue vel. Nulla non erat lacus.'
    }
  ],
  productsMoreInformation: {
    table: 'Table',
    description: 'Description'
  },
  information: '<p>string content</p>',
  offerDetails: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ultrices quam sed eros scelerisque elementum. Proin convallis nibh id hendrerit dapibus. Donec a enim dignissim, consequat nulla non, placerat risus. Vestibulum vel ex convallis, venenatis est ut, pretium nulla. Vestibulum mattis, lacus convallis commodo mollis, erat tortor sagittis felis, a euismod justo mi at justo. Donec a est nec felis feugiat ultrices at quis dolor. Aliquam erat volutpat. Pellentesque semper malesuada velit eget posuere. In hac habitasse platea dictumst. Pellentesque vehicula sodales felis, ut laoreet diam congue vel. Nulla non erat lacus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ultrices quam sed eros scelerisque elementum. Proin convallis nibh id hendrerit dapibus. Donec a enim dignissim, consequat nulla non, placerat risus. Vestibulum vel ex convallis, venenatis est ut, pretium nulla. Vestibulum mattis, lacus convallis commodo mollis, erat tortor sagittis felis, a euismod justo mi at justo. Donec a est nec felis feugiat ultrices at quis dolor. Aliquam erat volutpat. Pellentesque semper malesuada velit eget posuere. In hac habitasse platea dictumst. Pellentesque vehicula sodales felis, ut laoreet diam congue vel. Nulla non erat lacus.</p>'
};

xdescribe('AboutPages Selector', () => {
  describe('When using the GetAboutPages selector...', () => {
    test('It correctly maps the archived aboutPages', () => {
      const state = initializedStore.setIn(['client', 'aboutPages', 'data'], [archivedAboutPage]);
      expect(GetAboutPages(state)).toEqual([mappedAboutPage]);
    });
  });
});
