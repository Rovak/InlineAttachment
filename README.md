jQuery Inline Text Attachment 0.1
=================================

Adds upload functionality to a textarea by either drag-dropping or pasting (only in chrome) an image inside it.

It mimics the comment system on issues which is used on Github.

![demo](https://f.cloud.github.com/assets/21/678/248aac6a-40a2-11e2-9a76-fd59ded28bbe.gif)

## Usage

__jQuery__

```javascript
$('textarea').inlineattach({
    upload_url: 'upload_attachment.php' // The url which handles the uploads
});
```

__CodeMirror__

```javascript
var editor = CodeMirror.fromTextArea(document.getElementById("textarea_editor"),);
inlineAttach.attachToCodeMirror(editor, { 
    // Options
});
```

__Input field__

```javascript
inlineAttach.attachToInput(document.getElementById('inputfield'), {
    // Options
});
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