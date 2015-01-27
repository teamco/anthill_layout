/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin',
    'plugins/widgets/widget.content.controller'
], function defineEmptyController(PluginBase, WidgetContentController) {

    /**
     * Define Empty controller
     * @class EmptyController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var EmptyController = function EmptyController() {
    };

    return EmptyController.extend('EmptyController', {

        /**
         * Set embedded content
         * @member EmptyController
         */
        setEmbeddedContent: function setEmbeddedContent() {

            this.view.elements.$empty.renderEmbeddedContent();
        },

        /**
         * Add Empty rule
         * @member EmptyController
         * @param e
         */
        addEmptyRule: function addEmptyRule(e) {

            /**
             * Define $button
             * @type {*|jQuery|HTMLElement}
             */
            var $button = $(e.target),
                scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.publishRule,
                [$button.attr('value'), this.scope.constructor.prototype.name]
            );
        }

    }, PluginBase.prototype, WidgetContentController.prototype);
});