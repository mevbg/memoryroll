# jQuery MemoryRoll Plugin v1.0.0

Smart sequence loop starting from a random number.

## Description

This is a little jQuery plugin which when first called generates a random number in the given range, saves it in the localStorage with the name given and returns the value generated. Every subsequent call the plugin reads the saved number and returns the next one in the range. After doing this, the plugin saves the new value. If the number in the localStorage is the upper range limit it loops around and returns the first number in the range.

## Getting Started

You can [download the plugin as an archive][zip].

[zip]: https://github.com/martinmethod/memoryroll/zipball/master

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

Copyright © 2015 Martin Metodiev. Licensed under the MIT license. [See here for more details.][licence]

[licence]: https://raw.github.com/martinmethod/memoryroll/master/LICENSE-MIT