/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element'
], function defineVideoPayNetElement(BaseElement) {

    /**
     * Define VideoPayNet Element
     * @param view
     * @param opts
     * @returns {VideoPayNetElement}
     * @constructor
     * @class VideoPayNetElement
     * @extends BaseElement
     */
    var VideoPayNetElement = function VideoPayNetElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('video.pay.net', {resource: '/widgets'});

        return this;
    };

    return VideoPayNetElement.extend('VideoPayNetElement', {

        /**
         * Render Embedded content
         * @memberOf VideoPayNetElement
         * @param {string} url
         */
        renderEmbeddedContent: function renderEmbeddedContent(url) {

            this.$.append(
                this.renderIframe(url)
            );
        }

    }, BaseElement.prototype);

});
