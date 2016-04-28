/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element'
], function defineIframelyElement(PluginElement) {

    /**
     * Define Iframely Element
     * @param view
     * @param opts
     * @returns {IframelyElement}
     * @constructor
     * @class IframelyElement
     * @extends PluginElement
     */
    var IframelyElement = function IframelyElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('iframely', {resource: '/widgets'});

        return this;
    };

    return IframelyElement.extend('IframelyElement', {

        /**
         * Render Embedded content
         * @memberOf IframelyElement
         */
        renderEmbeddedContent: function renderEmbeddedContent() {
            // TODO
        }

    }, PluginElement.prototype);
});
