/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element'
], function defineUrlWidgetElement(PluginElement) {

    /**
     * Define UrlWidget Element
     * @param view
     * @param opts
     * @returns {UrlWidgetElement}
     * @constructor
     * @class UrlWidgetElement
     * @extends PluginElement
     */
    var UrlWidgetElement = function UrlWidgetElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('url.widget', {resource: '/widgets'});

        return this;
    };

    return UrlWidgetElement.extend('UrlWidgetElement', {

        /**
         * Render Embedded content
         * @memberOf UrlWidgetElement
         * @param {string} url
         * @param {boolean} isIframe
         */
        renderEmbeddedContent: function renderEmbeddedContent(url, isIframe) {

            if (isIframe) {

                this.$.append(
                    this.renderIframe(url, {scrolling: 'yes'})
                );

                return false;
            }

            require(['lib/packages/readability'], function _loadReader(){

                var loc = new window.URL(url);
                var uri = {
                    spec: loc.href,
                    host: loc.host,
                    prePath: loc.protocol + "//" + loc.host,
                    scheme: loc.protocol.substr(0, loc.protocol.indexOf(":")),
                    pathBase: loc.protocol + "//" + loc.host + loc.pathname.substr(0, loc.pathname.lastIndexOf("/") + 1)
                };
                var article = new Readability(uri, document.cloneNode(true)).parse();
                debugger
            });
        }

    }, PluginElement.prototype);

});
