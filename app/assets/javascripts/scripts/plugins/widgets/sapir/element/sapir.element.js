/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element'
], function defineSapirElement(PluginElement) {

    /**
     * Define Sapir Element
     * @param view
     * @param opts
     * @returns {SapirElement}
     * @constructor
     * @class SapirElement
     * @extends PluginElement
     */
    var SapirElement = function SapirElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('sapir', {resource: '/widgets'});

        return this;
    };

    return SapirElement.extend('SapirElement', {

        /**
         * Render Embedded content
         * @memberOf SapirElement
         */
        renderEmbeddedContent: function renderEmbeddedContent() {
            // TODO
        }

    }, PluginElement.prototype);
});
