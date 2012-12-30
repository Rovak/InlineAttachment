/**
 * CodeMirror version for inlineAttach
 * 
 * Call inlineAttach.attachToCodeMirror(editor) to attach to a codemirror instance
 * 
 * @param {document} document
 * @param {window} window
 */
(function(document, window) {

    /**
     * @param {CodeMirror} codeMirror
     */
    window.inlineAttach.attachToCodeMirror = function(codeMirror, options) {

        if (!codeMirror.getWrapperElement) {
            throw "Invalid CodeMirror object given";
        }

        options = options || {};

        options.onRecievedFile = function() {
            last_upload = '[Upload file...]';
            codeMirror.replaceRange(last_upload, codeMirror.getCursor());
        };

        options.onUploadedFile = function(data) {
            if (data.filename) {
                var cursor = codeMirror.getCursor();
                codeMirror.setValue(codeMirror.getValue().replace(last_upload, "![file](" + data.filename + ")"));
                codeMirror.setCursor(cursor);
            }
        };

        var el = codeMirror.getWrapperElement(),
                inlineattach = new inlineAttach(options),
                last_upload;

        el.addEventListener('paste', function(e) {
            inlineattach.onPaste(e);
        }, false);

        codeMirror.setOption('onDragEvent', function(data, e) {
            e.stopPropagation();
            e.preventDefault();
            return inlineattach.onDrop(e);
        });
    };

})(document, window);