/**
 * Created by teamco on 7/10/14.
 */

define([], function defineToolTipRenderer() {

    /**
     * Define ToolTipRenderer
     * @class ToolTipRenderer
     * @constructor
     */
    var ToolTipRenderer = function ToolTipRenderer() {

    };

    return ToolTipRenderer.extend('ToolTipRenderer', {

        /**
         * Hide tooltip
         * @memberOf ToolTipRenderer
         */
        hideTooltip: function hideTooltip() {
            $('.tooltip').hide();
        },

        /**
         * Render tooltip
         * @memberOf ToolTipRenderer
         * @param {{
         *      selector: *,
         *      title: string,
         *      [description]: string,
         *      [imageUrl]: string,
         *      [imageFloat]: string,
         *      [container]: string
         * }} opts
         * @returns {*|jQuery}
         */
        renderTooltip: function renderTooltip(opts) {

            var $selector = opts.selector.$;

            var config = {
                html: true,
                selector: $selector[0],
                title: opts.title,
                container: opts.container || 'body',
                trigger: 'hover',
                placement: 'auto'
            };

            if (opts.description || opts.imageUrl) {

                config.content = '';

                if (opts.description) {
                    config.content += '<p>' + opts.description + '</p>';
                }

                if (opts.imageUrl) {

                    var $image = $('<img />').attr({
                        src: opts.imageUrl,
                        alt: opts.title
                    }).css({
                        cssFloat: opts.imageFloat || 'none'
                    });

                    config.content += $image[0];
                }

                $selector.attr({

                    'data-toggle': 'popover',
                    title: config.title

                }).popover(config);

            } else {

                $selector.tooltip(config);
            }

            //opts.$container.$.off('mouseenter.hover').on('mouseenter.hover', function on() {
            //
            //    opts.$container.$.append(
            //        $tooltip.stop().
            //            fadeTo('slow', 0.9)
            //    ).attr({
            //            title: ''
            //        });
            //
            //    opts.$container.$.on('mousemove.gallery', function (e) {
            //
            //        /**
            //         * Define top
            //         * @type {number}
            //         */
            //        var topL = e.pageY - $tooltip.height() - 20,
            //            topM = e.pageY + 20;
            //
            //        /**
            //         * Define left
            //         * @type {number}
            //         */
            //        var leftL = e.pageX - 100,
            //            leftM = e.pageX;
            //
            //        $tooltip.offset({
            //            top: topL < 0 ? topM : topL,
            //            left: leftL < 0 ? leftM : leftL
            //        });
            //    });
            //});

            //opts.$container.$.off('mouseleave.hover').on('mouseleave.hover', function on() {
            //
            //    $tooltip.remove();
            //
            //    opts.$container.$.off('mousemove.gallery').attr({
            //        title: opts.title
            //    });
            //});
        }
    });
});