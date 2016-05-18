/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin.controller',
    'plugins/widgets/widget.content.controller'
], function definePavelController(PluginBase, WidgetContentController) {

    /**
     * Define Pavel controller
     * @class PavelController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var PavelController = function PavelController() {
    };

    return PavelController.extend('PavelController', {

        /**
         * Set embedded content
         * @memberOf PavelController
         */
        setEmbeddedContent: function setEmbeddedContent() {
            this.view.get$item().renderEmbeddedContent();
        },

        /**
         * Add Pavel rule
         * @memberOf PavelController
         * @param e
         */
        addPavelRule: function addPavelRule(e) {

            /**
             * Define $button
             * @type {*|jQuery|HTMLElement}
             */
            var $button = $(e.target);

            /**
             * Get scope
             * @type {Pavel|{name: string}}
             */
            var scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.publishRule,
                [$button.attr('value'), scope.name]
            );
        }

    }, PluginBase.prototype, WidgetContentController.prototype);
});
