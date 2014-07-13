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
  'use strict';

  codemirror.editors.jquery = {};

  /**
   * Creates a new editor using jQuery
   */
  var editor = function(instance) {

    var $this = $(instance);

    return {
      getValue: function() {
        return $this.val();
      },
      setValue: function(val) {
        $this.val(val);
      }
    };
  };

  $.fn.inlineattachment = function(options) {

    var set = $(this);

    set.each(function() {

      var $this = $(this),
        editor = new editor($this),
        inlineattach = new inlineAttachment(options, editor);

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

  codemirror.editors.jquery.Editor = editor;

})(document, window, jQuery);