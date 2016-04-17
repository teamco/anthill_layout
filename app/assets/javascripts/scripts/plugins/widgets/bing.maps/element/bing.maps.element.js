/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element'
], function defineBingMapsElement(PluginElement) {

    /**
     * Define BingMaps Element
     * @param view
     * @param opts
     * @returns {BingMapsElement}
     * @constructor
     * @class BingMapsElement
     * @extends PluginElement
     */
    var BingMapsElement = function BingMapsElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('bing.maps', {resource: '/widgets'});

        return this;
    };

    return BingMapsElement.extend('BingMapsElement', {

        /**
         * Render Embedded content
         * @memberOf BingMapsElement
         * @param {string} key
         * @param {string} location
         * @param {number} zoom
         * @param {string} type
         */
        renderEmbeddedContent: function renderEmbeddedContent(key, location, zoom, type) {

            if (!key || !location) {
                return false;
            }

            /**
             * Get scope
             * @type {BingMaps}
             */
            var scope = this.view.scope;

            /**
             * Get $element
             * @type {BingMapsElement}
             */
            var $element = this;

            // Get center location
            var center = location.split(',');

            require(['async!http://www.bing.com/api/maps/mapcontrol'], function _loadBing(){

                var map = new Microsoft.Maps.Map($element.$[0], {
                    credentials: key,
                    center: new Microsoft.Maps.Location(center[0], center[1]),
                    mapTypeId: Microsoft.Maps.MapTypeId[type.toLowerCase()],
                    zoom: zoom
                });

                scope.logger.debug('Map loaded', map);
            });
        }

    }, PluginElement.prototype);
});
