/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element'
], function defineFreshTvElement(BaseElement) {

    /**
     * Define FreshTv Element
     * @param view
     * @param opts
     * @returns {FreshTvElement}
     * @constructor
     * @class FreshTvElement
     * @extends BaseElement
     */
    var FreshTvElement = function FreshTvElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('fresh.tv', {resource: '/widgets'});

        return this;
    };

    return FreshTvElement.extend('FreshTvElement', {

        /**
         * Render Embedded content
         * @member FreshTvElement
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
