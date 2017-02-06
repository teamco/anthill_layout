/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin.controller',
    'plugins/widgets/widget.content.controller'
], function defineSapOpenuiController(PluginBase, WidgetContentController) {

    /**
     * Define SapOpenui controller
     * @class SapOpenuiController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var SapOpenuiController = function SapOpenuiController() {
    };

    return SapOpenuiController.extend('SapOpenuiController', {

        /**
         * Set embedded content
         * @memberOf SapOpenuiController
         */
        setEmbeddedContent: function setEmbeddedContent() {
            this.view.get$item().renderEmbeddedContent();
        },

        /**
         * Add SapOpenui rule
         * @memberOf SapOpenuiController
         * @param {Event} e
         */
        addSapOpenuiRule: function addSapOpenuiRule(e) {

            /**
             * Define $button
             * @type {*|jQuery|HTMLElement}
             */
            var $button = $(e.target);

            /**
             * Get scope
             * @type {SapOpenui|{name: string}}
             */
            var scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.publishRule,
                [$button.attr('value'), scope.name]
            );
        }

    }, PluginBase.prototype, WidgetContentController.prototype);
});
