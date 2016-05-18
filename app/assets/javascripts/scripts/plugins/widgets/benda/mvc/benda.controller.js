/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin.controller',
    'plugins/widgets/widget.content.controller'
], function defineBendaController(PluginBase, WidgetContentController) {

    /**
     * Define Benda controller
     * @class BendaController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var BendaController = function BendaController() {
    };

    return BendaController.extend('BendaController', {

        /**
         * Set embedded content
         * @memberOf BendaController
         */
        setEmbeddedContent: function setEmbeddedContent() {
            this.view.get$item().renderEmbeddedContent();
        },

        /**
         * Add Benda rule
         * @memberOf BendaController
         * @param e
         */
        addBendaRule: function addBendaRule(e) {

            /**
             * Define $button
             * @type {*|jQuery|HTMLElement}
             */
            var $button = $(e.target);

            /**
             * Get scope
             * @type {Benda|{name: string}}
             */
            var scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.publishRule,
                [$button.attr('value'), scope.name]
            );
        }

    }, PluginBase.prototype, WidgetContentController.prototype);
});
