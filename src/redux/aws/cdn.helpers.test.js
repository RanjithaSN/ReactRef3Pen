import { getCdnLinkFromFullURL, mapUSPObjectPropsToArray, sanitizeArticleContent, shouldSubscriberSeeContent, WP_TAGS } from './cdn.helpers';

const unmappedObject = {
  a: 'someValue',
  b: 'otherValue',
  c: 'lastValue'
};

const mappedArray = ['someValue', 'otherValue', 'lastValue'];

describe('AWS S3 helpers ', () => {
  describe('When mapUSPObjectPropsToArray is used...', () => {
    test('It converts populated object properties to array', () => {
      expect(mapUSPObjectPropsToArray(unmappedObject)).toEqual(mappedArray);
    });
    test('It returns [] if object is null', () => {
      expect(mapUSPObjectPropsToArray(null)).toEqual([]);
    });
  });

  xdescribe('When getCdnLinkFromFullURL is used...', () => {
    test('It takes a valid url from the cdn and strips away the bad no-no parts leaving just the link', () => {
      expect(getCdnLinkFromFullURL('www.baseurl.com/uploads/imageLink001.jpg?ABunchOfNaughtyURLParameters')).toEqual('/media/uploads/imageLink001.jpg');
    });
    test('It returns empty string when an invalid string that does not match the regex is passed', () => {
      expect(getCdnLinkFromFullURL('www.google.com')).toEqual('');
    });
    test('It returns empty string when a non-string is passed in', () => {
      expect(getCdnLinkFromFullURL(false)).toEqual('');
      expect(getCdnLinkFromFullURL({
        object: 'haha'
      })).toEqual('');
    });
  });

  describe('When shouldSubscriberSeeContent is used...', () => {
    const emptySubscriber = {
      isLoggedIn: false,
      hasMobileOffers: false,
      hasBroadbandOffers: false
    };
    const subscriberAllAccess = {
      isLoggedIn: true,
      hasMobileOffers: true,
      hasBroadbandOffers: true
    };

    const internalTag = [{
      name: WP_TAGS.INTERNAL
    }];
    const privateTag = [{
      name: WP_TAGS.PRIVATE
    }];

    const privateMobile = [{
      name: WP_TAGS.PRIVATE_MOBILE
    }];

    const privateCoax = [{
      name: WP_TAGS.PRIVATE_COAX
    }];

    const privateOlan = [{
      name: WP_TAGS.PRIVATE_OLAN
    }];

    const searchOnly = [{
      name: WP_TAGS.SEARCH_ONLY
    }];
    test('It should return false if the tag is search only and the request is not from get help search', () => {
      expect(shouldSubscriberSeeContent(subscriberAllAccess, searchOnly)).toEqual(false);
    });

    test('It should return false if the tag is internal', () => {
      expect(shouldSubscriberSeeContent(subscriberAllAccess, internalTag)).toEqual(false);
    });
    test('It should return true if there are no tags and no subscriber', () => {
      expect(shouldSubscriberSeeContent(emptySubscriber, [])).toEqual(true);
    });
    test('It should return true if there is a subscriber with all access and the tag is not internal', () => {
      expect(shouldSubscriberSeeContent(subscriberAllAccess, privateTag)).toEqual(true);
      expect(shouldSubscriberSeeContent(subscriberAllAccess, privateMobile)).toEqual(true);
      expect(shouldSubscriberSeeContent(subscriberAllAccess, privateCoax)).toEqual(true);
      expect(shouldSubscriberSeeContent(subscriberAllAccess, privateOlan)).toEqual(true);
    });
    test('It should return false if there is no subscriber and the tag is private', () => {
      expect(shouldSubscriberSeeContent(emptySubscriber, privateTag)).toEqual(false);
    });
  });

  describe('When sanitizeArticleContent is used...', () => {
    test('It should replace wpEngine links with cdn links and leave non-cdn links alone', () => {
      // Arrange
      const cdnPrefix = 'null'; // It will keep being null until we mock dotenv variables for jest.
      const url1 = 'https://tele2-wpexport-nonprod-dev-eu-central-1-kyapgxnfotxrgjhs.s3.eu-central-1.amazonaws.com/uploads/2020/01/29161100/asdf-300x1790.png?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&#038;X-Amz-Algorithm=AWS4-HMAC-SHA256&#038;X-Amz-Credential=AKIA6AUOUTCBSKXJPBL2%2F20200129%2Feu-central-1%2Fs3%2Faws4_request&#038;X-Amz-Date=20200129T161417Z&#038;X-Amz-SignedHeaders=host&#038;X-Amz-Expires=900&#038;X-Amz-Signature=f5eaff2b5ded8fe149b3bbfedddac96da6b05ca2f54ece2accf59b395e21ee81';
      const url2 = 'https://tele2-wpexport-nonprod-dev-eu-central-1-kyapgxnfotxrgjhs.s3.eu-central-1.amazonaws.com/uploads/2020/01/29161100/asdf-300x1791.png?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&#038;X-Amz-Algorithm=AWS4-HMAC-SHA256&#038;X-Amz-Credential=AKIA6AUOUTCBSKXJPBL2%2F20200129%2Feu-central-1%2Fs3%2Faws4_request&#038;X-Amz-Date=20200129T161417Z&#038;X-Amz-SignedHeaders=host&#038;X-Amz-Expires=900&#038;X-Amz-Signature=f5eaff2b5ded8fe149b3bbfedddac96da6b05ca2f54ece2accf59b395e21ee81';
      const url3 = 'https://tele2-wpexport-nonprod-dev-eu-central-1-kyapgxnfotxrgjhs.s3.eu-central-1.amazonaws.com/uploads/2020/01/29161100/asdf-300x1792.png?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&#038;X-Amz-Algorithm=AWS4-HMAC-SHA256&#038;X-Amz-Credential=AKIA6AUOUTCBSKXJPBL2%2F20200129%2Feu-central-1%2Fs3%2Faws4_request&#038;X-Amz-Date=20200129T161417Z&#038;X-Amz-SignedHeaders=host&#038;X-Amz-Expires=900&#038;X-Amz-Signature=f5eaff2b5ded8fe149b3bbfedddac96da6b05ca2f54ece2accf59b395e21ee81';
      const url4 = 'https://tele2-wpexport-nonprod-dev-eu-central-1-kyapgxnfotxrgjhs.s3.eu-central-1.amazonaws.com/uploads/2020/01/29161100/asdf-300x1793.png?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&#038;X-Amz-Algorithm=AWS4-HMAC-SHA256&#038;X-Amz-Credential=AKIA6AUOUTCBSKXJPBL2%2F20200129%2Feu-central-1%2Fs3%2Faws4_request&#038;X-Amz-Date=20200129T161417Z&#038;X-Amz-SignedHeaders=host&#038;X-Amz-Expires=900&#038;X-Amz-Signature=f5eaff2b5ded8fe149b3bbfedddac96da6b05ca2f54ece2accf59b395e21ee81';
      const link1 = 'https://tele2-wpexport-nonprod-dev-eu-central-1-kyapgxnfotxrgjhs.s3.eu-central-1.amazonaws.com/uploads/2020/01/29161100/asdf-300x179.pdf?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&#038;X-Amz-Algorithm=AWS4-HMAC-SHA256&#038;X-Amz-Credential=AKIA6AUOUTCBSKXJPBL2%2F20200129%2Feu-central-1%2Fs3%2Faws4_request&#038;X-Amz-Date=20200129T161417Z&#038;X-Amz-SignedHeaders=host&#038;X-Amz-Expires=900&#038;X-Amz-Signature=f5eaff2b5ded8fe149b3bbfedddac96da6b05ca2f54ece2accf59b395e21ee81';
      const unsanitizedContent = `
                <p>
                    <img
                        class="alignnone size-medium wp-image-494"
                        src="${url1}"
                        alt=""
                        width="300"
                        height="179"
                        srcset="${url2} 300w, ${url3} 768w" />
                    <img
                        class="alignnone size-medium wp-image-494"
                        src="${url4}"
                        alt=""
                        width="300"
                        height="179" />
                    <img
                        class="alignnone size-medium wp-image-494"
                        src="agoodimage.png"
                        alt=""
                        width="300"
                        height="179" />
                    <a
                        href="agoodlink.pdf" />
                    <a
                        href="${link1}" />
                </p>
                <p>test</p>`;
      // Act
      const result = sanitizeArticleContent(unsanitizedContent);

      // Assert

      /*  Ensure no wpengine links are present
                Ensure new src and href are for cdn (root of project since not development)
                Ensure non-wp links and hrefs are left as-is */
      expect(result).not.toContain(url1);
      expect(result).not.toContain(url2);
      expect(result).not.toContain(url3);
      expect(result).not.toContain(url4);
      expect(result).not.toContain(link1);
      expect(result).toContain(`src="${cdnPrefix}/media/uploads/2020/01/29161100/asdf-300x1790.png"`);
      expect(result).toContain(`srcset="${cdnPrefix}/media/uploads/2020/01/29161100/asdf-300x1791.png 300w, ${cdnPrefix}/media/uploads/2020/01/29161100/asdf-300x1792.png 768w"`);
      expect(result).toContain(`src="${cdnPrefix}/media/uploads/2020/01/29161100/asdf-300x1793.png"`);
      expect(result).toContain(`href="${cdnPrefix}/media/uploads/2020/01/29161100/asdf-300x179.pdf"`);
      expect(result).toContain('href="agoodlink.pdf"');
      expect(result).toContain('src="agoodimage.png"');
    });

    test('It should not be confused by external urls.', () => {
      // Arrange
      const cdnPrefix = 'null'; // It will keep being null until we mock dotenv variables for jest.

      const url_in = 'https://tele2-wpexport-nonprod-dev-eu-central-1-kyapgxnfotxrgjhs.s3.eu-central-1.amazonaws.com/uploads/2020/01/29161100/asdf-300x1790.png?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&#038;X-Amz-Algorithm=AWS4-HMAC-SHA256&#038;X-Amz-Credential=AKIA6AUOUTCBSKXJPBL2%2F20200129%2Feu-central-1%2Fs3%2Faws4_request&#038;X-Amz-Date=20200129T161417Z&#038;X-Amz-SignedHeaders=host&#038;X-Amz-Expires=900&#038;X-Amz-Signature=f5eaff2b5ded8fe149b3bbfedddac96da6b05ca2f54ece2accf59b395e21ee81';
      const url_out = `${cdnPrefix}/media/uploads/2020/01/29161100/asdf-300x1790.png`;
      const unsanitizedContent = `<iframe src="https://www.youtube.com/embed/nwPCYygFQQM"></iframe><img src="${url_in}"/>`;
      const expectedResult = `<iframe src="https://www.youtube.com/embed/nwPCYygFQQM"></iframe><img src="${url_out}"/>`;

      // Act
      const result = sanitizeArticleContent(unsanitizedContent);

      // Assert
      expect(result).toEqual(expectedResult);
    });

  });
});
