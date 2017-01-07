import CodeMirror3 from './codemirror-3';

(function() {

  // Expose to Window
  let root = this;
  root.InlineAttachment = root.InlineAttachment || {};
  root.InlineAttachment.CodeMirror3 = CodeMirror3;

  // Expose to Node
  if (typeof exports !== "undefined") {
    exports.CodeMirror3 = CodeMirror3;
  }

}).call(typeof window !== 'undefined' ? window : this);