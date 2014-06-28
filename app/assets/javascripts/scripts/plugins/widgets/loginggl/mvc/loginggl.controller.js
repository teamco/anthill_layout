/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin',
    'plugins/widgets/widget.content.controller'
], function defineLogingglController(PluginBase, WidgetContentController) {

    /**
     * Define loginggl controller
     * @class LogingglController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var LogingglController = function LogingglController() {
    };

    return LogingglController.extend('LogingglController', {

        /**
         * Set embedded content
         * @member LogingglController
         */
        setEmbeddedContent: function setEmbeddedContent() {

            this.view.elements.$loginggl.renderEmbeddedContent();
        },

        /**
         * Add Loginggl rule
         * @member LogingglController
         * @param e
         */
        addLogingglRule: function addLogingglRule(e) {

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