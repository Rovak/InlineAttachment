# Inline Attachment 3.0.0 [![Master Branch Build Status](https://api.travis-ci.org/Rovak/InlineAttachment.png?branch=master)](http://travis-ci.org/Rovak/InlineAttachment)

Adds upload functionality to a textarea instance by either drag-dropping or pasting (only in chrome) an image inside it.

It's similar to pasting images in Github.

![demo](https://f.cloud.github.com/assets/21/678/248aac6a-40a2-11e2-9a76-fd59ded28bbe.gif)

## Supported

* Input and textarea
* jQuery
* CodeMirror 3
* CodeMirror 4
* Angular 1

## Getting started

The latest versions are available [here](https://github.com/Rovak/InlineAttachment/tree/master/dist)

**Bower**

The package can be installed using [Bower](http://bower.io)

```
bower install inline-attachment
```

**NPM**

The package can be installed using [NPM](https://www.npmjs.com)

```
npm install inlineattachment
```

## Documentation

Documentation can be found on [ReadTheDocs](http://inlineattachment.readthedocs.org/en/latest/)

## Handling image uploads

The Demo folder contains an example in PHP on how to handle uploads.

## Build

To build the project you need node, npm and gulp installed. These tools can be installed on Ubuntu as follows:

Follow the Node.js guide: [Node.js installation](https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager)

Go to the project folder and run the following:

```sh
npm install
npm build
```

This should build the project and the files will appear in the `dist/` folder

## Changelog

[See Github releases](https://github.com/Rovak/InlineAttachment/releases)
