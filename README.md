Inline Attachment 0.2
=====================

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
    ]
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

## Authors

* Roy van Kaathoven