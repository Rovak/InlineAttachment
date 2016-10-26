/*jslint newcap: true */
/*global inlineAttachment: false, angular: false */

import Utils from "./utils";
//import InputInlineAttachment from "./input";

let module = ng.module('inlineattachment', []);
let directiveName = 'inlineattachment';

/**
 * Read all parameters from the given attributes object
 *
 * @param  {Object} obj attributes
 * @param scope Angular Scope
 * @return {Object}
 */
function readParameters(obj, scope) {
  var result = {},
    attrs = obj.$attr,
    option, value;

  for (let key of attrs) {
    option = Utils.lcfirst(key.substr(directiveName.length));
    value = obj[key];
    // Check if the given key is a valid string type, not empty and starts with the attribute name
    if ((option.length > 0) && (key.substring(0, directiveName.length) === directiveName)) {
      result[option] = value;
      if (typeof scope[value] === 'function') {
        result[option] = scope[value];
      }
    }
  }

  return result;
}

module.directive(directiveName, function() {
  return function(scope, element, attrs) {
    var options = readParameters(attrs, scope);
    new InputInlineAttachment(element.context, options);
  };
});

export default module;