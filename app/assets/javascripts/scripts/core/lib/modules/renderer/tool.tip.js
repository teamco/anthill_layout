/**
 * Created by i061485 on 7/10/14.
 */

define([], function defineToolTipRenderer(){

    /**
     * Define ToolTipRenderer
     * @class ToolTipRenderer
     * @constructor
     */
    var ToolTipRenderer = function ToolTipRenderer(){

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
         *      $container: *|jQuery,
         *      title: string,
         *      [description]: string,
         *      [imageUrl]: string,
         *      [imageFloat]: string
         * }} opts
         * @returns {*|jQuery}
         */
        renderTooltip: function renderTooltip(opts) {

            var $title = $('<h2 />').text(opts.title),
                $description = $('<p />').html(opts.description),
                $image;

            if (opts.imageUrl) {

                $image = $('<img />').attr({
                    src: opts.imageUrl,
                    alt: opts.title
                }).css({
                    cssFloat: opts.imageFloat || 'none'
                });
            }

            var $tooltip = $('<div />').append([
                $title,
                $image,
                $description
            ]).addClass('tooltip');

            if (!opts.$container) {
                return $tooltip;
            }

            opts.$container.$.off('mouseenter.hover').on('mouseenter.hover', function on() {

                opts.$container.$.append(
                    $tooltip.stop().
                        fadeTo('slow', 0.9)
                ).attr({
                        title: ''
                    });

                opts.$container.$.on('mousemove.gallery', function (e) {

                    /**
                     * Define top
                     * @type {number}
                     */
                    var topL = e.pageY - $tooltip.height() - 20,
                        topM = e.pageY + 20;

                    /**
                     * Define left
                     * @type {number}
                     */
                    var leftL = e.pageX - 100,
                        leftM = e.pageX;

                    $tooltip.offset({
                        top: topL < 0 ? topM : topL,
                        left: leftL < 0 ? leftM : leftL
                    });
                });
            });

            opts.$container.$.off('mouseleave.hover').on('mouseleave.hover', function on() {

                $tooltip.remove();

                opts.$container.$.off('mousemove.gallery').attr({
                    title: opts.title
                });
            });
        }
    });
});