/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/element'
], function defineYoutubeElement(BaseElement) {

    /**
     * Define Youtube Element
     * @param view
     * @param opts
     * @returns {YoutubeElement}
     * @constructor
     * @class YoutubeElement
     * @extends BaseElement
     */
    var YoutubeElement = function YoutubeElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('youtube', {resource: '/widgets'});

        return this;
    };

    return YoutubeElement.extend({

        /**
         * Render Embedded content
         * @member YoutubeElement
         * @param {string} url
         */
        renderEmbeddedContent: function renderEmbeddedContent(url) {

            /**
             * Define embedded template
             * @type {string}
             */
            var iframe = '<iframe width="100%" height="100%" frameborder="0" allowfullscreen></iframe>';

            this.$.append(
                $(iframe).attr({
                    src: url
                })
            );
        }

    }, BaseElement.prototype);

});