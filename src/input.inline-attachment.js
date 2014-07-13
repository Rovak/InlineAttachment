(function(document, window) {

  inlineAttachment.editors.input = {
    Editor: function(instance) {

      var input = instance;

      return {
        getValue: function() {
          return input.value;
        },
        setValue: function(val) {
          input.value = val;
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

})(document, window);