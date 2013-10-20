/*jslint newcap: true */
/*global inlineAttach: false, angular: false */
/**
 * AngularJS plugin for inline attachment
 *
 * @param {document} document
 * @param {window} window
 * @param {Object} ng
 */
(function (document, window, ng) {
    "use strict";

    var module      = ng.module('inlineattachment', []),
        attrName    = 'inlineattach';

    function lcfirst (str) {
        return str.charAt(0).toLowerCase() + str.substr(1);
    }

    /**
     * Read all parameters from the given attributes object
     * @param  {Object} obj attributes
     * @return {Object}
     */
    function readParameters(obj) {
        var result = {};
        for (var key in obj) {
            // Check if the given key is a valid string type, not empty and starts with the attribute name
            if (typeof obj[key] === 'string' && obj[key] && key.substring(0, attrName.length) === attrName) {
                result[lcfirst(key.substr(attrName.length))] = obj[key];
            }
        }

        return result;
    }

    module.directive(attrName, function () {
        return function (scope, element, attrs) {
            var options = readParameters(attrs);
            inlineAttach.attachToInput(element.context, options);
        };
    });
})(document, window, angular);