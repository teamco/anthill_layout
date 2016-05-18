/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin.controller',
    'plugins/widgets/widget.content.controller'
], function defineParticipantsController(PluginBase, WidgetContentController) {

    /**
     * Define Participants controller
     * @class ParticipantsController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var ParticipantsController = function ParticipantsController() {
    };

    return ParticipantsController.extend('ParticipantsController', {

        /**
         * Set embedded content
         * @memberOf ParticipantsController
         */
        setEmbeddedContent: function setEmbeddedContent() {
            this.view.get$item().renderEmbeddedContent();
        },

        /**
         * Add Participants rule
         * @memberOf ParticipantsController
         * @param e
         */
        addParticipantsRule: function addParticipantsRule(e) {

            /**
             * Define $button
             * @type {*|jQuery|HTMLElement}
             */
            var $button = $(e.target);

            /**
             * Get scope
             * @type {Participants|{name: string}}
             */
            var scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.publishRule,
                [$button.attr('value'), scope.name]
            );
        }

    }, PluginBase.prototype, WidgetContentController.prototype);
});
