/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element'
], function definePastebinElement(BaseElement) {

    /**
     * Define Pastebin Element
     * @param view
     * @param opts
     * @returns {PastebinElement}
     * @constructor
     * @class PastebinElement
     * @extends BaseElement
     */
    var PastebinElement = function PastebinElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('pastebin', {resource: '/widgets'});

        return this;
    };

    return PastebinElement.extend('PastebinElement', {

        /**
         * Render Embedded content
         * @member PastebinElement
         * @param {string} url
         */
        renderEmbeddedContent: function renderEmbeddedContent(url) {
            this.$.append(
                this.renderIframe(url)
            );
        }

    }, BaseElement.prototype);

});
