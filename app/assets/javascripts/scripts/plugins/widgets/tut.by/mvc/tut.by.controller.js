/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin.controller',
    'plugins/widgets/widget.content.controller'
], function defineTutByController(PluginBase, WidgetContentController) {

    /**
     * Define TutBy controller
     * @class TutByController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var TutByController = function TutByController() {
    };

    return TutByController.extend('TutByController', {

        /**
         * Set embedded content
         * @memberOf TutByController
         */
        setEmbeddedContent: function setEmbeddedContent() {
            this.view.get$item().renderEmbeddedContent(
                this.model.getPrefs('tutbyEmbedCode')
            );
        },

        /**
         * Add TutBy rule
         * @memberOf TutByController
         * @param e
         */
        addTutByRule: function addTutByRule(e) {

            /**
             * Define $button
             * @type {*|jQuery|HTMLElement}
             */
            var $button = $(e.target);

            /**
             * Get scope
             * @type {TutBy|{name: string}}
             */
            var scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.publishRule,
                [$button.attr('value'), scope.name]
            );
        }

    }, PluginBase.prototype, WidgetContentController.prototype);
});
