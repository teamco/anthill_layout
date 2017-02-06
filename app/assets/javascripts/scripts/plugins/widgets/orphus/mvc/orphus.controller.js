/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin.controller',
    'plugins/widgets/widget.content.controller'
], function defineOrphusController(PluginBase, WidgetContentController) {

    /**
     * Define Orphus controller
     * @class OrphusController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var OrphusController = function OrphusController() {
    };

    return OrphusController.extend('OrphusController', {

        /**
         * Set embedded content
         * @memberOf OrphusController
         */
        setEmbeddedContent: function setEmbeddedContent() {
            this.view.get$item().renderEmbeddedContent(
                this.model.getPrefs('orphusMainScript')
            );
        },

        /**
         * Add Orphus rule
         * @memberOf OrphusController
         * @param {Event} e
         */
        addOrphusRule: function addOrphusRule(e) {

            /**
             * Define $button
             * @type {*|jQuery|HTMLElement}
             */
            var $button = $(e.target);

            /**
             * Get scope
             * @type {Orphus|{name: string}}
             */
            var scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.publishRule,
                [$button.attr('value'), scope.name]
            );
        }

    }, PluginBase.prototype, WidgetContentController.prototype);
});
