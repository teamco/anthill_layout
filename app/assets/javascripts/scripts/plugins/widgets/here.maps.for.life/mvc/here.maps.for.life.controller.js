/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin.controller',
    'plugins/widgets/widget.content.controller'
], function defineHereMapsForLifeController(PluginBase, WidgetContentController) {

    /**
     * Define HereMapsForLife controller
     * @class HereMapsForLifeController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var HereMapsForLifeController = function HereMapsForLifeController() {
    };

    return HereMapsForLifeController.extend('HereMapsForLifeController', {

        /**
         * Set embedded content
         * @memberOf HereMapsForLifeController
         */
        setEmbeddedContent: function setEmbeddedContent() {
            this.view.get$item().renderEmbeddedContent();
        },

        toggleViewBounds: function toggleViewBounds() {
            debugger
        },

        toggleSpecifiedLocation: function toggleSpecifiedLocation() {

            /**
             * Get modal
             * @type {PageData}
             */
            var referrer = this.scope.referrer;

            if (referrer ) {

                var $latitudeLongitude = this.getView().elements.$preferences.showLatitudeLongitude(referrer);
            }
        },

        /**
         * Add HereMapsForLife rule
         * @memberOf HereMapsForLifeController
         * @param e
         */
        addHereMapsForLifeRule: function addHereMapsForLifeRule(e) {

            /**
             * Define $button
             * @type {*|jQuery|HTMLElement}
             */
            var $button = $(e.target);

            /**
             * Get scope
             * @type {HereMapsForLife|{name: string}}
             */
            var scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.publishRule,
                [$button.attr('value'), scope.name]
            );
        }

    }, PluginBase.prototype, WidgetContentController.prototype);
});
