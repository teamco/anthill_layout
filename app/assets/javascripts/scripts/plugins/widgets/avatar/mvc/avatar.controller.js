/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin',
    'plugins/widgets/widget.content.controller'
], function defineAvatarController(PluginBase, WidgetContentController) {

    /**
     * Define avatar controller
     * @class AvatarController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var AvatarController = function AvatarController() {
    };

    return AvatarController.extend('AvatarController', {

        /**
         * Set embedded content
         * @member AvatarController
         */
        setEmbeddedContent: function setEmbeddedContent() {

            this.view.elements.$avatar.renderEmbeddedContent();
        },

        /**
         * Add Avatar rule
         * @member AvatarController
         * @param e
         */
        addAvatarRule: function addAvatarRule(e) {

            /**
             * Define $button
             * @type {*|jQuery|HTMLElement}
             */
            var $button = $(e.target),
                scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.publishRule,
                [$button.attr('value'), this.scope.constructor.name]
            );
        }

    }, PluginBase.prototype, WidgetContentController.prototype);
});