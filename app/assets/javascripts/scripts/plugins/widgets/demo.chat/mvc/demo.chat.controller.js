/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin.controller',
    'plugins/widgets/widget.content.controller'
], function defineDemoChatController(PluginBase, WidgetContentController) {

    /**
     * Define DemoChat controller
     * @class DemoChatController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var DemoChatController = function DemoChatController() {
    };

    return DemoChatController.extend('DemoChatController', {

        /**
         * Set embedded content
         * @memberOf DemoChatController
         */
        setEmbeddedContent: function setEmbeddedContent() {
            this.view.get$item().renderEmbeddedContent();
        },

        /**
         * Add DemoChat rule
         * @memberOf DemoChatController
         * @param e
         */
        addDemoChatRule: function addDemoChatRule(e) {

            /**
             * Define $button
             * @type {*|jQuery|HTMLElement}
             */
            var $button = $(e.target);

            /**
             * Get scope
             * @type {DemoChat|{name: string}}
             */
            var scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.publishRule,
                [$button.attr('value'), scope.name]
            );
        }

    }, PluginBase.prototype, WidgetContentController.prototype);
});
