/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin.controller',
    'plugins/widgets/widget.content.controller'
], function defineRutubeController(PluginBase, WidgetContentController) {

    /**
     * Define rutube controller
     * @class RutubeController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var RutubeController = function RutubeController() {
    };

    return RutubeController.extend('RutubeController', {

        /**
         * Set embedded content
         * @memberOf RutubeController
         */
        setEmbeddedContent: function setEmbeddedContent() {

            this.view.elements.$rutube.renderEmbeddedContent(
                this.model.getPrefs('rutubeEmbedCode')
            );
        },

        /**
         * Add Rutube rule
         * @memberOf RutubeController
         * @param {Event} e
         */
        addRutubeRule: function addRutubeRule(e) {

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