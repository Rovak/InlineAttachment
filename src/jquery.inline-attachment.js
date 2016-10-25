/*jslint newcap: true */
/*global inlineAttachment: false, jQuery: false */

import InlineAttachment from "./inline-attachment";
import Utils from "./utils";

export default class jQueryInlineAttachment {

  constructor(instance, options) {
    this.instance = $(instance);
    this.options = options;
  }

  getValue() {
    return this.instance.val();
  }

  insertValue(val) {
    Utils.insertTextAtCursor($this[0], val);
  }

  setValue(val) {
    this.instance.val(val);
  }

  bind() {
    var inlineAttachment = new InlineAttachment(this, this.options);

    this.instance.bind({
      'paste': function(e) {
        inlineAttachment.onPaste(e.originalEvent);
      },
      'drop': function(e) {
        e.stopPropagation();
        e.preventDefault();
        inlineAttachment.onDrop(e.originalEvent);
      },
      'dragenter dragover': function(e) {
        e.stopPropagation();
        e.preventDefault();
      }
    });
  }
}

$.fn.inlineattachment = function(options) {

  $(this).each(function() {
    new jQueryInlineAttachment(this, options);
  });

  return this;
};
