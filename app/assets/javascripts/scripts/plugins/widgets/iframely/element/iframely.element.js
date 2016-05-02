/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element'
], function defineIframelyElement(PluginElement) {

    /**
     * Define Iframely Element
     * @param view
     * @param opts
     * @returns {IframelyElement}
     * @constructor
     * @class IframelyElement
     * @extends PluginElement
     */
    var IframelyElement = function IframelyElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('iframely', {resource: '/widgets'});

        return this;
    };

    return IframelyElement.extend('IframelyElement', {

        /**
         * Render Embedded content
         * @memberOf IframelyElement
         * @para, {string} api
         * @para, {string} url
         */
        renderEmbeddedContent: function renderEmbeddedContent(api, url) {

            /**
             * Get element
             * @type {IframelyElement}
             */
            var $element = this;

            /**
             * Get scope
             * @type {Iframely}
             */
            var scope = $element.view.scope;

            if (!api) {

                scope.logger.warn('Undefined API Key', arguments);
                return false;
            }


            $.get(
                '/widget/fetch_embedded_content/?url=' + encodeURIComponent(url) + '&api_key=' + api,

                /**
                 * Define iframely API callback
                 * @param json
                 * @private
                 */
                function _getContent(json) {
                    $element.addContent(json.html);
                }
            );
        }

    }, PluginElement.prototype);
});
