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

inlineAttachment.attachToInput = function(input, options) {

  options = options || {};

  var editor = new inlineAttachment.Editor(input),
    inlineattach = new inlineAttachment(options, editor);

  input.addEventListener('paste', function(e) {
    inlineattach.onPaste(e);
  }, false);
  input.addEventListener('drop', function(e) {
    e.stopPropagation();
    e.preventDefault();
    inlineattach.onDrop(e);
  }, false);
  input.addEventListener('dragenter', function(e) {
    e.stopPropagation();
    e.preventDefault();
  }, false);
  input.addEventListener('dragover', function(e) {
    e.stopPropagation();
    e.preventDefault();
  }, false);
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
   * URL where the file will be send
   */
  uploadUrl: 'upload_attachment.php',

  /**
   * Name in which the file will be placed
   */
  uploadFieldName: 'file',

  /**
   * JSON field which refers to the uploaded file URL
   */
  downloadFieldName: 'filename',

  /**
   * Allowed MIME types
   */
  allowedTypes: [
    'image/jpeg',
    'image/png',
    'image/jpg',
    'image/gif'
  ],

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
   * Triggers when a file is dropped or pasted
   */
  onFileReceived: function() {},

  /**
   * Custom upload handler
   *
   * @return {Boolean} when false is returned it will prevent default upload behavior
   */
  onFileUploadResponse: function(responseText) {
    return true;
  },

  /**
   * Custom error handler. Runs after removing the placeholder text and before the alert().
   * Return false from this function to prevent the alert dialog.
   *
   * @return {Boolean} when false is returned it will prevent default error behavior
   */
  onFileUploadError: function() {
    return true;
  },

  /**
   * When a file has succesfully been uploaded
   */
  onUploadedFile: function() {}
};

/**
 * Uploads the blob
 *
 * @param  {Blob} file blob data received from event.dataTransfer object
 * @return {XMLHttpRequest} request object which sends the file
 */
inlineAttachment.prototype.uploadFile = function(file) {
  var me = this,
    formData = new FormData(),
    xhr = new XMLHttpRequest(),
    settings = this.settings,
    extension = 'png';

  // Attach the file. If coming from clipboard, add a default filename (only works in Chrome for now)
  // http://stackoverflow.com/questions/6664967/how-to-give-a-blob-uploaded-as-formdata-a-file-name
  if (file.name) {
    var fileNameMatches = file.name.match(/\.(.+)$/);
    if (fileNameMatches) {
      extension = fileNameMatches[1];
    }
  }

  formData.append(settings.uploadFieldName, file, "image-" + Date.now() + "." + extension);

  // Append the extra parameters to the formdata
  if (typeof settings.extraParams === "object") {
    for (var key in settings.extraParams) {
      if (settings.extraParams.hasOwnProperty(key)) {
        formData.append(key, settings.extraParams[key]);
      }
    }
  }

  xhr.open('POST', settings.uploadUrl);
  xhr.onload = function() {
    // If HTTP status is OK or Created
    if (xhr.status === 200 || xhr.status === 201) {
      settings.onFileUploadResponse(xhr);
    } else {
      me.onFileUploadError(xhr);
    }
  };
  xhr.send(formData);
  return xhr;
};