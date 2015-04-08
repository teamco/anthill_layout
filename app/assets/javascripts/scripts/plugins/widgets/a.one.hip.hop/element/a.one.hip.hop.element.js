/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element'
], function defineAOneHipHopElement(BaseElement) {

    /**
     * Define AOneHipHop Element
     * @param view
     * @param opts
     * @returns {AOneHipHopElement}
     * @constructor
     * @class AOneHipHopElement
     * @extends BaseElement
     */
    var AOneHipHopElement = function AOneHipHopElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('a.one.hip.hop', {resource: '/widgets'});

        return this;
    };

    return AOneHipHopElement.extend('AOneHipHopElement', {

        /**
         * Render Embedded content
         * @memberOf AOneHipHopElement
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
