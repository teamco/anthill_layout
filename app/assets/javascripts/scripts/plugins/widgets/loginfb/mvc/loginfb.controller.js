/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin',
    'plugins/widgets/widget.content.controller'
], function defineLoginfbController(PluginBase, WidgetContentController) {

    /**
     * Define loginfb controller
     * @class LoginfbController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var LoginfbController = function LoginfbController() {
    };

    return LoginfbController.extend('LoginfbController', {

        /**
         * Set embedded content
         * @member LoginfbController
         */
        setEmbeddedContent: function setEmbeddedContent() {

            this.view.elements.$loginfb.renderEmbeddedContent();
        },

        /**
         * Add Loginfb rule
         * @member LoginfbController
         * @param e
         */
        addLoginfbRule: function addLoginfbRule(e) {

            /**
             * Define $button
             * @type {*|jQuery|HTMLElement}
             */
            var $button = $(e.target),
                scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.publishRule,
                [$button.attr('value'), this.scope.constructor.name]
            );
        }

    }, PluginBase.prototype, WidgetContentController.prototype);
});