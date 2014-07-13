inlineAttachment.editors.input = {
  Editor: function(instance) {

    this.input = instance;

    return {
      getValue: function() {
        return this.input.value;
      },
      setValue: function(val) {
        this.input.value = val;
      }
    };
  },
  attachToInput: function(input, options) {
    options = options || {};

    var editor = new inlineAttachment.editors.input.Editor(input),
      inlineattach = new inlineAttachment(options, editor);

    input.addEventListener('paste', function(e) {
      inlineattach.onPaste(e);
    }, false);
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
  },
};