/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element'
], function defineUbrElement(BaseElement) {

    /**
     * Define Ubr Element
     * @param view
     * @param opts
     * @returns {UbrElement}
     * @constructor
     * @class UbrElement
     * @extends BaseElement
     */
    var UbrElement = function UbrElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('ubr', {resource: '/widgets'});

        return this;
    };

    return UbrElement.extend('UbrElement', {

        /**
         * Render Embedded content
         * @memberOf UbrElement
         * @param {string} url
         */
        renderEmbeddedContent: function renderEmbeddedContent(url) {
            this.$.append(
                this.renderIframe(url)
            );
        }

    }, BaseElement.prototype);

});
