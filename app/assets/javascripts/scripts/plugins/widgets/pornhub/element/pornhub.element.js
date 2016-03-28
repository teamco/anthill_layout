/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element'
], function definePornhubElement(PluginElement) {

    /**
     * Define Pornhub Element
     * @param view
     * @param opts
     * @returns {PornhubElement}
     * @constructor
     * @class PornhubElement
     * @extends PluginElement
     */
    var PornhubElement = function PornhubElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('pornhub', {resource: '/widgets'});

        return this;
    };

    return PornhubElement.extend('PornhubElement', {

        /**
         * Render Embedded content
         * @memberOf PornhubElement
         * @param {string} url
         */
        renderEmbeddedContent: function renderEmbeddedContent(url) {
            this.$.append(
                this.renderIframe(url)
            );
        }

    }, PluginElement.prototype);

});
