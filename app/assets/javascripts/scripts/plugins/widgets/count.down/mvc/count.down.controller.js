/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin.controller',
    'plugins/widgets/widget.content.controller'
], function defineCountDownController(PluginBase, WidgetContentController) {

    /**
     * Define CountDown controller
     * @class CountDownController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var CountDownController = function CountDownController() {
    };

    return CountDownController.extend('CountDownController', {

        /**
         * Set embedded content
         * @memberOf CountDownController
         */
        setEmbeddedContent: function setEmbeddedContent() {
            this.view.get$item().renderEmbeddedContent();
        },

        /**
         * Add CountDown rule
         * @memberOf CountDownController
         * @param e
         */
        addCountDownRule: function addCountDownRule(e) {

            /**
             * Define $button
             * @type {*|jQuery|HTMLElement}
             */
            var $button = $(e.target);

            /**
             * Get scope
             * @type {CountDown|{name: string}}
             */
            var scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.publishRule,
                [$button.attr('value'), scope.name]
            );
        }

    }, PluginBase.prototype, WidgetContentController.prototype);
});
