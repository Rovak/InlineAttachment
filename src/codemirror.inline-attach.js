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

        var el = codeMirror.getWrapperElement(),
            inlineattach = new inlineAttach(options || {}),
            last_upload;

        inlineattach.onRecievedFile = function(file) {
            
        };

        inlineattach.onUploadedFile = function(data) {
            if (data.filename) {
                var cursor = editor.getCursor();
                editor.setValue(editor.getValue().replace(last_upload, "![file](" + data.filename + ")"));
                editor.setCursor(cursor);
            }
        };

        function onPaste(e) {
            last_upload = '[Upload file...]';
            codeMirror.replaceRange(last_upload, codeMirror.getCursor());
            inlineattach.onPaste(e);
        }

        el.addEventListener("paste", onPaste, false);
    };

})(document, window);