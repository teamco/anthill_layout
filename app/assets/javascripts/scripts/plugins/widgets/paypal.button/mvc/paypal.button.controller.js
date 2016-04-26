/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin.controller',
    'plugins/widgets/widget.content.controller'
], function definePaypalButtonController(PluginBase, WidgetContentController) {

    /**
     * Define PaypalButton controller
     * @class PaypalButtonController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var PaypalButtonController = function PaypalButtonController() {
    };

    return PaypalButtonController.extend('PaypalButtonController', {

        /**
         * Set embedded content
         * @memberOf PaypalButtonController
         */
        setEmbeddedContent: function setEmbeddedContent() {
            this.view.get$item().renderEmbeddedContent();
        },

        /**
         * Add PaypalButton rule
         * @memberOf PaypalButtonController
         * @param e
         */
        addPaypalButtonRule: function addPaypalButtonRule(e) {

            /**
             * Define $button
             * @type {*|jQuery|HTMLElement}
             */
            var $button = $(e.target);

            /**
             * Get scope
             * @type {PaypalButton|{name: string}}
             */
            var scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.publishRule,
                [$button.attr('value'), scope.name]
            );
        }

    }, PluginBase.prototype, WidgetContentController.prototype);
});
