import InputInlineAttachment from './angular-1';

(function() {

  let root = this;
  root.InlineAttachment = root.InlineAttachment || {};
  root.InputInlineAttachment = InputInlineAttachment;

  if (typeof exports !== "undefined") {
    exports.InputInlineAttachment = root.InputInlineAttachment;
  }

}).call(typeof window !== 'undefined' ? window : this);