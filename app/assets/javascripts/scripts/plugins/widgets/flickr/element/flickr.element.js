/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element'
], function defineFlickrElement(PluginElement) {

    /**
     * Define Flickr Element
     * @param view
     * @param opts
     * @returns {FlickrElement}
     * @constructor
     * @class FlickrElement
     * @extends PluginElement
     */
    var FlickrElement = function FlickrElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('flickr', {resource: '/widgets'});

        return this;
    };

    return FlickrElement.extend('FlickrElement', {

        /**
         * Render Embedded content
         * @memberOf FlickrElement
         * @param {string} embed
         */
        renderEmbeddedContent: function renderEmbeddedContent(embed) {

            /**
             * Define $iframe
             * @type {*|jQuery|HTMLElement}
             */
            var $embed = $(embed);

            if ($embed.length === 0) {
                return false;
            }

            this.$.append(
                $('<iframe />').attr({
                    src: $embed[0].src,
                    frameborder: 0,
                    allowfullscreen: ''
                })
            );
        }

    }, PluginElement.prototype);

});
