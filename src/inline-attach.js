/*jslint newcap: true */
/*global XMLHttpRequest: false, inlineAttach: false, FormData: false */
/*
 * Inline Text Attachment
 *
 * Copyright 2012 Roy van Kaathoven.
 * Contact: royvankaathoven@hotmail.com
 *
 * Licensed under the MIT License.
 *
 * Version 0.1
 */
(function(document, window) {
    "use strict";

    /**
     * Simple function to merge the given objects
     *
     * @param {Object[]} object Multiple object parameters
     * @returns {Object}
     */
    function merge() {
        var result = {};
        for (var i = arguments.length - 1; i >= 0; i--) {
            var obj = arguments[i];
            for (var k in obj) {
                result[k] = obj[k];
            }
        }
        return result;
    }

    /**
     * @param {Object} options
     */
    window.inlineAttach = function(options, instance) {

        var settings = merge(options, inlineAttach.defaults),
            editor = instance,
            filenameTag = '{filename}',
            lastValue,
            me = this;

        /**
         * Upload a given file blob
         *
         * @param {Blob} file
         */
        this.uploadFile = function(file) {
            var formData = new FormData(),
                xhr = new XMLHttpRequest();

            formData.append('file', file);

            xhr.open('POST', settings.uploadUrl);
            xhr.upload.onprogress = function(event) {
                // TODO show progress in text
            };
            xhr.onload = function(e) {
                if (xhr.status === 200) {
                    var data = JSON.parse(xhr.responseText);
                    me.onUploadedFile(data);
                }
            };
            xhr.send(formData);
        };

        /**
         * Check if the given file is allowed
         *
         * @param {File} file
         */
        this.isAllowedFile = function(file) {
            return settings.allowedTypes.indexOf(file.type) >= 0;
        };

        /**
         * When a file has finished uploading
         *
         * @param {Object} data
         */
        this.onUploadedFile = function(data) {
            var result = settings.onUploadedFile(data);
            if (result !== false && data.filename) {
                var text = editor.getValue().replace(lastValue, settings.urlText.replace(filenameTag, data.filename));
                editor.setValue(text);
            }
        };

        /**
         * When a file has been recieved by a drop or paste event
         * @param {Blob} file
         */
        this.onRecievedFile = function(file) {
            var result = settings.onRecievedFile(file);
            if (result !== false) {
                lastValue = settings.progressText;
                editor.setValue(editor.getValue() + "\n\n" + lastValue);
            }
        };

        /**
         * Catches the paste event
         *
         * @param {Event} e
         * @returns {Boolean} If a file is handled
         */
        this.onPaste = function(e) {
            var result = false,
                clipboardData = e.clipboardData;

            for (var i = 0; i < clipboardData.items.length; i++) {
                var item = clipboardData.items[i];
                if (me.isAllowedFile(item)) {
                    result = true;
                    this.onRecievedFile(item.getAsFile());
                    this.uploadFile(item.getAsFile());
                }
            }

            return result;
        };

        /**
         * Catches onDrop event
         *
         * @param {Event} e
         * @returns {Boolean} If a file is handled
         */
        this.onDrop = function(e) {
            var result = false;
            for (var i = 0; i < e.dataTransfer.files.length; i++) {
                var file = e.dataTransfer.files[i];
                if (me.isAllowedFile(file)) {
                    result = true;
                    this.onRecievedFile(file);
                    this.uploadFile(file);
                }
            }

            return result;
        };
    };

    /**
     * Editor
     */
    window.inlineAttach.Editor = function(instance) {

        var input = instance;

        return {
            getValue: function() {
                return input.value;
            },
            setValue: function(val) {
                input.value = val;
            }
        };
    };

    /**
     * Default configuration
     */
    window.inlineAttach.defaults = {
        uploadUrl: 'upload_attachment.php',
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
         * When a file is recieved by drag-drop or paste
         *
         * @param {Blob} file
         */
        onRecievedFile: function(file) {},

        /**
         * When a file has succesfully been uploaded
         *
         * @param {Object} json Recieved json data
         */
        onUploadedFile: function(json) {}
    };

    /**
     * Attach to a standard input field
     *
     * @param {Input} input
     * @param {Object} options
     */
    window.inlineAttach.attachToInput = function(input, options) {

        options = options || {};

        var editor          = new inlineAttach.Editor(input),
            inlineattach    = new inlineAttach(options, editor);

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

})(document, window);