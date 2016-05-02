/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element'
], function defineSkypeElement(PluginElement) {

    /**
     * Define Skype Element
     * @param view
     * @param opts
     * @returns {SkypeElement}
     * @constructor
     * @class SkypeElement
     * @extends PluginElement
     */
    var SkypeElement = function SkypeElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('skype', {resource: '/widgets'});

        return this;
    };

    return SkypeElement.extend('SkypeElement', {

        /**
         * Render Embedded content
         * @memberOf SkypeElement
         */
        renderEmbeddedContent: function renderEmbeddedContent() {
            // TODO
        }

    }, PluginElement.prototype);
});
