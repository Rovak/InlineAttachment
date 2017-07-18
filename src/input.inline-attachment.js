/*jslint newcap: true */
/*global inlineAttachment: false */
(function() {
  'use strict';

  var inputEditor = {};

  inputEditor.Editor = function(instance) {

    var input = instance,
      pasteElement;

    return {
      getValue: function() {
        return input.value;
      },
      insertValue: function(val) {
        inlineAttachment.util.insertTextAtCursor(input, val);
      },
      setValue: function(val) {
        input.value = val;
      },
      getElement: function() {
        return input;
      },
      getPasteElement: function() {
        if (!pasteElement) {
          pasteElement = inlineAttachment.util.createPasteElement(input);
        }
        return pasteElement;
      }
    };
  };

  inputEditor.attachToInput = function(input, options) {
    options = options || {};

    var editor = new inlineAttachment.editors.input.Editor(input),
    inlineattach = new inlineAttachment(options, editor);

    if (inlineAttachment.util.browser.isFirefox) {
      inlineAttachment.util.initPasteElement(inlineattach);
    } else {
      input.addEventListener('paste', function(e) {
        inlineattach.onPaste(e);
      }, false);
    }
    input.addEventListener('drop', function(e) {
      e.stopPropagation();
      e.preventDefault();
      inlineattach.onDrop(e);
    }, false);
    input.addEventListener('dragenter', function(e) {
      e.stopPropagation();
      e.preventDefault();
    }, false);
    input.addEventListener('dragover', function(e) {
      e.stopPropagation();
      e.preventDefault();
    }, false);
  };

  inlineAttachment.editors.input = inputEditor;
})();