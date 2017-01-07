function update(target, selector) {
    var uri = 'http://bgacb.github.io/' + target + '.html';

    jQuery.get(uri, function(data) {
        var time, desc, flyer, offset;

        offset = moment().tz('America/New_York').subtract(2, 'hours');
        data = data.replace(/^.*<body[^>]*>|<\/body>.*$/g, '');

        jQuery('<div>' + data + '</div>').find(selector).each(function() {
            var current = moment.tz(
                jQuery(this).find('time').attr('datetime'),
                'America/New_York'
            );

            if (offset < current) {
                time = current;
                desc = jQuery(this).find('.desc');
                flyer = jQuery(this).find('.flyer');
                return false;
            }
        });

        if (time && desc) {
            jQuery('#' + target + ' .title').append(
                ' ' + time.format('dddd, MMMM D, YYYY').replace(/\s/g, '&nbsp;')
            );

            jQuery('#' + target + ' .desc').prepend(
                time.format('h:mm A').replace(' ', '&nbsp;') + ', ' +
                desc.html() + '<br>'
            );

            if (flyer) {
                jQuery('#' + target).prepend(flyer);
            }
        } else {
            jQuery('#' + target).hide();
        }
    });
}
