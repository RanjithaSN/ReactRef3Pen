import 'core-js/stable/array/find';
import 'core-js/stable/array/from';
import 'core-js/stable/array/includes';
import 'core-js/stable/number/is-integer';
import 'core-js/stable/number/is-nan';
import 'core-js/stable/number/parse-float';
import 'core-js/stable/object/values';
import 'core-js/stable/string/includes';
import 'core-js/stable/string/starts-with';

if (typeof Promise === 'undefined') {
    // Rejection tracking prevents a common issue where React gets into an
    // inconsistent state due to an error, but it gets swallowed by a Promise,
    // and the user has no idea what causes React's erratic future behavior.
    require('promise/lib/rejection-tracking').enable();
    window.Promise = require('promise/lib/es6-extensions.js');
}

// Object.assign() is commonly used with React.
// It will use the native implementation if it's present and isn't buggy.
Object.assign = require('object-assign');

