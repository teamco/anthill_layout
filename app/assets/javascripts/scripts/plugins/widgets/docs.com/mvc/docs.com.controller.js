/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin.controller',
    'plugins/widgets/widget.content.controller'
], function defineDocsComController(PluginBase, WidgetContentController) {

    /**
     * Define DocsCom controller
     * @class DocsComController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var DocsComController = function DocsComController() {
    };

    return DocsComController.extend('DocsComController', {

        /**
         * Set embedded content
         * @memberOf DocsComController
         */
        setEmbeddedContent: function setEmbeddedContent() {
            this.view.get$item().renderEmbeddedContent(
                this.model.getPrefs('docscomEmbedCode')
            );
        },

        /**
         * Add DocsCom rule
         * @memberOf DocsComController
         * @param e
         */
        addDocsComRule: function addDocsComRule(e) {

            /**
             * Define $button
             * @type {*|jQuery|HTMLElement}
             */
            var $button = $(e.target);

            /**
             * Get scope
             * @type {DocsCom|{name: string}}
             */
            var scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.publishRule,
                [$button.attr('value'), scope.name]
            );
        }

    }, PluginBase.prototype, WidgetContentController.prototype);
});
