/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element'
], function defineHereMapsForLifeElement(PluginElement) {

    /**
     * Define HereMapsForLife Element
     * @param view
     * @param opts
     * @returns {HereMapsForLifeElement}
     * @constructor
     * @class HereMapsForLifeElement
     * @extends PluginElement
     */
    var HereMapsForLifeElement = function HereMapsForLifeElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('here.maps.for.life', {resource: '/widgets'});

        return this;
    };

    return HereMapsForLifeElement.extend('HereMapsForLifeElement', {

        /**
         * Render Embedded content
         * @memberOf HereMapsForLifeElement
         */
        renderEmbeddedContent: function renderEmbeddedContent() {
            // TODO
        }

    }, PluginElement.prototype);
});
