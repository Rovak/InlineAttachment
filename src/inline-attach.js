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
    window.inlineAttach = function(options) {

        var defaults = {
            upload_url: 'upload_attachment.php',
            allowed_types: ['']
        };

        var settings = merge(options, defaults);
        var me = this;

        /**
         * Upload a given file blob
         * 
         * @param {Blob} file
         */
        this.uploadFile = function(file) {
            var formData = new FormData();
            formData.append('file', file);

            var xhr = new XMLHttpRequest();
            xhr.open('POST', settings.upload_url);
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
         * Catches the paste event
         * 
         * @param {Event} e
         * @returns {undefined}
         */
        this.onPaste = function(e) {
            var clipboardData = e.clipboardData;
            for (var i = 0; i < clipboardData.items.length; i++) {
                var item = clipboardData.items[i];
                if (item.kind === "file") {
                    me.onRecievedFile(item.getAsFile());
                    me.uploadFile(item.getAsFile());
                }
            }
        };

        /**
         * Catches onDrop event
         * 
         * @param {Event} e
         */
        this.onDrop = function(e) {
            for (var i = 0; i < e.dataTransfer.files.length; i++) {
                me.uploadFile(e.dataTransfer.files[i]);
            }
        };

        /**
         * When a file is recieved by drag-drop or paste
         * 
         * @param {Blob} file
         */
        this.onRecievedFile = function(file) {
        };

        /**
         * When a file has succesfully been uploaded
         * 
         * @param {Object} json Recieved json data
         */
        this.onUploadedFile = function(json) {
        };
    };
})(document, window);
