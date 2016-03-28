/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element'
], function defineBigmirNetElement(PluginElement) {

    /**
     * Define BigmirNet Element
     * @param view
     * @param opts
     * @returns {BigmirNetElement}
     * @constructor
     * @class BigmirNetElement
     * @extends PluginElement
     */
    var BigmirNetElement = function BigmirNetElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('bigmir.net', {resource: '/widgets'});

        return this;
    };

    return BigmirNetElement.extend('BigmirNetElement', {

        /**
         * Render Embedded content
         * @memberOf BigmirNetElement
         * @param {string} url
         */
        renderEmbeddedContent: function renderEmbeddedContent(url) {
            this.$.append(
                this.renderIframe(url)
            );
        }

    }, PluginElement.prototype);

});
