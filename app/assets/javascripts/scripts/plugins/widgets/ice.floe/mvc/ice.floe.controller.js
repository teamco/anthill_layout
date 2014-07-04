/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin',
    'plugins/widgets/widget.content.controller'
], function defineIceFloeController(PluginBase, WidgetContentController) {

    /**
     * Define ice floe controller
     * @class IceFloeController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var IceFloeController = function IceFloeController() {
    };

    return IceFloeController.extend('IceFloeController', {

        /**
         * Set embedded content
         * @member IceFloeController
         */
        setEmbeddedContent: function setEmbeddedContent() {

            this.view.elements.$icefloe.renderEmbeddedContent();
        },

        /**
         * Add IceFloe rule
         * @member IceFloeController
         * @param e
         */
        addIceFloeRule: function addIceFloeRule(e) {

            /**
             * Define $button
             * @type {*|jQuery|HTMLElement}
             */
            var $button = $(e.target),
                scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.publishRule,
                [$button.attr('value'), this.scope.constructor.name]
            );
        }

    }, PluginBase.prototype, WidgetContentController.prototype);
});