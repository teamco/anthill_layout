/**
 * Created by teamco on 7/10/14.
 */

define(function defineToolTipRenderer() {

    /**
     * Define ToolTipRenderer
     * @class ToolTipRenderer
     * @constructor
     */
    var ToolTipRenderer = function ToolTipRenderer() {
    };

    return ToolTipRenderer.extend('ToolTipRenderer', {

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

            var $selector = opts.selector;

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
        }
    });
});