/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element'
], function definePasteryElement(PluginElement) {

    /**
     * Define Pastery Element
     * @param view
     * @param opts
     * @returns {PasteryElement}
     * @constructor
     * @class PasteryElement
     * @extends PluginElement
     */
    var PasteryElement = function PasteryElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('pastery', {resource: '/widgets'});

        return this;
    };

    return PasteryElement.extend('PasteryElement', {

        /**
         * Render Embedded content
         * @memberOf PasteryElement
         * @param {string} embed
         */
        renderEmbeddedContent: function renderEmbeddedContent(embed) {
            this.addContent(embed);
        }

    }, PluginElement.prototype);
});
