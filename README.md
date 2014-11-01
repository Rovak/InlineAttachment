# Inline Attachment 1.3.2 [![Master Branch Build Status](https://api.travis-ci.org/Rovak/InlineAttachment.png?branch=master)](http://travis-ci.org/Rovak/InlineAttachment) ![project status](http://stillmaintained.com/Rovak/InlineAttachment.png)

Adds upload functionality to a textarea or CodeMirror instance by either drag-dropping or pasting (only in chrome) an image inside it.

It mimics the comment system on issues which is used on Github.

![demo](https://f.cloud.github.com/assets/21/678/248aac6a-40a2-11e2-9a76-fd59ded28bbe.gif)

## Download

The most recent minified versions can be found [here](http://data.razko.nl/projects/inlineattachment/latest/)

## Usage

__Configuration__

All versions can be configured using the following options:

```javascript
{
    /**
     * URL which handles the data
     */
    uploadUrl: 'upload_attachment.php',

    /**
     * Name of the POST field where the file will be sent.
     * Defaults to 'file'.
     */
    uploadFieldName: 'file',

    /**
     * Name of the field from the response where the file can be downloaded.
     * Defaults to 'filename'
     */
    downloadFieldName: 'file',

    // List of allowed MIME types
    allowedTypes: [
        'image/jpeg',
        'image/png',
        'image/jpg',
        'image/gif'
    ],

    /**
     * Will be inserted on a drop or paste event
     */
    progressText: '![Uploading file...]()',

    /**
     * When a file has successfully been uploaded the last inserted text
     * will be replaced by the urlText, the {filename} tag will be replaced
     * by the filename that has been returned by the server
     */
    urlText: "![file]({filename})",

    /**
     * Error message for default error handler
     */
    errorText: "Error uploading file",

    /**
     * Extra parameters which will be send as POST data when sending a file
     */
    extraParams: {},

    /**
     * Extra headers which will be send as POST data when sending a file
     */
    extraHeaders: {},

    /**
     * When a file is received by drag-drop or paste
     *
     * @param {Blob} file
     */
    onReceivedFile: function(file) {},

    /**
     * When a file has succesfully been uploaded
     *
     * @param {Object} response By default JSON data, or the result of customResponseParser if implemented
     */
    onUploadedFile: function(response) {},

    /**
     * Custom error handler. Runs after removing the placeholder text and before the alert().
     * Return false from this function to prevent the alert dialog.
     *
     * @return {Boolean} when false is returned it will prevent default error behavior
     */
    customErrorHandler: function() { return true; },

    /**
     * Custom upload handler, must return false to prevent default handler.
     * Can be used to send file via custom transport(like socket.io)
     *
     * @param {Blob} file
     * @return {Boolean} when false is returned it will prevent default upload behavior
     */
    customUploadHandler: function(file) { return true; }

    /**
     * Parse the response before passing it to onUploadedFile
     *
     * @param  {XMLHttpRequest} xhr XMLHttpRequest result
     * @return {Object} custom result
     */
    customReponseParser: function(xhr) {
        return false;
    },

    /**
     * HTTP method that is used to send data to the uploadUrl
     *
     * @type {String}
     */
    uploadMethod: 'POST',

    /**
     * Data processor after upload a file
     *
     * @param {Object} data JSON data returned from the server
     * @return {Object} modified object
     */
    dataProcessor: function(data) { return data; }
}
```

### jQuery

```javascript
$('textarea').inlineattach(options);
```

### CodeMirror

```javascript
var editor = CodeMirror.fromTextArea(document.getElementById("textarea_editor"));
inlineAttach.attachToCodeMirror(editor, options);
```

### AngularJS

Textarea

```html
<textarea
    inlineattach
    inlineattach-progress-text="Sending..."
    inlineattach-on-received-file="receivedFile"></textarea>
```

Controller

```javascript
function textAreaCtrl($scope) {
    $scope.receivedFile = function(file) {
        console.log('received file!', file);
    }
}
```

### Input field

```javascript
inlineAttach.attachToInput(document.getElementById('inputfield'), options);
```

## Handling image uploads

The Demo folder contains an example in PHP on how to handle uploads.

## Build

To build the project you need node, npm and grunt installed. These tools can be installed on Ubuntu as follows:

Follow the Node.js guide: [Node.js installation](https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager)

Go to the project folder and run the following:

```sh
npm install
grunt
```

This should build the project and the files will appear in the `dist/` folder

## Changelog

[See Github releases](https://github.com/Rovak/InlineAttachment/releases)
