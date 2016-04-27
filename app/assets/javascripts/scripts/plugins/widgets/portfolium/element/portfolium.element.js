/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element'
], function definePortfoliumElement(PluginElement) {

    /**
     * Define Portfolium Element
     * @param view
     * @param opts
     * @returns {PortfoliumElement}
     * @constructor
     * @class PortfoliumElement
     * @extends PluginElement
     */
    var PortfoliumElement = function PortfoliumElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('portfolium', {resource: '/widgets'});

        return this;
    };

    return PortfoliumElement.extend('PortfoliumElement', {

        /**
         * Render Embedded content
         * @memberOf PortfoliumElement
         * @param {string} embed
         */
        renderEmbeddedContent: function renderEmbeddedContent(embed) {
            this.addContent(embed);
        }

    }, PluginElement.prototype);
});
