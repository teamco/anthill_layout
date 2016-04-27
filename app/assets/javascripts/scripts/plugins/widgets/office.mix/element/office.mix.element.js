/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element'
], function defineOfficeMixElement(PluginElement) {

    /**
     * Define OfficeMix Element
     * @param view
     * @param opts
     * @returns {OfficeMixElement}
     * @constructor
     * @class OfficeMixElement
     * @extends PluginElement
     */
    var OfficeMixElement = function OfficeMixElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('office.mix', {resource: '/widgets'});

        return this;
    };

    return OfficeMixElement.extend('OfficeMixElement', {

        /**
         * Render Embedded content
         * @memberOf OfficeMixElement
         * @param {string} embed
         */
        renderEmbeddedContent: function renderEmbeddedContent(embed) {
            this.addContent(embed);
        }

    }, PluginElement.prototype);
});
