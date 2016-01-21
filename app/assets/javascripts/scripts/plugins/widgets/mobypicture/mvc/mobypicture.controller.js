/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin',
    'plugins/widgets/widget.content.controller'
], function defineMobypictureController(PluginBase, WidgetContentController) {

    /**
     * Define mobypicture controller
     * @class MobypictureController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var MobypictureController = function MobypictureController() {
    };

    return MobypictureController.extend('MobypictureController', {

        /**
         * Set embedded content
         * @memberOf MobypictureController
         */
        setEmbeddedContent: function setEmbeddedContent() {
            this.view.elements.$mobypicture.renderEmbeddedContent(
                this.model.getPrefs('mobypictureEmbedCode')
            );
        },

        /**
         * Add Mobypicture rule
         * @memberOf MobypictureController
         * @param e
         */
        addMobypictureRule: function addMobypictureRule(e) {

            /**
             * Define $button
             * @type {*|jQuery|HTMLElement}
             */
            var $button = $(e.target),
                scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.publishRule,
                [$button.attr('value'), scope.name]
            );
        }

    }, PluginBase.prototype, WidgetContentController.prototype);
});
