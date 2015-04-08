/**
 * Created by i061485 on 7/10/14.
 */

define([], function defineIframeRenderer() {

    /**
     * Define IframeRenderer
     * @class IframeRenderer
     * @extends LabelRenderer
     * @constructor
     */
    var IframeRenderer = function IframeRenderer() {

    };

    return IframeRenderer.extend('IframeRenderer', {

        /**
         * Render iframe
         * @memberOf IframeRenderer
         * @param {string} src
         * @param {object} [opts]
         * @returns {*|jQuery}
         */
        renderIframe: function renderIframe(src, opts) {

            opts = opts || {};

            var iframe = '<iframe webkitAllowFullScreen mozallowfullscreen allowfullscreen />',
                attrs = {
                    src: src,
                    frameborder: 0,
                    width: '100%',
                    height: '100%',
                    scrolling: 'no',
                    allowtransparency: true
                };

            $.extend(attrs, opts);

            /**
             * Define $iframe
             * @type {*|jQuery}
             */
            var $iframe = $(iframe).attr(attrs)

            this.checkVisibility(
                $iframe,
                this.base.defineBoolean(opts.visible, true, true)
            );

            return $iframe;
        }
    });
});