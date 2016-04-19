/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element'
], function defineMetamorphicElement(PluginElement) {

    /**
     * Define Metamorphic Element
     * @param view
     * @param opts
     * @returns {MetamorphicElement}
     * @constructor
     * @class MetamorphicElement
     * @extends PluginElement
     */
    var MetamorphicElement = function MetamorphicElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('metamorphic', {resource: '/widgets'});

        return this;
    };

    return MetamorphicElement.extend('MetamorphicElement', {

        /**
         * Render Embedded content
         * @memberOf MetamorphicElement
         */
        renderEmbeddedContent: function renderEmbeddedContent() {
            // TODO
        }

    }, PluginElement.prototype);
});
