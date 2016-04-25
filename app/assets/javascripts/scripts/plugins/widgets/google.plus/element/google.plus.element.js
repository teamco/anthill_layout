/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element'
], function defineGooglePlusElement(PluginElement) {

    /**
     * Define GooglePlus Element
     * @param view
     * @param opts
     * @returns {GooglePlusElement}
     * @constructor
     * @class GooglePlusElement
     * @extends PluginElement
     */
    var GooglePlusElement = function GooglePlusElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('google.plus', {resource: '/widgets'});

        return this;
    };

    return GooglePlusElement.extend('GooglePlusElement', {

        /**
         * Render Embedded content
         * @memberOf GooglePlusElement
         * @param {string} api
         * @param {string} url
         */
        renderEmbeddedContent: function renderEmbeddedContent(api, url) {

            this.empty();

            var $element = this;

            require([api], function _defineGooglePlusApi() {

                // Render embedded post
                // https://developers.google.com/+/web/embedded-post/
                gapi.post.render($element.id, {href: url});
            });
        }

    }, PluginElement.prototype);

});
