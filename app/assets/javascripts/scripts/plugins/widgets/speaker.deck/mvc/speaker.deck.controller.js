/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin.controller',
    'plugins/widgets/widget.content.controller'
], function defineSpeakerDeckController(PluginBase, WidgetContentController) {

    /**
     * Define SpeakerDeck controller
     * @class SpeakerDeckController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var SpeakerDeckController = function SpeakerDeckController() {
    };

    return SpeakerDeckController.extend('SpeakerDeckController', {

        /**
         * Set embedded content
         * @memberOf SpeakerDeckController
         */
        setEmbeddedContent: function setEmbeddedContent() {
            this.view.get$item().renderEmbeddedContent(
                this.model.getPrefs('speakerdeckEmbedCode')
            );
        },

        /**
         * Add SpeakerDeck rule
         * @memberOf SpeakerDeckController
         * @param e
         */
        addSpeakerDeckRule: function addSpeakerDeckRule(e) {

            /**
             * Define $button
             * @type {*|jQuery|HTMLElement}
             */
            var $button = $(e.target);

            /**
             * Get scope
             * @type {SpeakerDeck|{name: string}}
             */
            var scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.publishRule,
                [$button.attr('value'), scope.name]
            );
        }

    }, PluginBase.prototype, WidgetContentController.prototype);
});
