/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin.controller',
    'plugins/widgets/widget.content.controller'
], function defineWistiaController(PluginBase, WidgetContentController) {

    /**
     * Define Wistia controller
     * @class WistiaController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var WistiaController = function WistiaController() {
    };

    return WistiaController.extend('WistiaController', {

        /**
         * Set embedded content
         * @memberOf WistiaController
         */
        setEmbeddedContent: function setEmbeddedContent() {
            this.view.get$item().renderEmbeddedContent(
                this.model.getPrefs('wistiaEmbedCode')
            );
        },

        /**
         * Add Wistia rule
         * @memberOf WistiaController
         * @param e
         */
        addWistiaRule: function addWistiaRule(e) {

            /**
             * Define $button
             * @type {*|jQuery|HTMLElement}
             */
            var $button = $(e.target);

            /**
             * Get scope
             * @type {Wistia|{name: string}}
             */
            var scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.publishRule,
                [$button.attr('value'), scope.name]
            );
        }

    }, PluginBase.prototype, WidgetContentController.prototype);
});
