/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin.controller',
    'plugins/widgets/widget.content.controller'
], function defineAccuweatherVideosController(PluginBase, WidgetContentController) {

    /**
     * Define AccuweatherVideos controller
     * @class AccuweatherVideosController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var AccuweatherVideosController = function AccuweatherVideosController() {
    };

    return AccuweatherVideosController.extend('AccuweatherVideosController', {

        /**
         * Set embedded content
         * @memberOf AccuweatherVideosController
         */
        setEmbeddedContent: function setEmbeddedContent() {
            this.view.get$item().renderEmbeddedContent(
                this.model.getPrefs('accuweathervideosEmbedCode')
            );
        },

        /**
         * Add AccuweatherVideos rule
         * @memberOf AccuweatherVideosController
         * @param e
         */
        addAccuweatherVideosRule: function addAccuweatherVideosRule(e) {

            /**
             * Define $button
             * @type {*|jQuery|HTMLElement}
             */
            var $button = $(e.target);

            /**
             * Get scope
             * @type {AccuweatherVideos|{name: string}}
             */
            var scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.publishRule,
                [$button.attr('value'), scope.name]
            );
        }

    }, PluginBase.prototype, WidgetContentController.prototype);
});
