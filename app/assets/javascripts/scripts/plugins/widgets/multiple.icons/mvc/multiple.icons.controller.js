/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin',
    'plugins/widgets/widget.content.controller'
], function defineMultipleIconsController(PluginBase, WidgetContentController) {

    /**
     * Define multipleicons controller
     * @class MultipleIconsController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var MultipleIconsController = function MultipleIconsController() {
    };

    return MultipleIconsController.extend('MultipleIconsController', {

        /**
         * Set embedded content
         * @member MultipleIconsController
         */
        setEmbeddedContent: function setEmbeddedContent() {

            this.view.elements.$multipleicons.renderEmbeddedContent();
        },

        /**
         * Add MultipleIcons rule
         * @member MultipleIconsController
         * @param e
         */
        addMultipleIconsRule: function addMultipleIconsRule(e) {

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