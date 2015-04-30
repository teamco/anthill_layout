/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element'
], function definePremiereTvElement(BaseElement) {

    /**
     * Define PremiereTv Element
     * @param view
     * @param opts
     * @returns {PremiereTvElement}
     * @constructor
     * @class PremiereTvElement
     * @extends BaseElement
     */
    var PremiereTvElement = function PremiereTvElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('premiere.tv', {resource: '/widgets'});

        return this;
    };

    return PremiereTvElement.extend('PremiereTvElement', {

        /**
         * Render Embedded content
         * @memberOf PremiereTvElement
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
