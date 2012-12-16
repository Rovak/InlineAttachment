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
(function($) {

    var last_upload; // TODO wrong scope

    $.fn.inlineattach = function(options) {

        var settings = $.extend($.fn.inlineattach.defaults, options);

        return this.each(function() {

            var $this = $(this);

            $this.bind({
                paste: function(e) {
                    var clipboardData = e.originalEvent.clipboardData;
                    for (var i = 0; i < clipboardData.items.length; i++) {
                        var item = clipboardData.items[i];
                        if (item.kind === "file") {
                            upload_files($this, [item.getAsFile()], settings.upload_url);
                            return false;
                        }
                    }
                },
                drop: function(e) {
                    // TODO What to do with multiple files?
                    upload_files($this, e.originalEvent.dataTransfer.files[0], settings.upload_url);
                    e.preventDefault();
                }
            });

        });
    };

    /**
     * Show a thumbnail of the given image
     * 
     * @param {File} file
     * @returns {void}
     */
    function show_thumbnail(file) {
        var reader = new FileReader();
        reader.onload = function(event) {
            var image = new Image();
            $('body').append($('<img/>', {
                src: event.target.result,
                width: 100
            }));
        };
        reader.readAsDataURL(file);
    }

    /**
     * Upload the given files
     * 
     * @param {jQuery} textElem A jQuery element
     * @param {File[]} files
     * @param {string} upload_url
     * @returns {void}
     */
    function upload_files(textElem, files, upload_url) {
        var formData = new FormData();
        for (var i = 0; i < files.length; i++) {
            formData.append('file', files[i]);
            show_thumbnail(files[i]);
        }

        // New XHR Request
        var xhr = new XMLHttpRequest();
        xhr.open('POST', upload_url);
        xhr.upload.onprogress = function(event) {
            // TODO show progress in text
        };
        xhr.onload = function(e) {
            if (xhr.status === 200) {
                var data = JSON.parse(xhr.responseText);
                if (data.filename) {
                    val = textElem.val().replace(last_upload, "![file](" + data.filename + ")")
                    textElem.val(val);
                }
            } else {
                // onError remove the last inserted text
                val = textElem.val().replace(last_upload, "")
                textElem.val(val);
            }
        };

        last_upload = '![Uploadf file...]()';

        textElem.val(textElem.val() + "\n\n" + last_upload);

        xhr.send(formData);
    }

    /**
     * Default configuration
     */
    $.fn.inlineattach.defaults = {
        upload_url: null, // Location to which to upload attachment data,
        allowed_types: ['']     // The filetypes which should be handled
    };
})(jQuery);
