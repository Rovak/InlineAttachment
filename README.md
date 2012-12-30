# Inline Attachment 1.0 [![Master Branch Build Status](https://api.travis-ci.org/Rovak/InlineAttachment.png?branch=master)](http://travis-ci.org/Rovak/InlineAttachment)

Adds upload functionality to a textarea or CodeMirror instance by either drag-dropping or pasting (only in chrome) an image inside it.

It mimics the comment system on issues which is used on Github.

![demo](https://f.cloud.github.com/assets/21/678/248aac6a-40a2-11e2-9a76-fd59ded28bbe.gif)

## Usage

__Configuration__

All versions can be configured using the following options:

```javascript
{
    // URL which handles the data
    upload_url: 'upload_attachment.php',

    // List of allowed MIME types
    allowed_types: [
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
     * When a file is recieved by drag-drop or paste
     *
     * @param {Blob} file
     */
    onRecievedFile: function(file) {},

    /**
     * When a file has succesfully been uploaded
     *
     * @param {Object} json JSON data returned from the server
     */
    onUploadedFile: function(json) {}
}
```

__jQuery__

```javascript
$('textarea').inlineattach(options);
```

__CodeMirror__

```javascript
var editor = CodeMirror.fromTextArea(document.getElementById("textarea_editor"),);
inlineAttach.attachToCodeMirror(editor, options);
```

__Input field__

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

## Notes

The current version is still work in progress and has only been tested on the latest Chrome and only offers markdown syntax.
Future versions will support the latest browsers and the ability to change the syntax.

## Changelog

### 1.1

* Changed options parameters, upload_url to uploadUrl and allowed_types to allowedTypes.
* Added `onRecievedFile` and `onUploadedFile` hooks.
* Changed the way different editors are handled.
* The markdown syntax can now be replaced by changing the `progressText` and `urlText` options.

### 1.0.0 (30-12-2012)

* Markdown, jQuery, Codemirror and standard Textarea support.

## Authors

* Roy van Kaathoven