/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element'
], function definePhotobucketElement(PluginElement) {

    /**
     * Define Photobucket Element
     * @param view
     * @param opts
     * @returns {PhotobucketElement}
     * @constructor
     * @class PhotobucketElement
     * @extends PluginElement
     */
    var PhotobucketElement = function PhotobucketElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('photobucket', {resource: '/widgets'});

        return this;
    };

    return PhotobucketElement.extend('PhotobucketElement', {

        /**
         * Render Embedded content
         * @memberOf PhotobucketElement
         * @param {string} embed
         */
        renderEmbeddedContent: function renderEmbeddedContent(embed) {
            this.$.append(embed);
        }

    }, PluginElement.prototype);

});
