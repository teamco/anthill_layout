/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin.controller',
    'plugins/widgets/widget.content.controller'
], function defineEmotionController(PluginBase, WidgetContentController) {

    /**
     * Define Emotion controller
     * @class EmotionController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var EmotionController = function EmotionController() {
    };

    return EmotionController.extend('EmotionController', {

        /**
         * Set embedded content
         * @memberOf EmotionController
         */
        setEmbeddedContent: function setEmbeddedContent() {
            this.view.get$item().renderEmbeddedContent();
        },

        /**
         * Add Emotion rule
         * @memberOf EmotionController
         * @param e
         */
        addEmotionRule: function addEmotionRule(e) {

            /**
             * Define $button
             * @type {*|jQuery|HTMLElement}
             */
            var $button = $(e.target);

            /**
             * Get scope
             * @type {Emotion|{name: string}}
             */
            var scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.publishRule,
                [$button.attr('value'), scope.name]
            );
        }

    }, PluginBase.prototype, WidgetContentController.prototype);
});
