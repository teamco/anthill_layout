/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element'
], function defineLivestreamElement(BaseElement) {

    /**
     * Define Livestream Element
     * @param view
     * @param opts
     * @returns {LivestreamElement}
     * @constructor
     * @class LivestreamElement
     * @extends BaseElement
     */
    var LivestreamElement = function LivestreamElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('livestream', {resource: '/widgets'});

        return this;
    };

    return LivestreamElement.extend('LivestreamElement', {

        /**
         * Render Embedded content
         * @member LivestreamElement
         * @param {string} url
         */
        renderEmbeddedContent: function renderEmbeddedContent(url) {
            this.$.append(
                this.renderIframe(url)
            );
        }

    }, BaseElement.prototype);

});
