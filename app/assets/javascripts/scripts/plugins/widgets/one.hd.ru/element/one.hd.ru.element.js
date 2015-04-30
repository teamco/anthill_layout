/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element'
], function defineOneHdRuElement(BaseElement) {

    /**
     * Define OneHdRu Element
     * @param view
     * @param opts
     * @returns {OneHdRuElement}
     * @constructor
     * @class OneHdRuElement
     * @extends BaseElement
     */
    var OneHdRuElement = function OneHdRuElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('one.hd.ru', {resource: '/widgets'});

        return this;
    };

    return OneHdRuElement.extend('OneHdRuElement', {

        /**
         * Render Embedded content
         * @memberOf OneHdRuElement
         * @param {string} embed
         */
        renderEmbeddedContent: function renderEmbeddedContent(embed) {
            this.$.append(
                this.renderObject(
                    embed.toHtml()
                )
            );
        }

    }, BaseElement.prototype);

});
