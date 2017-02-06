/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin.controller',
    'plugins/widgets/widget.content.controller'
], function defineMapQuestController(PluginBase, WidgetContentController) {

    /**
     * Define MapQuest controller
     * @class MapQuestController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var MapQuestController = function MapQuestController() {
    };

    return MapQuestController.extend('MapQuestController', {

        /**
         * Set embedded content
         * @memberOf MapQuestController
         */
        setEmbeddedContent: function setEmbeddedContent() {
            this.view.get$item().renderEmbeddedContent(
                this.model.getPrefs('mapquestConsumerKey'),
                this.model.getPrefs('mapquestZoom'),
                this.model.getPrefs('mapquestZoomOnDoubleClick'),
                this.model.getPrefs('mapquestLatitudeLongitude')
            );
        },

        /**
         * Add MapQuest rule
         * @memberOf MapQuestController
         * @param {Event} e
         */
        addMapQuestRule: function addMapQuestRule(e) {

            /**
             * Define $button
             * @type {*|jQuery|HTMLElement}
             */
            var $button = $(e.target);

            /**
             * Get scope
             * @type {MapQuest|{name: string}}
             */
            var scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.publishRule,
                [$button.attr('value'), scope.name]
            );
        }

    }, PluginBase.prototype, WidgetContentController.prototype);
});
