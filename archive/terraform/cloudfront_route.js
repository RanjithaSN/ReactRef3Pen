// NOTE: Disable requiring curly braces on the same line as the previous conditional
// since there are comments for each
/* eslint-disable brace-style */

const path = require('path');

// NOTE: Some capturing groups are ignored (i.e. those starting with "?:")
// $1: application name, including leading "/"
// $2: path, including leading "/", but excluding application name
const APPLICATION_NAME_REGEX = 'storybook|ui-storybook|widgets';
const APPLICATION_REGEX = new RegExp(`(^/(?:${APPLICATION_NAME_REGEX}))(.*)`, 'i');
const INDEX_REGEX = /(.*)?(\/index.html)$/i;
const TRAILING_SLASH_REGEX = /(.*)\/$/;

const transformUri = (request) => {
  const requestUri = request.uri;
  const transformedUri = {
    path: null,
    redirect: false
  };

  const requestPathParts = requestUri.match(APPLICATION_REGEX) || [];
  const [match, , route] = requestPathParts;

  // Handle Storybook or Widget routes
  if (match) {
    const routeHasFileExtension = !!(path.extname(route || ''));
    const routeHasTrailingSlash = !routeHasFileExtension ? route.slice(-1) === '/' : false;

    // Strip trailing "/" from the request, then redirect
    if (routeHasTrailingSlash) {
      transformedUri.path = `${requestUri.slice(0, -1)}`;
      transformedUri.redirect = true;
    }

    // Forward the base route to the application
    else if (!route || route === '/') {
      transformedUri.path = '/index.html';
    }

    // Passthrough the StoryBook or Widget route to the application
    else if (route && !routeHasFileExtension) {
      transformedUri.path = `${route.replace(TRAILING_SLASH_REGEX, '$1')}/index.html`;
    }

    // Passthrough the StoryBook or Widget asset to the origin
    else {
      transformedUri.path = route;
    }
  }

  // Handle application routes
  else {
    const routeHasFileExtension = !!(path.extname(requestUri || ''));
    const routeHasTrailingSlash = !routeHasFileExtension ? requestUri.slice(-1) === '/' : false;

    // Redirect the root directory to the application
    if (requestUri === '/' || !requestUri) {
      transformedUri.path = '/index.html';
    }

    // Strip trailing "/" from the request, then redirect
    else if (routeHasTrailingSlash) {
      transformedUri.path = `${requestUri.slice(0, -1)}`;
      transformedUri.redirect = true;
    }

    // Forward "entrypoint" routes to the application
    else if (requestUri.startsWith('/environment') || requestUri.startsWith('/login')) {
      transformedUri.path = '/index.html';
    }

    // Handle "directories" in the application
    else if (!routeHasFileExtension) {
      transformedUri.path = '/index.html';
    }

    // Handle assets
    // eslint-disable-next-line padded-blocks
    else if (routeHasFileExtension) {

      // Strip "/index.html" from the request, then redirect
      if (requestUri.toLowerCase().endsWith('/index.html')) {
        transformedUri.path = `${requestUri.replace(INDEX_REGEX, '$1')}`;
        transformedUri.redirect = true;
      }

      // Passthrough the asset, without the application name, to the origin
      else {
        transformedUri.path = requestUri;
      }
    }
    else {
      transformedUri.path = requestUri;
    }
  }

  return transformedUri;
};

exports.handler = (event, context, callback) => {
  const request = event.Records[0].cf.request;
  const response = {
    headers: {
      location: [{
        key: 'Location',
        value: ''
      }]
    },
    status: '301',
    statusDescription: 'Found'
  };

  const transformedUri = transformUri(request);
  const requestQuerystring = request.querystring ? `?${request.querystring}` : '';

  // Rewrite the URI and return to CloudFront for further processing, otherwise redirect
  // TODO: Throw error if `Location` header is empty
  if (!transformedUri.redirect) {
    request.uri = transformedUri.path;

    callback(null, request);
  } else {
    response.headers.location[0].value = `${transformedUri.path}${requestQuerystring}`;

    callback(null, response);
  }
};
