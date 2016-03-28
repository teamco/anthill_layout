/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element'
], function defineTimeToastElement(PluginElement) {

    /**
     * Define TimeToast Element
     * @param view
     * @param opts
     * @returns {TimeToastElement}
     * @constructor
     * @class TimeToastElement
     * @extends PluginElement
     */
    var TimeToastElement = function TimeToastElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('time.toast', {resource: '/widgets'});

        return this;
    };

    return TimeToastElement.extend('TimeToastElement', {

        /**
         * Render Embedded content
         * @memberOf TimeToastElement
         * @param {string} embed
         */
        renderEmbeddedContent: function renderEmbeddedContent(embed) {
            this.$.append(
                this.renderObject(embed)
            );
        }

    }, PluginElement.prototype);

});
