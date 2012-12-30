/**
 * jQuery plugin for inline attach
 *
 * @param {jQuery} $
 */
(function($) {
    "use strict";

    function jQueryEditor(instance) {

        var $this = $(instance);

        this.getValue = function() {
            return $this.val();
        };

        this.setValue = function(val) {
            $this.val(val);
        };
    }

    jQueryEditor.prototype = new inlineAttach.Editor();

    $.fn.inlineattach = function(options) {

        var set = $(this);

        set.each(function() {

            var $this           = $(this),
                editor          = new jQueryEditor($this),
                inlineattach    = new inlineAttach(options, editor),

                last_upload;

            $this.bind({
                'paste': function(e) {
                    inlineattach.onPaste(e.originalEvent);
                },
                'drop': function(e) {
                    e.stopPropagation();
                    e.preventDefault();
                    inlineattach.onDrop(e.originalEvent);
                },
                'dragenter dragover': function(e) {
                    e.stopPropagation();
                    e.preventDefault();
                }
            });
        });

        return this;
    };
})(jQuery);
