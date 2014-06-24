/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin',
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
         * @member RutubeController
         */
        setEmbeddedContent: function setEmbeddedContent() {

            this.view.elements.$rutube.renderEmbeddedContent(
                this.model.getPrefs('rutubeEmbedCode')
            );
        },

        /**
         * Add Rutube rule
         * @member RutubeController
         * @param e
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
                [$button.attr('value'), scope.constructor.name]
            );
        }

    }, PluginBase.prototype, WidgetContentController.prototype);
});