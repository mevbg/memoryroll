/*! 
 jQuery MemoryRoll Plugin v1.2.0
 http://memoryroll.martinmetodiev.com

 Copyright (c) 2017 Martin Metodiev
 Licensed under the MIT license.
*/

;(function($) {

  'use strict';

// Defining MemoryRoll
  $.memoryroll = function(options) {

    // Defining shortcut
    var mr = $.memoryroll;

    // Saving the given parameters
    mr.from = parseInt(options.rangeFrom);
    mr.to   = parseInt(options.rangeTo);

    // Defining variables
    var number,
      memory = localStorage;

    // Extending $.memoryroll (if not yet)
    if (!mr.extended) {
      $.extend(mr, {
        extended: true,

        validate: function() {
          mr.from = !isNaN(mr.from) && mr.from >= 0 ? mr.from : 0;
          mr.to   = !isNaN(mr.to)   && mr.to   >= mr.from ? mr.to : mr.from;
        },

        setNumber: function() {
          this.validate();

          // If no memory -> get random number in the range
          if (!memory['memoryroll_' + options.name]) {
            number = Math.floor(Math.random() * (mr.to - mr.from + 1) + mr.from);
          }

          // If memory -> get the next number related to the memory value
          else {
            number = parseInt(memory['memoryroll_' + options.name]);
            if (number === mr.to) { number = mr.from-1; }
            number++;
          }

          return number;
        }
      });
    }

    // Set a memory property
    memory.setItem('memoryroll_' + options.name, mr.setNumber());

    // Return the new number
    return memory['memoryroll_' + options.name];

  };

}(jQuery));