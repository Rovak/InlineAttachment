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

        var settings = merge(options, inlineAttach.defaults),
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

            xhr.open('POST', settings.upload_url);
            xhr.upload.onprogress = function(event) {
                // TODO show progress in text
            };
            xhr.onload = function(e) {
                if (xhr.status === 200) {
                    var data = JSON.parse(xhr.responseText);
                    settings.onUploadedFile(data);
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
            return settings.allowed_types.indexOf(file.type) >= 0;
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
                    settings.onRecievedFile(item.getAsFile());
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
                    me.uploadFile(file);
                    settings.onRecievedFile(file);
                }
            }
 
            return result;
        };
    };

    /**
     * Default configuration
     */
    window.inlineAttach.defaults = {
        upload_url: 'upload_attachment.php',
        allowed_types: [
            'image/jpeg',
            'image/png',
            'image/jpg',
            'image/gif'
        ],
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
        // TODO
    };

})(document, window);