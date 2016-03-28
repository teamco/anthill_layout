/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element'
], function defineSlideShareElement(PluginElement) {

    /**
     * Define SlideShare Element
     * @param view
     * @param opts
     * @returns {SlideShareElement}
     * @constructor
     * @class SlideShareElement
     * @extends PluginElement
     */
    var SlideShareElement = function SlideShareElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('slide.share', {resource: '/widgets'});

        return this;
    };

    return SlideShareElement.extend('SlideShareElement', {

        /**
         * Render Embedded content
         * @memberOf SlideShareElement
         * @param {string} embed
         */
        renderEmbeddedContent: function renderEmbeddedContent(embed) {

            /**
             * Get embed code
             * @type {*|jQuery|HTMLElement}
             */
            var $embed = $(embed);

            if (!$embed[0]) {
                return false;
            }

            this.$.append(
                $('<iframe />').attr({
                    src: $embed[0].src,
                    frameborder: 0,
                    marginwidth: 0,
                    marginheight: 0,
                    scrolling: "no",
                    allowFullScreen: true
                })
            );
        }

    }, PluginElement.prototype);

});
