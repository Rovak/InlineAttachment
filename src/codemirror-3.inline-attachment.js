/*jslint newcap: true */
/*global inlineAttachment: false */

import InlineAttachment from "./inline-attachment";

export default class CodeMirror3InlineAttachment {

  constructor(instance, options) {
    if (!instance.getWrapperElement) {
      throw "Invalid CodeMirror object given";
    }

    this.instance = instance;
    this.options = options;
  }

  getValue() {
    return this.instance.getValue();
  }

  insertValue(value) {
    this.instance.replaceSelection(value);
  }

  setValue(value) {
    let cursor = this.instance.getCursor();
    this.instance.setValue(value);
    this.instance.setCursor(cursor);
  }

  bind() {

    let inlineAttachment = new InlineAttachment(this, this.options);
    let el = this.instance.getWrapperElement();

    el.addEventListener('paste', function(e) {
      inlineAttachment.onPaste(e);
    }, false);

    this.instance.setOption('onDragEvent', function(data, e) {
      if (e.type === "drop") {
        e.stopPropagation();
        e.preventDefault();
        return inlineAttachment.onDrop(e);
      }
    });
  }
}

/**
 * CodeMirror version for inlineAttachment
 *
 * Call inlineAttachment.attach(editor) to attach to a codemirror instance
 */
(function() {
  'use strict';

  var codeMirrorEditor = function(instance) {

    if (!instance.getWrapperElement) {
      throw "Invalid CodeMirror object given";
    }

    this.codeMirror = instance;
  };

  codeMirrorEditor.prototype.getValue = function() {
    return this.codeMirror.getValue();
  };

  codeMirrorEditor.prototype.insertValue = function(val) {
    this.codeMirror.replaceSelection(val);
  };

  codeMirrorEditor.prototype.setValue = function(val) {
    var cursor = this.codeMirror.getCursor();
    this.codeMirror.setValue(val);
    this.codeMirror.setCursor(cursor);
  };

  /**
   * Attach InlineAttachment to CodeMirror
   *
   * @param {CodeMirror} codeMirror
   */
  codeMirrorEditor.attach = function(codeMirror, options) {

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

  inlineAttachment.editors.codemirror3 = codeMirrorEditor;
})();