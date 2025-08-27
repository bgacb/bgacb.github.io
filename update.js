function update(target, selector) {
    const uri = 'http://bgacb.github.io/' + target + '.html';

    fetch(uri).then(response => response.text()).then(text => {
        let element, time, desc, flyer;

        const offset = new Date();
        offset.setHours(offset.getHours() - 2);

        const parser = new DOMParser();
        const html = parser.parseFromString(text, 'text/html');

        for (element of html.querySelectorAll(selector)) {
            time = element.querySelector('time').getAttribute('datetime');
            time = new Date(
                time + (time.match(/(Z|[+-]\d\d:?\d\d)$/) ? '' : 'Z')
            );

            const est = new Date(time.toLocaleString('en-US', {
                timeZone: 'America/New_York'
            }));

            const utc = new Date(time.toLocaleString('en-US', {
                timeZone: 'UTC'
            }));

            time = new Date(time.getTime() + utc.getTime() - est.getTime());

            if (offset < time) {
                desc = element.querySelector('.desc');
                flyer = element.querySelector('.flyer');
                break;
            }
        }

        element = document.getElementById(target);

        if (time && desc) {
            element.querySelector('.title').append(
                ' ' + time.toLocaleString('en-US', {
                    dateStyle: 'full',
                    timeZone: 'America/New_York'
                }).replace(/\s/g, '\xa0')
            );

            element.querySelector('.desc').prepend(
                time.toLocaleString('en-US', {
                    timeStyle: 'short',
                    timeZone: 'America/New_York'
                }).replace(/\s/g, '\xa0') + ', ',
                ...desc.childNodes,
                document.createElement('br')
            );

            if (flyer) {
                element.prepend(flyer);
            }
        } else {
            element.style.display = 'none';
        }
    });
}
