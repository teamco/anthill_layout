/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element'
], function defineFunnyOrDieElement(PluginElement) {

    /**
     * Define FunnyOrDie Element
     * @param view
     * @param opts
     * @returns {FunnyOrDieElement}
     * @constructor
     * @class FunnyOrDieElement
     * @extends PluginElement
     */
    var FunnyOrDieElement = function FunnyOrDieElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('funny.or.die', {resource: '/widgets'});

        return this;
    };

    return FunnyOrDieElement.extend('FunnyOrDieElement', {

        /**
         * Render Embedded content
         * @memberOf FunnyOrDieElement
         * @param {string} url
         */
        renderEmbeddedContent: function renderEmbeddedContent(url) {
            this.$.append(
                this.renderIframe(url)
            );
        }

    }, PluginElement.prototype);

});
