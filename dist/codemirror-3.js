/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _codemirror = __webpack_require__(6);

	var _codemirror2 = _interopRequireDefault(_codemirror);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	(function () {

	  // Expose to Window
	  var root = this;
	  root.InlineAttachment = root.InlineAttachment || {};
	  root.InlineAttachment.CodeMirror3 = _codemirror2.default;

	  // Expose to Node
	  if (true) {
	    exports.CodeMirror3 = _codemirror2.default;
	  }
	}).call(typeof window !== 'undefined' ? window : undefined);

/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Utils = function () {
	  function Utils() {
	    _classCallCheck(this, Utils);
	  }

	  _createClass(Utils, null, [{
	    key: "merge",


	    /**
	     * Simple function to merge the given objects
	     *
	     * @returns {Object}
	     */
	    value: function merge() {
	      var result = {};

	      for (var _len = arguments.length, objects = Array(_len), _key = 0; _key < _len; _key++) {
	        objects[_key] = arguments[_key];
	      }

	      for (var i = objects.length - 1; i >= 0; i--) {
	        var obj = objects[i];
	        for (var k in obj) {
	          if (obj.hasOwnProperty(k)) {
	            result[k] = obj[k];
	          }
	        }
	      }
	      return result;
	    }

	    /**
	     * @param str
	     * @returns {string} Returns the string with the first letter as lowercase
	     */

	  }, {
	    key: "lcfirst",
	    value: function lcfirst(str) {
	      return str.charAt(0).toLowerCase() + str.substr(1);
	    }

	    /**
	     * Append a line of text at the bottom, ensuring there aren't unnecessary newlines
	     *
	     * @param {String} appended Current content
	     * @param {String} previous Value which should be appended after the current content
	     */

	  }, {
	    key: "appendInItsOwnLine",
	    value: function appendInItsOwnLine(previous, appended) {
	      return (previous + "\n\n[[D]]" + appended).replace(/(\n{2,})\[\[D\]\]/, "\n\n").replace(/^(\n*)/, "");
	    }

	    /**
	     * Inserts the given value at the current cursor position of the textarea element
	     *
	     * @param  {HtmlElement} el
	     * @param  {String} text Text which will be inserted at the cursor position
	     */

	  }, {
	    key: "insertTextAtCursor",
	    value: function insertTextAtCursor(el, text) {
	      var scrollPos = el.scrollTop,
	          strPos = 0,
	          browser = false,
	          range;

	      if (el.selectionStart || el.selectionStart === '0') {
	        browser = "ff";
	      } else if (document.selection) {
	        browser = "ie";
	      }

	      if (browser === "ie") {
	        el.focus();
	        range = document.selection.createRange();
	        range.moveStart('character', -el.value.length);
	        strPos = range.text.length;
	      } else if (browser === "ff") {
	        strPos = el.selectionStart;
	      }

	      var front = el.value.substring(0, strPos);
	      var back = el.value.substring(strPos, el.value.length);
	      el.value = front + text + back;
	      strPos = strPos + text.length;
	      if (browser === "ie") {
	        el.focus();
	        range = document.selection.createRange();
	        range.moveStart('character', -el.value.length);
	        range.moveStart('character', strPos);
	        range.moveEnd('character', 0);
	        range.select();
	      } else if (browser === "ff") {
	        el.selectionStart = strPos;
	        el.selectionEnd = strPos;
	        el.focus();
	      }
	      el.scrollTop = scrollPos;
	    }
	  }]);

	  return Utils;
	}();

	exports.default = Utils;

/***/ },
/* 3 */,
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _utils = __webpack_require__(2);

	var _utils2 = _interopRequireDefault(_utils);

	var _defaults = __webpack_require__(5);

	var _defaults2 = _interopRequireDefault(_defaults);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var InlineAttachment = function () {
	  function InlineAttachment(instance, options) {
	    _classCallCheck(this, InlineAttachment);

	    this.settings = _utils2.default.merge(options, _defaults2.default);
	    this.editor = instance;
	    this.filenameTag = '{filename}';
	    this.lastValue = null;
	  }

	  /**
	   * Uploads the blob
	   *
	   * @param  {Blob} file blob data received from event.dataTransfer object
	   * @return {XMLHttpRequest} request object which sends the file
	   */


	  _createClass(InlineAttachment, [{
	    key: "uploadFile",
	    value: function uploadFile(file) {
	      var me = this,
	          formData = new FormData(),
	          xhr = new XMLHttpRequest(),
	          settings = this.settings,
	          extension = settings.defaultExtension || settings.defualtExtension;

	      if (typeof settings.setupFormData === 'function') {
	        settings.setupFormData(formData, file);
	      }

	      // Attach the file. If coming from clipboard, add a default filename (only works in Chrome for now)
	      // http://stackoverflow.com/questions/6664967/how-to-give-a-blob-uploaded-as-formdata-a-file-name
	      if (file.name) {
	        var fileNameMatches = file.name.match(/\.(.+)$/);
	        if (fileNameMatches) {
	          extension = fileNameMatches[1];
	        }
	      }

	      var remoteFilename = "image-" + Date.now() + "." + extension;
	      if (typeof settings.remoteFilename === 'function') {
	        remoteFilename = settings.remoteFilename(file);
	      }

	      formData.append(settings.uploadFieldName, file, remoteFilename);

	      // Append the extra parameters to the formdata
	      if (_typeof(settings.extraParams) === "object") {
	        for (var key in settings.extraParams) {
	          if (settings.extraParams.hasOwnProperty(key)) {
	            formData.append(key, settings.extraParams[key]);
	          }
	        }
	      }

	      xhr.open('POST', settings.uploadUrl);

	      // Add any available extra headers
	      if (_typeof(settings.extraHeaders) === "object") {
	        for (var header in settings.extraHeaders) {
	          if (settings.extraHeaders.hasOwnProperty(header)) {
	            xhr.setRequestHeader(header, settings.extraHeaders[header]);
	          }
	        }
	      }

	      xhr.onload = function () {
	        // If HTTP status is OK or Created
	        if (xhr.status === 200 || xhr.status === 201) {
	          me.onFileUploadResponse(xhr);
	        } else {
	          me.onFileUploadError(xhr);
	        }
	      };
	      if (settings.beforeFileUpload(xhr) !== false) {
	        xhr.send(formData);
	      }
	      return xhr;
	    }

	    /**
	     * Returns if the given file is allowed to handle
	     *
	     * @param {File} file clipboard data file
	     */

	  }, {
	    key: "isFileAllowed",
	    value: function isFileAllowed(file) {
	      if (file.kind === 'string') {
	        return false;
	      }
	      if (this.settings.allowedTypes.indexOf('*') === 0) {
	        return true;
	      } else {
	        return this.settings.allowedTypes.indexOf(file.type) >= 0;
	      }
	    }

	    /**
	     * Handles upload response
	     *
	     * @param  {XMLHttpRequest} xhr
	     * @return {void}
	     */

	  }, {
	    key: "onFileUploadResponse",
	    value: function onFileUploadResponse(xhr) {
	      if (this.settings.onFileUploadResponse.call(this, xhr) !== false) {
	        var result = JSON.parse(xhr.responseText),
	            filename = result[this.settings.jsonFieldName];

	        if (result && filename) {
	          var newValue;
	          if (typeof this.settings.urlText === 'function') {
	            newValue = this.settings.urlText.call(this, filename, result);
	          } else {
	            newValue = this.settings.urlText.replace(this.filenameTag, filename);
	          }
	          var text = this.editor.getValue().replace(this.lastValue, newValue);
	          this.editor.setValue(text);
	          this.settings.onFileUploaded.call(this, filename);
	        }
	      }
	    }

	    /**
	     * Called when a file has failed to upload
	     *
	     * @param  {XMLHttpRequest} xhr
	     * @return {void}
	     */

	  }, {
	    key: "onFileUploadError",
	    value: function onFileUploadError(xhr) {
	      if (this.settings.onFileUploadError.call(this, xhr) !== false) {
	        var text = this.editor.getValue().replace(this.lastValue, "");
	        this.editor.setValue(text);
	      }
	    }

	    /**
	     * Called when a file has been inserted, either by drop or paste
	     *
	     * @param  {File} file
	     * @return {void}
	     */

	  }, {
	    key: "onFileInserted",
	    value: function onFileInserted(file) {
	      if (this.settings.onFileReceived.call(this, file) !== false) {
	        this.lastValue = this.settings.progressText;
	        this.editor.insertValue(this.lastValue);
	      }
	    }

	    /**
	     * Called when a paste event occured
	     * @param  {Event} e
	     * @return {Boolean} if the event was handled
	     */

	  }, {
	    key: "onPaste",
	    value: function onPaste(e) {
	      var result = false,
	          clipboardData = e.clipboardData,
	          items;

	      if ((typeof clipboardData === "undefined" ? "undefined" : _typeof(clipboardData)) === "object") {
	        items = clipboardData.items || clipboardData.files || [];

	        for (var i = 0; i < items.length; i++) {
	          var item = items[i];
	          if (this.isFileAllowed(item)) {
	            result = true;
	            this.onFileInserted(item.getAsFile());
	            this.uploadFile(item.getAsFile());
	          }
	        }
	      }

	      if (result) {
	        e.preventDefault();
	      }

	      return result;
	    }

	    /**
	     * Called when a drop event occures
	     * @param  {Event} e
	     * @return {Boolean} if the event was handled
	     */

	  }, {
	    key: "onDrop",
	    value: function onDrop(e) {
	      var result = false;
	      for (var i = 0; i < e.dataTransfer.files.length; i++) {
	        var file = e.dataTransfer.files[i];
	        if (this.isFileAllowed(file)) {
	          result = true;
	          this.onFileInserted(file);
	          this.uploadFile(file);
	        }
	      }

	      return result;
	    }
	  }]);

	  return InlineAttachment;
	}();

	exports.default = InlineAttachment;

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * Default Options
	 */
	exports.default = {
	  /**
	   * URL where the file will be send
	   */
	  uploadUrl: 'upload_attachment.php',

	  /**
	   * Which method will be used to send the file to the upload URL
	   */
	  uploadMethod: 'POST',

	  /**
	   * Name in which the file will be placed
	   */
	  uploadFieldName: 'file',

	  /**
	   * Extension which will be used when a file extension could not
	   * be detected
	   */
	  defaultExtension: 'png',

	  /**
	   * JSON field which refers to the uploaded file URL
	   */
	  jsonFieldName: 'filename',

	  /**
	   * Allowed MIME types
	   */
	  allowedTypes: ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'],

	  /**
	   * Text which will be inserted when dropping or pasting a file.
	   * Acts as a placeholder which will be replaced when the file is done with uploading
	   */
	  progressText: '![Uploading file...]()',

	  /**
	   * When a file has successfully been uploaded the progressText
	   * will be replaced by the urlText, the {filename} tag will be replaced
	   * by the filename that has been returned by the server
	   */
	  urlText: "![file]({filename})",

	  /**
	   * Text which will be used when uploading has failed
	   */
	  errorText: "Error uploading file",

	  /**
	   * Extra parameters which will be send when uploading a file
	   */
	  extraParams: {},

	  /**
	   * Extra headers which will be send when uploading a file
	   */
	  extraHeaders: {},

	  /**
	   * Before the file is send
	   */
	  beforeFileUpload: function beforeFileUpload() {
	    return true;
	  },

	  /**
	   * Triggers when a file is dropped or pasted
	   */
	  onFileReceived: function onFileReceived() {},

	  /**
	   * Custom upload handler
	   *
	   * @return {Boolean} when false is returned it will prevent default upload behavior
	   */
	  onFileUploadResponse: function onFileUploadResponse() {
	    return true;
	  },

	  /**
	   * Custom error handler. Runs after removing the placeholder text and before the alert().
	   * Return false from this function to prevent the alert dialog.
	   *
	   * @return {Boolean} when false is returned it will prevent default error behavior
	   */
	  onFileUploadError: function onFileUploadError() {
	    return true;
	  },

	  /**
	   * When a file has succesfully been uploaded
	   */
	  onFileUploaded: function onFileUploaded() {}
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _inlineAttachment = __webpack_require__(4);

	var _inlineAttachment2 = _interopRequireDefault(_inlineAttachment);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var CodeMirror3 = function () {
	  function CodeMirror3(instance, options) {
	    _classCallCheck(this, CodeMirror3);

	    if (!instance.getWrapperElement) {
	      throw "Invalid CodeMirror object given";
	    }

	    this.instance = instance;
	    this.options = options;
	    this.bind();
	  }

	  _createClass(CodeMirror3, [{
	    key: "getValue",
	    value: function getValue() {
	      return this.instance.getValue();
	    }
	  }, {
	    key: "insertValue",
	    value: function insertValue(value) {
	      this.instance.replaceSelection(value);
	    }
	  }, {
	    key: "setValue",
	    value: function setValue(value) {
	      var cursor = this.instance.getCursor();
	      this.instance.setValue(value);
	      this.instance.setCursor(cursor);
	    }
	  }, {
	    key: "bind",
	    value: function bind() {

	      var inlineAttachment = new _inlineAttachment2.default(this, this.options);
	      var el = this.instance.getWrapperElement();

	      el.addEventListener('paste', function (e) {
	        inlineAttachment.onPaste(e);
	      }, false);

	      this.instance.setOption('onDragEvent', function (data, e) {
	        if (e.type === "drop") {
	          e.stopPropagation();
	          e.preventDefault();
	          return inlineAttachment.onDrop(e);
	        }
	      });
	    }
	  }]);

	  return CodeMirror3;
	}();

	exports.default = CodeMirror3;

/***/ }
/******/ ]);