/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element'
], function defineMetaUaElement(PluginElement) {

    /**
     * Define MetaUa Element
     * @param view
     * @param opts
     * @returns {MetaUaElement}
     * @constructor
     * @class MetaUaElement
     * @extends PluginElement
     */
    var MetaUaElement = function MetaUaElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('meta.ua', {resource: '/widgets'});

        return this;
    };

    return MetaUaElement.extend('MetaUaElement', {

        /**
         * Render Embedded content
         * @memberOf MetaUaElement
         * @param {string} url
         */
        renderEmbeddedContent: function renderEmbeddedContent(url) {
            this.$.append(
                this.renderIframe(url)
            );
        }

    }, PluginElement.prototype);

});
