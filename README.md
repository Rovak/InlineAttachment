# Inline Attachment 1.1.1 [![Master Branch Build Status](https://api.travis-ci.org/Rovak/InlineAttachment.png?branch=master)](http://travis-ci.org/Rovak/InlineAttachment) ![project status](http://stillmaintained.com/Rovak/InlineAttachment.png)

Adds upload functionality to a textarea or CodeMirror instance by either drag-dropping or pasting (only in chrome) an image inside it.

It mimics the comment system on issues which is used on Github.

![demo](https://f.cloud.github.com/assets/21/678/248aac6a-40a2-11e2-9a76-fd59ded28bbe.gif)

## Download

The most recent minified versions can be found [here](http://data.razko.nl/projects/inlineattachment/remotes/origin/HEAD/)

## Usage

__Configuration__

All versions can be configured using the following options:

```javascript
{
    // URL which handles the data
    uploadUrl: 'upload_attachment.php',

    // Name of the POST field where the file will be sent. Defaults to 'file'.
    uploadFieldName: 'file',

    // Name of the field from the response where the file can be downloaded. Defaults to 'filename'
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
     * When a file is received by drag-drop or paste
     *
     * @param {Blob} file
     */
    onReceivedFile: function(file) {},

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

__Handling image uploads__

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

### 1.1.1 (22-02-2013)

* Fixed paste, drag & drop and CodeMirror events in Firefox

### 1.1.0 (05-01-2013)

* Changed options parameters, upload_url to uploadUrl and allowed_types to allowedTypes.
* Added `onReceivedFile` and `onUploadedFile` hooks.
* Changed the way different editors are handled.
* The markdown syntax can now be replaced by changing the `progressText` and `urlText` options.

### 1.0.0 (30-12-2012)

* Markdown, jQuery, Codemirror and standard Textarea support.

## Authors

* Roy van Kaathoven
