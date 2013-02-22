/*jslint newcap: true */
/*global inlineAttach: false */
/**
 * CodeMirror version for inlineAttach
 *
 * Call inlineAttach.attachToCodeMirror(editor) to attach to a codemirror instance
 *
 * @param {document} document
 * @param {window} window
 */
(function(document, window) {
    "use strict";

    function CodeMirrorEditor(instance) {

        if (!instance.getWrapperElement) {
            throw "Invalid CodeMirror object given";
        }

        var codeMirror = instance;

        return {
            getValue: function() {
                return codeMirror.getValue();
            },
            setValue: function(val) {
                var cursor = codeMirror.getCursor();
                codeMirror.setValue(val);
                codeMirror.setCursor(cursor);
            }
        };
    }

    CodeMirrorEditor.prototype = new inlineAttach.Editor();

    /**
     * @param {CodeMirror} codeMirror
     */
    window.inlineAttach.attachToCodeMirror = function(codeMirror, options) {

        options = options || {};

        var editor          = new CodeMirrorEditor(codeMirror),
            inlineattach    = new inlineAttach(options, editor),
            el              = codeMirror.getWrapperElement();

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

})(document, window);