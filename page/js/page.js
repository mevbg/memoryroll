//
// Page scripts
// --------------------------------------------------


//== DOM Ready
// -------------------------

jQuery(document).ready(function() {
    
    $.ajax({
        url: '../README.md',
        context: document.body,
        success: function(mdText) {
            var converter = new showdown.Converter();
            var htmlText = $('<div class="markdown" />').append(converter.makeHtml(mdText));

            // Define DOM elements
            var dom = $.extend({}, {
                title: htmlText.find('h1'),
                slogan: htmlText.find('h1').next('p'),
                description: (function() {
                    var descriptionTitle = htmlText.find('#description'),
                        descriptionText  = htmlText.find('#description').next('p'),
                        description = $('<div class="description" />')
                            .append(descriptionTitle)
                            .append(descriptionText);

                    return description;
                }()),
                license: (function() {
                    var license = htmlText.find('#license').next('p');
                    license.find('a').attr('target', '_blank');
                    htmlText.find('#license').remove();
                    return license;
                }()),
                content: htmlText
            });

            // Remove #demo
            htmlText.find('#demo').next('p').remove();
            htmlText.find('#demo').remove();

            // Reorder DOM structure
            dom.slogan.addClass('description').appendTo('.page-header .wrp-main');
            dom.title.prependTo('.page-header .ttl');
            dom.license.addClass('license').appendTo('.page-footer .wrp-main');
            dom.description.appendTo('.col-description');
            dom.content.appendTo('.page-section article .col-docs');

            Prism.highlightAll();
        }
    });
    
});
//
// Demo scripts
// --------------------------------------------------


//== DOM Ready
// -------------------------

jQuery(document).ready(function() {

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
          to = (storage.memoryroll_demo_to  ) ? storage.memoryroll_demo_to   : 10;

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