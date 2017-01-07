import jQueryInlineAttachment from '../jquery/jquery';

(function() {

  let root = this;

  root.InlineAttachment = root.InlineAttachment || {};
  root.InlineAttachment.jQuery = jQueryInlineAttachment;

  if (typeof exports !== "undefined") {
    exports.jQuery = jQueryInlineAttachment;
  }

  if( typeof jQuery === 'undefined' ) {
    if( typeof require !== 'undefined' ) {
      jQuery = require('jquery');
    } else {
      throw new Error('jQuery version of InlineAttachment requires jQuery, see https://jquery.com/');
    }
  }

  jQuery.fn.inlineAttachment = function(options) {

    $(this).each(function() {
      new jQueryInlineAttachment(this, options);
    });

    return this;
  };


}).call(typeof window !== 'undefined' ? window : this);