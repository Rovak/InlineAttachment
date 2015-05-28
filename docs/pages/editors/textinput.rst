Text Input
=============

Inline Attachment can be used with a default Text Input

.. code-block:: html

    <!DOCTYPE html>
    <html>
        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
            <title>Textarea Inline Attachment Demo</title>
        </head>
        <body>

            <textarea id="code" rows="10" cols="50"></textarea>

            <script type="text/javascript" src="../src/inline-attachment.js"></script>
            <script type="text/javascript" src="../src/input.inline-attachment.js"></script>
            <script type="text/javascript">
                inlineAttachment.editors.input.attachToInput(document.getElementById("code"));
            </script>
        </body>
    </html>

