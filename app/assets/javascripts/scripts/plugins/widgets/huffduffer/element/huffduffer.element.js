/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element'
], function defineHuffdufferElement(PluginElement) {

    /**
     * Define Huffduffer Element
     * @param view
     * @param opts
     * @returns {HuffdufferElement}
     * @constructor
     * @class HuffdufferElement
     * @extends PluginElement
     */
    var HuffdufferElement = function HuffdufferElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('huffduffer', {resource: '/widgets'});

        return this;
    };

    return HuffdufferElement.extend('HuffdufferElement', {

        /**
         * Render Embedded content
         * @memberOf HuffdufferElement
         * @param {string} embed
         */
        renderEmbeddedContent: function renderEmbeddedContent(embed) {
            this.addContent(embed);
        }

    }, PluginElement.prototype);
});
