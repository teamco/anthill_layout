/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element'
], function defineAccuweatherVideosElement(PluginElement) {

    /**
     * Define AccuweatherVideos Element
     * @param view
     * @param opts
     * @returns {AccuweatherVideosElement}
     * @constructor
     * @class AccuweatherVideosElement
     * @extends PluginElement
     */
    var AccuweatherVideosElement = function AccuweatherVideosElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('accuweather.widget', {resource: '/widgets'});

        return this;
    };

    return AccuweatherVideosElement.extend('AccuweatherVideosElement', {

        /**
         * Render Embedded content
         * @memberOf AccuweatherVideosElement
         * @param {string} html
         */
        renderEmbeddedContent: function renderEmbeddedContent(html) {
            this.addContent(html);
        }

    }, PluginElement.prototype);
});