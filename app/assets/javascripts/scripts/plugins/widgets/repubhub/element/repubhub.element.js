/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element'
], function defineRepubhubElement(PluginElement) {

    /**
     * Define Repubhub Element
     * @param view
     * @param opts
     * @returns {RepubhubElement}
     * @constructor
     * @class RepubhubElement
     * @extends PluginElement
     */
    var RepubhubElement = function RepubhubElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('repubhub', {resource: '/widgets'});

        return this;
    };

    return RepubhubElement.extend('RepubhubElement', {

        /**
         * Render Embedded content
         * @memberOf RepubhubElement
         * @param {string} embed
         */
        renderEmbeddedContent: function renderEmbeddedContent(embed) {
            this.addContent(embed);
        }

    }, PluginElement.prototype);
});
