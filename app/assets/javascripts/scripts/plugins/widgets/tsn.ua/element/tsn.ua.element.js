/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element'
], function defineTsnUaElement(PluginElement) {

    /**
     * Define TsnUa Element
     * @param view
     * @param opts
     * @returns {TsnUaElement}
     * @constructor
     * @class TsnUaElement
     * @extends PluginElement
     */
    var TsnUaElement = function TsnUaElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('tsn.ua', {resource: '/widgets'});

        return this;
    };

    return TsnUaElement.extend('TsnUaElement', {

        /**
         * Render Embedded content
         * @memberOf TsnUaElement
         * @param {string} embed
         */
        renderEmbeddedContent: function renderEmbeddedContent(embed) {
            this.$.append(
                this.renderEmbed(embed)
            );
        }

    }, PluginElement.prototype);

});
