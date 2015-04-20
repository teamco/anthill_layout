//= require jquery
//= require jquery_ujs

(function () {

    $(document).ready(function () {

        var $panel = $('section.panel');

        $('body.admin .menu').on('click.menu', function () {
            $panel.addClass('activated');
        });

        $('body.admin .content').on('click.hide', function () {
            $panel.removeClass('activated');
        });
    });
})();