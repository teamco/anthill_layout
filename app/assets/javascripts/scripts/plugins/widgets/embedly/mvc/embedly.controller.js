/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin',
    'plugins/widgets/widget.content.controller'
], function defineEmbedlyController(PluginBase, WidgetContentController) {

    /**
     * Define Embedly controller
     * @class EmbedlyController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var EmbedlyController = function EmbedlyController() {
    };

    return EmbedlyController.extend('EmbedlyController', {

        /**
         * Set embedded content
         * @memberOf EmbedlyController
         */
        setEmbeddedContent: function setEmbeddedContent() {
            this.view.elements.$embedly.renderEmbeddedContent(
                this.model.getPrefs('embedlyUrl')
            );
        },

        /**
         * Add Embedly rule
         * @memberOf EmbedlyController
         * @param e
         */
        addEmbedlyRule: function addEmbedlyRule(e) {

            /**
             * Define $button
             * @type {*|jQuery|HTMLElement}
             */
            var $button = $(e.target),
                scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.publishRule,
                [$button.attr('value'), this.scope.name]
            );
        }

    }, PluginBase.prototype, WidgetContentController.prototype);
});
