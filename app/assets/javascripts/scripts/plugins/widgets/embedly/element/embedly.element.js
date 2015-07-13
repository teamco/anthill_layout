/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element'
], function defineEmbedlyElement(BaseElement) {

    /**
     * Define Embedly Element
     * @param view
     * @param opts
     * @returns {EmbedlyElement}
     * @constructor
     * @class EmbedlyElement
     * @extends BaseElement
     */
    var EmbedlyElement = function EmbedlyElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('embedly', {resource: '/widgets'});

        return this;
    };

    return EmbedlyElement.extend('EmbedlyElement', {

        /**
         * Render Embedded content
         * @memberOf EmbedlyElement
         */
        renderEmbeddedContent: function renderEmbeddedContent() {
            // TODO
        }

    }, BaseElement.prototype);

});
