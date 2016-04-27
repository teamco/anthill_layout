/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin.controller',
    'plugins/widgets/widget.content.controller'
], function defineShoudioController(PluginBase, WidgetContentController) {

    /**
     * Define Shoudio controller
     * @class ShoudioController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var ShoudioController = function ShoudioController() {
    };

    return ShoudioController.extend('ShoudioController', {

        /**
         * Set embedded content
         * @memberOf ShoudioController
         */
        setEmbeddedContent: function setEmbeddedContent() {
            this.view.get$item().renderEmbeddedContent(
                this.model.getPrefs('shoudioEmbedCode')
            );
        },

        /**
         * Add Shoudio rule
         * @memberOf ShoudioController
         * @param e
         */
        addShoudioRule: function addShoudioRule(e) {

            /**
             * Define $button
             * @type {*|jQuery|HTMLElement}
             */
            var $button = $(e.target);

            /**
             * Get scope
             * @type {Shoudio|{name: string}}
             */
            var scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.publishRule,
                [$button.attr('value'), scope.name]
            );
        }

    }, PluginBase.prototype, WidgetContentController.prototype);
});
