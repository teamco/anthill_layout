/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element'
], function defineTwentyFourLiveElement(BaseElement) {

    /**
     * Define TwentyFourLive Element
     * @param view
     * @param opts
     * @returns {TwentyFourLiveElement}
     * @constructor
     * @class TwentyFourLiveElement
     * @extends BaseElement
     */
    var TwentyFourLiveElement = function TwentyFourLiveElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('twenty.four.live', {resource: '/widgets'});

        return this;
    };

    return TwentyFourLiveElement.extend('TwentyFourLiveElement', {

        /**
         * Render Embedded content
         * @member TwentyFourLiveElement
         * @param {string} url
         */
        renderEmbeddedContent: function renderEmbeddedContent(url) {
            this.$.append(
                this.renderIframe(url, {
                    id: "ytplayer",
                    type: "text/html"
                })
            );
        }

    }, BaseElement.prototype);

});
