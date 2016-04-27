/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin.controller',
    'plugins/widgets/widget.content.controller'
], function definePasteryController(PluginBase, WidgetContentController) {

    /**
     * Define Pastery controller
     * @class PasteryController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var PasteryController = function PasteryController() {
    };

    return PasteryController.extend('PasteryController', {

        /**
         * Set embedded content
         * @memberOf PasteryController
         */
        setEmbeddedContent: function setEmbeddedContent() {
            this.view.get$item().renderEmbeddedContent(
                this.model.getPrefs('pasteryEmbedCode')
            );
        },

        /**
         * Add Pastery rule
         * @memberOf PasteryController
         * @param e
         */
        addPasteryRule: function addPasteryRule(e) {

            /**
             * Define $button
             * @type {*|jQuery|HTMLElement}
             */
            var $button = $(e.target);

            /**
             * Get scope
             * @type {Pastery|{name: string}}
             */
            var scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.publishRule,
                [$button.attr('value'), scope.name]
            );
        }

    }, PluginBase.prototype, WidgetContentController.prototype);
});
