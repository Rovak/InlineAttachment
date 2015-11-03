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

uploadMethod: ``POST``

    Which HTTP method will be used to send the upload request

uploadFieldName: ``file``

    Name of the POST field where the file will be sent.

defaultExtension: ``png``

    Default extension when no extension could be detected

jsonFieldName: ``downloadUrl``

    By default the plugin assumes that json is returned, it
    then checks if the given fieldName is available and uses it
    to insert the image url

allowedTypes: ``['image/jpeg', 'image/png', 'image/jpg', 'image/gif']``

    Which mimetypes are accepted as a dropped or pasted file. Others will be ignored and the default behavior will be triggered.

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

extraHeaders: ``{}``

    Extra headers which will be added to the request when uploading a file


Events
------

onFileReceived(file)

    :file:
        file blob

onFileUploadResponse(response)

    :json:
        Simple object which contains the resulting JSON response

    :return:
        `Boolean`

onFileUploadError(response)

    Custom error handler. Runs after removing the placeholder text and before the alert().
    Return false from this function to prevent the alert dialog.

    :return:
        `Boolean` when false is returned it will prevent default error behavior

onFileUploaded(filename)

    Fires when the upload request has finished and the textarea has been updated.
