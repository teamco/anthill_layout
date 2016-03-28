/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element'
], function defineMixbookElement(PluginElement) {

    /**
     * Define Mixbook Element
     * @param view
     * @param opts
     * @returns {MixbookElement}
     * @constructor
     * @class MixbookElement
     * @extends PluginElement
     */
    var MixbookElement = function MixbookElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('mixbook', {resource: '/widgets'});

        return this;
    };

    return MixbookElement.extend('MixbookElement', {

        /**
         * Render Embedded content
         * @memberOf MixbookElement
         * @param {string} embed
         */
        renderEmbeddedContent: function renderEmbeddedContent(embed) {
            this.$.append(
                this.renderObject(embed)
            );
        }

    }, PluginElement.prototype);

});
