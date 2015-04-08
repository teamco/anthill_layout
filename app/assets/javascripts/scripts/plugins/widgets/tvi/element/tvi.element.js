/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element'
], function defineTviElement(BaseElement) {

    /**
     * Define Tvi Element
     * @param view
     * @param opts
     * @returns {TviElement}
     * @constructor
     * @class TviElement
     * @extends BaseElement
     */
    var TviElement = function TviElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('tvi', {resource: '/widgets'});

        return this;
    };

    return TviElement.extend('TviElement', {

        /**
         * Render Embedded content
         * @memberOf TviElement
         * @param {string} url
         */
        renderEmbeddedContent: function renderEmbeddedContent(url) {
            this.$.append(
                this.renderIframe(url)
            );
        }

    }, BaseElement.prototype);

});
