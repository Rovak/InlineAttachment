/*jslint newcap: true */
/*global inlineAttachment: false */
/**
 * CodeMirror version for inlineAttachment
 *
 * Call inlineAttachment.attachToCodeMirror(editor) to attach to a codemirror instance
 */
(function() {
  'use strict';

  inlineAttachment.editors.codemirror = {};

  var codeMirrorEditor = function(instance) {

    if (!instance.getWrapperElement) {
      throw "Invalid CodeMirror object given";
    }

    var codeMirror = instance;

    return {
      getValue: function() {
        return codeMirror.getValue();
      },
      insertValue: function(val) {
        codeMirror.replaceSelection(val);
      },
      setValue: function(val) {
        var cursor = codeMirror.getCursor();
        codeMirror.setValue(val);
        codeMirror.setCursor(cursor);
      }
    };
  };

  /**
   * Attach InlineAttachment to CodeMirror
   *
   * @param {CodeMirror} codeMirror
   */
  inlineAttachment.editors.codemirror.attachToCodeMirror = function(codeMirror, options) {

    options = options || {};

    var editor = new codeMirrorEditor(codeMirror),
      inlineattach = new inlineAttachment(options, editor),
      el = codeMirror.getWrapperElement();

    el.addEventListener('paste', function(e) {
      inlineattach.onPaste(e);
    }, false);

    codeMirror.setOption('onDragEvent', function(data, e) {
      if (e.type === "drop") {
        e.stopPropagation();
        e.preventDefault();
        return inlineattach.onDrop(e);
      }
    });
  };

})();