/*jslint newcap: true */
/*global inlineAttach: false, jQuery: false */
/**
 * jQuery plugin for inline attach
 *
 * @param {document} document
 * @param {window} window
 * @param {jQuery} $
 */
(function(document, window, $) {
    "use strict";

    function jQueryEditor(instance, opt) {
        var $this = $(instance);
        var ret = {
            getValue: function() {
                return $this.val();
            },
            setValue: function(val) {
                // Small fix to could be able to attach the inline method to an image tag
                switch ($this.prop('tagName').toLowerCase()){
                    case 'img':
                    $this.attr('src', val);
                    break;
                    default:
                    $this.val(val);
                }
            },
            getNecessary: []
        };
        if(opt.neededAttrData !== undefined && opt.exFormData !== undefined) {
            $.each(opt.neededAttrData,function(i,val_){
                /* Example to get it customized to my project: The needed Infos(example: rel-Attribute) are only @the Lookcontainer...
                 ret.getNecessary[opt.exFormData[i]] = $(instance).parents('.container').attr(val_); 
                 That is the part there the options like this:*/
                /*
                $(".overContent:not(.clone) .OCone .imgContainer").inlineattach({
                    uploadUrl: 'index.php?action=DELETED&method=saveInlineImgUpload&format='+currentInlineUploadMethod+'&modus='+$('input[name="modi"]').val()+'&dated='+$('input[name="datum"]').val()+'&s='+$sess,
                    uploadFieldName: 'imgUpload',
                    neededAttrData: ['rel'],
                    exFormData:  ['relatedToId']
                });
                
                neededAttrData and exFormData will be connected about the index:
                
                At this example the 'rel'-Attribute will set to be send as 'relatedToId' @ the formData() functionality @ L. 66 - 74 (inline-attach.js)
                */
                // getNecessary is the collector which will contain all options for the formData() functionality @each object
                ret.getNecessary[opt.exFormData[i]] = $(instance).attr(val_);
            });
        }

        return ret;
    }

    jQueryEditor.prototype = new inlineAttach.Editor();

    $.fn.inlineattach = function(options) {

        var set = $(this);

        set.each(function() {

            var $this           = $(this),
                editor          = new jQueryEditor($this, options),
                inlineattach    = new inlineAttach(options, editor);

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
})(document, window, jQuery);
