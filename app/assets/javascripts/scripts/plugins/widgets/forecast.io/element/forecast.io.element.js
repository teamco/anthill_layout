/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element'
], function defineForecastIoElement(PluginElement) {

    /**
     * Define ForecastIo Element
     * @param view
     * @param opts
     * @returns {ForecastIoElement}
     * @constructor
     * @class ForecastIoElement
     * @extends PluginElement
     */
    var ForecastIoElement = function ForecastIoElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('forecast.io', {resource: '/widgets'});

        return this;
    };

    return ForecastIoElement.extend('ForecastIoElement', {

        /**
         * Render Embedded content
         * @memberOf ForecastIoElement
         * @param {string} embed
         */
        renderEmbeddedContent: function renderEmbeddedContent(embed) {
            this.addContent(
                this.renderIframe(
                    $(embed).attr('src')
                )
            );
        }

    }, PluginElement.prototype);
});
