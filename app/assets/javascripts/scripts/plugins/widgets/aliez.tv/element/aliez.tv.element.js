/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element'
], function defineAliezTvElement(PluginElement) {

    /**
     * Define AliezTv Element
     * @param view
     * @param opts
     * @returns {AliezTvElement}
     * @constructor
     * @class AliezTvElement
     * @extends PluginElement
     */
    var AliezTvElement = function AliezTvElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('aliez.tv', {resource: '/widgets'});

        return this;
    };

    return AliezTvElement.extend('AliezTvElement', {

        /**
         * Render Embedded content
         * @memberOf AliezTvElement
         * @type {string}
         */
        renderEmbeddedContent: function renderEmbeddedContent(iframe) {
            this.$.append(
                this.renderIframe(
                    $(iframe).attr('src')
                )
            );
        }

    }, PluginElement.prototype);
});
