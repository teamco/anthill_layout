/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element'
], function defineJsFiddleElement(PluginElement) {

    /**
     * Define JsFiddle Element
     * @param view
     * @param opts
     * @returns {JsFiddleElement}
     * @constructor
     * @class JsFiddleElement
     * @extends PluginElement
     */
    var JsFiddleElement = function JsFiddleElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('js.fiddle', {resource: '/widgets'});

        return this;
    };

    return JsFiddleElement.extend('JsFiddleElement', {

        /**
         * Render Embedded content
         * @memberOf JsFiddleElement
         * @param {string} url
         */
        renderEmbeddedContent: function renderEmbeddedContent(url) {
            this.$.append(
                this.renderIframe(url)
            );
        }

    }, PluginElement.prototype);

});
