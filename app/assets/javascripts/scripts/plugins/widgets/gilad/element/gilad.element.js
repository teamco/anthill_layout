/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element'
], function defineGiladElement(PluginElement) {

    /**
     * Define Gilad Element
     * @param view
     * @param opts
     * @returns {GiladElement}
     * @constructor
     * @class GiladElement
     * @extends PluginElement
     */
    var GiladElement = function GiladElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('gilad', {resource: '/widgets'});

        return this;
    };

    return GiladElement.extend('GiladElement', {

        /**
         * Render Embedded content
         * @memberOf GiladElement
         */
        renderEmbeddedContent: function renderEmbeddedContent() {
            // TODO
        }

    }, PluginElement.prototype);
});
