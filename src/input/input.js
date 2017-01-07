"use strict";

import Utils from "../utils";
import InlineAttachment from "../inline-attachment";

class InputInlineAttachment {

  constructor(instance, options) {
    this.instance = instance;
    this.options = options;
    this.bind();
  }

  getValue() {
    return this.instance.value;
  }

  insertValue(val) {
    Utils.insertTextAtCursor(this.instance, val);
  }

  setValue(val) {
    this.instance.value = val;
  }

  bind() {
    let inlineAttachment = new InlineAttachment(this, this.options);

    this.instance.addEventListener('paste', function (e) {
      inlineAttachment.onPaste(e);
    }, false);
    this.instance.addEventListener('drop', function (e) {
      e.stopPropagation();
      e.preventDefault();
      inlineAttachment.onDrop(e);
    }, false);
    this.instance.addEventListener('dragenter', function (e) {
      e.stopPropagation();
      e.preventDefault();
    }, false);
    this.instance.addEventListener('dragover', function (e) {
      e.stopPropagation();
      e.preventDefault();
    }, false);
  }
}

export default InputInlineAttachment;