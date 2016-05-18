/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin.controller',
    'plugins/widgets/widget.content.controller'
], function defineSapirController(PluginBase, WidgetContentController) {

    /**
     * Define Sapir controller
     * @class SapirController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var SapirController = function SapirController() {
    };

    return SapirController.extend('SapirController', {

        /**
         * Set embedded content
         * @memberOf SapirController
         */
        setEmbeddedContent: function setEmbeddedContent() {
            this.view.get$item().renderEmbeddedContent();
        },

        /**
         * Add Sapir rule
         * @memberOf SapirController
         * @param e
         */
        addSapirRule: function addSapirRule(e) {

            /**
             * Define $button
             * @type {*|jQuery|HTMLElement}
             */
            var $button = $(e.target);

            /**
             * Get scope
             * @type {Sapir|{name: string}}
             */
            var scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.publishRule,
                [$button.attr('value'), scope.name]
            );
        }

    }, PluginBase.prototype, WidgetContentController.prototype);
});
