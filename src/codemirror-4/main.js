import CodeMirror4 from './codemirror-4';

(function() {

  // Expose to Window
  let root = this;
  root.InlineAttachment = root.InlineAttachment || {};
  root.InlineAttachment.CodeMirror4 = CodeMirror4;

  // Expose to Node
  if (typeof exports !== "undefined") {
    exports.CodeMirror4 = CodeMirror4;
  }

}).call(typeof window !== 'undefined' ? window : this);