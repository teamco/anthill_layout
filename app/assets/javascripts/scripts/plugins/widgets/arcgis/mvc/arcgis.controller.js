/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin.controller',
    'plugins/widgets/widget.content.controller'
], function defineArcgisController(PluginBase, WidgetContentController) {

    /**
     * Define Arcgis controller
     * @class ArcgisController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var ArcgisController = function ArcgisController() {
    };

    return ArcgisController.extend('ArcgisController', {

        /**
         * Set embedded content
         * @memberOf ArcgisController
         */
        setEmbeddedContent: function setEmbeddedContent() {
            this.view.get$item().renderEmbeddedContent(
                this.model.getPrefs('arcgisEmbedCode')
            );
        },

        /**
         * Add Arcgis rule
         * @memberOf ArcgisController
         * @param e
         */
        addArcgisRule: function addArcgisRule(e) {

            /**
             * Define $button
             * @type {*|jQuery|HTMLElement}
             */
            var $button = $(e.target);

            /**
             * Get scope
             * @type {Arcgis|{name: string}}
             */
            var scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.publishRule,
                [$button.attr('value'), scope.name]
            );
        }

    }, PluginBase.prototype, WidgetContentController.prototype);
});
