jQuery Inline Text Attachment 0.1
=================================

Adds upload functionality to a textarea by either drag-dropping or pasting (only in chrome) an image inside it.

It mimics the functionality which is already available on Github.

![demo](https://f.cloud.github.com/assets/21/678/248aac6a-40a2-11e2-9a76-fd59ded28bbe.gif)

## Usage

```javascript
$('textarea').inlineattach({
    upload_url: 'upload_attachment.php' // The url which handles the uploads
});
```

## Building

The source can be build with Grunt, you can follow the [install grunt](https://github.com/gruntjs/grunt/tree/0.3-stable#installing-grunt) to
setup the Grunt tool.

When Grunt is up-and-running go to the project folder and use `grunt` to build.

## Notes

The current version is still work in progress and has only been tested on the latest Chrome and only offers markdown syntax. 
Future versions will support the latest browsers and the ability to change the syntax.

## Authors

* Roy van Kaathoven