/*jslint newcap: true */
/*global inlineAttachment: false, angular: false */
/**
 * AngularJS plugin for inline attachment
 *
 * @param {document} document
 * @param {window} window
 * @param {Object} ng
 */
(function(document, window, ng) {
  'use strict';

  inlineAttachment.editors.angular = {};

  var module = ng.module('inlineattachment', []),
    attrName = 'inlineattachment';

  function lcfirst(str) {
    return str.charAt(0).toLowerCase() + str.substr(1);
  }

  /**
   * Read all parameters from the given attributes object
   *
   * @param  {Object} obj attributes
   * @return {Object}
   */
  function readParameters(obj, scope) {
    var result = {},
      attrs = obj.$attr,
      option, value;

    for (var key in attrs) {
      option = lcfirst(key.substr(attrName.length));
      value = obj[key];
      // Check if the given key is a valid string type, not empty and starts with the attribute name
      if ((option.length > 0) && (key.substring(0, attrName.length) === attrName)) {
        result[option] = value;
        if (typeof scope[value] === 'function') {
          result[option] = scope[value];
        }
      }
    }

    return result;
  }

  module.directive(attrName, function() {
    return function(scope, element, attrs) {
      var options = readParameters(attrs, scope);
      inlineAttachment.editors.input.attachToInput(element.context, options);
    };
  });
})(document, window, angular);
