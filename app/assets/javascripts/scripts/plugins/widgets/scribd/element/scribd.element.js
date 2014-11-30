/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element'
], function defineScribdElement(BaseElement) {

    /**
     * Define Scribd Element
     * @param view
     * @param opts
     * @returns {ScribdElement}
     * @constructor
     * @class ScribdElement
     * @extends BaseElement
     */
    var ScribdElement = function ScribdElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('scribd', {resource: '/widgets'});

        return this;
    };

    return ScribdElement.extend('ScribdElement', {

        /**
         * Render Embedded content
         * @member ScribdElement
         * @param {{id, src}} embed
         */
        renderEmbeddedContent: function renderEmbeddedContent(embed) {

            if (!embed) {
                return false;
            }

            this.$.append(
                this.renderIframe(embed.src, {
                    id: embed.id,
                    'class': embed['class'],
                    'data-auto-height': embed['data-auto-height'],
                    'data-aspect-ratio': embed['data-aspect-ratio']
                })
            );
        }

    }, BaseElement.prototype);

});
