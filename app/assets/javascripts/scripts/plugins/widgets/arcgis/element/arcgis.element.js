/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element'
], function defineArcgisElement(PluginElement) {

    /**
     * Define Arcgis Element
     * @param view
     * @param opts
     * @returns {ArcgisElement}
     * @constructor
     * @class ArcgisElement
     * @extends PluginElement
     */
    var ArcgisElement = function ArcgisElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('arcgis', {resource: '/widgets'});

        return this;
    };

    return ArcgisElement.extend('ArcgisElement', {

        /**
         * Render Embedded content
         * @memberOf ArcgisElement
         * @param {string} html
         */
        renderEmbeddedContent: function renderEmbeddedContent(html) {

            this.$.append(
                this.renderIframe(
                    $(html).attr('src')
                )
            );
        }

    }, PluginElement.prototype);
});
