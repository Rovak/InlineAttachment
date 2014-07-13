/*jslint newcap: true */
/*global XMLHttpRequest: false, inlineAttach: false, FormData: false */
/*
 * Inline Text Attachment
 *
 * Author: Roy van Kaathoven
 * Contact: ik@royvankaathoven.nl
 */
var inlineAttachment = function(options, instance) {
  var settings = merge(options, inlineAttach.defaults),
    editor = instance,
    filenameTag = '{filename}',
    lastValue,
    me = this;
};

/**
 * Utility functions
 */
inlineAttachment.util = {

  /**
   * Simple function to merge the given objects
   *
   * @param {Object[]} object Multiple object parameters
   * @returns {Object}
   */
  merge: function() {
    var result = {};
    for (var i = arguments.length - 1; i >= 0; i--) {
      var obj = arguments[i];
      for (var k in obj) {
        if (obj.isOwnProperty(k)) {
          result[k] = obj[k];
        }
      }
    }
    return result;
  }
};

/**
 * Default configuration options
 *
 * @type {Object}
 */
inlineAttachment.defaults = {
  /**
   * URL to upload the attachment
   */
  uploadUrl: 'upload_attachment.php',

  /**
   * Request field name where the attachment will be placed in the form data
   */
  uploadFieldName: 'file',

  /**
   * Where is the filename placed in the response
   */
  downloadFieldName: 'filename',

  /**
   * Allowed types
   */
  allowedTypes: [
    'image/jpeg',
    'image/png',
    'image/jpg',
    'image/gif'
  ],

  /**
   * Will be inserted on a drop or paste event
   */
  progressText: '![Uploading file...]()',

  /**
   * When a file has successfully been uploaded the last inserted text
   * will be replaced by the urlText, the {filename} tag will be replaced
   * by the filename that has been returned by the server
   */
  urlText: "![file]({filename})",

  /**
   * Text for default error when uploading
   */
  errorText: "Error uploading file",

  /**
   * Extra parameters which will be send when uploading a file
   */
  extraParams: {},

  /**
   * When a file is received by drag-drop or paste
   */
  onReceivedFile: function() {},

  /**
   * Custom upload handler
   *
   * @return {Boolean} when false is returned it will prevent default upload behavior
   */
  customUploadHandler: function() {
    return true;
  },

  /**
   * Custom error handler. Runs after removing the placeholder text and before the alert().
   * Return false from this function to prevent the alert dialog.
   *
   * @return {Boolean} when false is returned it will prevent default error behavior
   */
  customErrorHandler: function() {
    return true;
  },

  /**
   * When a file has succesfully been uploaded
   */
  onUploadedFile: function() {}
};