import Utils from "../utils";
import InputInlineAttachment from "../input/input";

let directiveName = 'inlineattachment';
let module = angular.module(directiveName, []);

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

  for (let key of Object.keys(attrs)) {
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
    new InputInlineAttachment(element[0], options);
  };
});

export default module;