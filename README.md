# jQuery MemoryRoll Plugin

Smart sequence loop starting from a random number.

[![Built with Grunt](https://cdn.gruntjs.com/builtwith.svg)](https://gruntjs.com/) [![GitHub license](https://img.shields.io/badge/license-MIT-yellow.svg)](https://raw.githubusercontent.com/martinmethod/memoryroll/prod/LICENSE-MIT) [![Travis](https://img.shields.io/travis/martinmethod/memoryroll.svg)](https://travis-ci.org/martinmethod/memoryroll) [![David](https://img.shields.io/david/dev/martinmethod/memoryroll.svg)](https://david-dm.org/martinmethod/memoryroll?type=dev) [![GitHub release](https://img.shields.io/github/release/martinmethod/memoryroll.svg)](https://github.com/martinmethod/memoryroll/releases/latest) [![npm](https://img.shields.io/npm/v/memoryroll.svg)](https://www.npmjs.com/package/memoryroll) [![Bower](https://img.shields.io/bower/v/memoryroll.svg)](https://github.com/martinmethod/memoryroll)

## Description

This is a little jQuery plugin which when first called generates a random number in the given range, saves it in the localStorage with the name given and returns the value generated. Every subsequent call the plugin reads the saved number and returns the next one in the range. After doing this, the plugin saves the new value. If the number in the localStorage is the upper range limit it loops around and returns the first number in the range.

## Demo

<a href="https://memoryroll.metodiev.dev" target="_blank">memoryroll.metodiev.dev</a>

## Getting Started

You can [download the plugin as an archive][zip].

[zip]: https://github.com/martinmethod/memoryroll/zipball/prod

Or you can grab it by using **npm**:

```javascript
npm install memoryroll
```

Or you can grab it by using **Bower**:

```javascript
bower install memoryroll
```

## Installation

Include the script after the jQuery library (unless you package scripts otherwise):

```html
<script src="/path/to/memoryroll.min.js"></script>
```

## Usage

``` javascript
var number = $.memoryroll({
    name      : 'demo', // required string
    rangeFrom :     1,  // required number
    rangeTo   :    10   // required number
});
```

## Browsers compatibility

- Apple Safari
- Google Chrome
- Microsoft Internet Explorer 9+
- Mozilla Firefox
- Opera

## Dependencies

- [jQuery][jq]

[jq]: https://github.com/jquery/jquery.git

## License

Copyright © 2017 Martin Metodiev. Licensed under the MIT license. [See here for more details.][licence]

[licence]: https://raw.github.com/martinmethod/memoryroll/prod/LICENSE-MIT
