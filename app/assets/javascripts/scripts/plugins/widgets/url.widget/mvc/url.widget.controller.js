/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin.controller',
    'plugins/widgets/widget.content.controller'
], function defineUrlWidgetController(PluginBase, WidgetContentController) {

    /**
     * Define UrlWidget controller
     * @class UrlWidgetController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var UrlWidgetController = function UrlWidgetController() {
    };

    return UrlWidgetController.extend('UrlWidgetController', {

        /**
         * Set embedded content
         * @memberOf UrlWidgetController
         */
        setEmbeddedContent: function setEmbeddedContent() {

            // Get prefs
            var url = this.model.getPrefs('urlwidgetUrlResource'),
                isIframe = this.model.getPrefs('urlwidgetShowInIframe');

            this.view.get$item().renderEmbeddedContent(
                url, isIframe
            );
        },

        /**
         * Add UrlWidget rule
         * @memberOf UrlWidgetController
         * @param e
         */
        addUrlWidgetRule: function addUrlWidgetRule(e) {

            /**
             * Define $button
             * @type {*|jQuery|HTMLElement}
             */
            var $button = $(e.target);

            /**
             * Get scope
             * @type {UrlWidget|{name: string}}
             */
            var scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.publishRule,
                [$button.attr('value'), scope.name]
            );
        }

    }, PluginBase.prototype, WidgetContentController.prototype);
});
