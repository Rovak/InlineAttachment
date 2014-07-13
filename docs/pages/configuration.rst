Configuration
=============

The plugin has the following options which can be configured, example:


.. code-block:: javascript

    {
        uploadUrl: 'upload_attachment.php',
    }


Properties
----------

uploadUrl: ``upload_attachment.php``

    Specifies the URL where files will be send to, default: `upload_attachment.php`

uploadFieldName: ``file``

    Name of the POST field where the file will be sent.

downloadFileName: ``downloadUrl``

    Name of the field which contains the URL of the uploaded file

allowedTypes: ``['image/jpeg', 'image/png', 'image/jpg', 'image/gif']``

    Allowed mimetypes of any dropped files, others will be ignored

progressText: ``![Uploading file...]()``

    Text which will be inserted on the spot where an image is dropped or paste is called
    Used as a placeholder where the resulting fileurl will be inserted

urlText: ``![file]({filename})``

    When a file has successfully been uploaded the last inserted text
    will be replaced by the urlText, the {filename} tag will be replaced
    by the filename that has been returned by the server

errorText: ``Error uploading file``

    Error message for default error handler

extraParams: ``{}``

    Extra parameters which will be send as POST data when sending a file


Events
------

fileReceived(file)

    :file:
        file blob

success(response)

    :json:
        Simple object which contains the resulting JSON response

    :return:
        `Boolean`

failure(response)

    Custom error handler. Runs after removing the placeholder text and before the alert().
    Return false from this function to prevent the alert dialog.

    :return:
        `Boolean` when false is returned it will prevent default error behavior

complete(response)

    Fires when the upload request has finished

uploadHandler(file)

    Custom upload handler, must return false to prevent default handler.
    Can be used to send file via custom transport(like socket.io)

    :file:
        `Blob`

    :return:
        `Boolean`
         when false is returned it will prevent default upload behavior

dataPreprocessor(responseText)

    :data:
        data JSON data returned from the server

    :return:
        modified object