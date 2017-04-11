// =========================| Demo scripts |========================= //



//--------------------------| DOM Ready

jQuery(document).ready(function($) {

  'use strict';

  $.ajax({
    url: 'assets/demo/demo.html',
    dataType: 'html'
  }).done(function(response) {
    $('.demo-holder .content').html(response).promise().done(function(){
      var storage = localStorage;

      if (storage.memoryroll_example) {
        $('#example .info').text('Press the "Generate" button for a new number!');
        $('.trigger').val('Generate');
        $('.reset').show();
        $('#example .result .ttl').text('Old result:');
        $('#example strong.result').text(storage.memoryroll_example);
        $('#example .range input').attr('disabled', 'disabled').addClass('disabled');
      }

      var from = (storage.memoryroll_demo_from) ? storage.memoryroll_demo_from :  1,
          to   = (storage.memoryroll_demo_to  ) ? storage.memoryroll_demo_to   : 10;

      $('#example .range .from input').val(from);
      $('#example .range .to   input').val(to);

      $('.trigger').click(function() {
        storage.setItem('memoryroll_demo_from', $('#example-range-from').val());
        storage.setItem('memoryroll_demo_to',   $('#example-range-to'  ).val());

        if (!$(this).is('.pressed')) {
          $('#example .range input').attr('disabled', 'disabled').addClass('disabled');

          var result = storage.memoryroll_example ?
              'New result:' : 'Result:';
          $('#example .result .ttl').text(result);

          var number = $.memoryroll({
              name      : $('#example').attr('id'),
              rangeFrom : storage.memoryroll_demo_from,
              rangeTo   : storage.memoryroll_demo_to
          });
          $('#example strong.result').text(number);

          $(this).addClass('pressed').val('Reload page');
          $('#example .info').text('A number was generated. Now reload the page!');

          $('.reset').show();
        }
        else { window.location = window.location; }
      });

      $('.reset').click(function() {
        $('#example .info').text('Choose a range and press the "Generate" button!');
        delete storage.memoryroll_demo_from;
        delete storage.memoryroll_demo_to;
        delete storage.memoryroll_example;
        $('#example .range input').removeAttr('disabled').removeClass('disabled');
        $('#example strong.result').text('');
        $('.trigger').removeClass('pressed').val('Generate');
        $('#example .result .ttl').text('');

        $(this).hide();
      });
    });
  });

});