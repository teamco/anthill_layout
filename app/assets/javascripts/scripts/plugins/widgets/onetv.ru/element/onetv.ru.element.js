/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element'
], function defineOnetvRuElement(BaseElement) {

    /**
     * Define OnetvRu Element
     * @param view
     * @param opts
     * @returns {OnetvRuElement}
     * @constructor
     * @class OnetvRuElement
     * @extends BaseElement
     */
    var OnetvRuElement = function OnetvRuElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('onetv.ru', {resource: '/widgets'});

        return this;
    };

    return OnetvRuElement.extend('OnetvRuElement', {

        /**
         * Render Embedded content
         * @member OnetvRuElement
         * @param {string} url
         */
        renderEmbeddedContent: function renderEmbeddedContent(url) {
            this.$.append(
                this.renderIframe(url)
            );
        }

    }, BaseElement.prototype);

});
