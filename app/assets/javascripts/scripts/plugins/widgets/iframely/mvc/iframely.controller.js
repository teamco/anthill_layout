/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin.controller',
    'plugins/widgets/widget.content.controller'
], function defineIframelyController(PluginBase, WidgetContentController) {

    /**
     * Define Iframely controller
     * @class IframelyController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var IframelyController = function IframelyController() {
    };

    return IframelyController.extend('IframelyController', {

        /**
         * Set embedded content
         * @memberOf IframelyController
         */
        setEmbeddedContent: function setEmbeddedContent() {
            this.view.get$item().renderEmbeddedContent(
                this.model.getPrefs('iframelyApiKey'),
                this.model.getPrefs('iframelyUrl')
            );
        },

        /**
         * Add Iframely rule
         * @memberOf IframelyController
         * @param e
         */
        addIframelyRule: function addIframelyRule(e) {

            /**
             * Define $button
             * @type {*|jQuery|HTMLElement}
             */
            var $button = $(e.target);

            /**
             * Get scope
             * @type {Iframely|{name: string}}
             */
            var scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.publishRule,
                [$button.attr('value'), scope.name]
            );
        }

    }, PluginBase.prototype, WidgetContentController.prototype);
});
