/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element'
], function defineInstagramElement(PluginElement) {

    /**
     * Define Instagram Element
     * @param view
     * @param opts
     * @returns {InstagramElement}
     * @constructor
     * @class InstagramElement
     * @extends PluginElement
     */
    var InstagramElement = function InstagramElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('instagram', {resource: '/widgets'});

        return this;
    };

    return InstagramElement.extend('InstagramElement', {

        /**
         * Render Embedded content
         * @memberOf InstagramElement
         * @param {string} embed
         */
        renderEmbeddedContent: function renderEmbeddedContent(embed) {

            if (_.isUndefined(embed)) {
                return false;
            }

            this.$.append(embed);
        }

    }, PluginElement.prototype);
});
