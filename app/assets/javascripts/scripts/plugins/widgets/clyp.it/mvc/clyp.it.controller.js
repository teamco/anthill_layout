/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin.controller',
    'plugins/widgets/widget.content.controller'
], function defineClypItController(PluginBase, WidgetContentController) {

    /**
     * Define ClypIt controller
     * @class ClypItController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var ClypItController = function ClypItController() {
    };

    return ClypItController.extend('ClypItController', {

        /**
         * Set embedded content
         * @memberOf ClypItController
         */
        setEmbeddedContent: function setEmbeddedContent() {
            this.view.get$item().renderEmbeddedContent(
                this.model.getPrefs('clypitEmbedCode')
            );
        },

        /**
         * Add ClypIt rule
         * @memberOf ClypItController
         * @param e
         */
        addClypItRule: function addClypItRule(e) {

            /**
             * Define $button
             * @type {*|jQuery|HTMLElement}
             */
            var $button = $(e.target);

            /**
             * Get scope
             * @type {ClypIt|{name: string}}
             */
            var scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.publishRule,
                [$button.attr('value'), scope.name]
            );
        }

    }, PluginBase.prototype, WidgetContentController.prototype);
});
