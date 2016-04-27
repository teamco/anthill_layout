/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin.controller',
    'plugins/widgets/widget.content.controller'
], function defineEdocrController(PluginBase, WidgetContentController) {

    /**
     * Define Edocr controller
     * @class EdocrController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var EdocrController = function EdocrController() {
    };

    return EdocrController.extend('EdocrController', {

        /**
         * Set embedded content
         * @memberOf EdocrController
         */
        setEmbeddedContent: function setEmbeddedContent() {
            this.view.get$item().renderEmbeddedContent(
                this.model.getPrefs('edocrEmbedCode')
            );
        },

        /**
         * Add Edocr rule
         * @memberOf EdocrController
         * @param e
         */
        addEdocrRule: function addEdocrRule(e) {

            /**
             * Define $button
             * @type {*|jQuery|HTMLElement}
             */
            var $button = $(e.target);

            /**
             * Get scope
             * @type {Edocr|{name: string}}
             */
            var scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.publishRule,
                [$button.attr('value'), scope.name]
            );
        }

    }, PluginBase.prototype, WidgetContentController.prototype);
});
