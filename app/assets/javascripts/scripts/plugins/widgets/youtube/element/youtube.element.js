/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element'
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

    return YoutubeElement.extend('YoutubeElement', {

        /**
         * Render Embedded content
         * @member YoutubeElement
         * @param {string} iframe
         */
        renderEmbeddedContent: function renderEmbeddedContent(iframe) {
            this.$.append(iframe);
        }

    }, BaseElement.prototype);

});