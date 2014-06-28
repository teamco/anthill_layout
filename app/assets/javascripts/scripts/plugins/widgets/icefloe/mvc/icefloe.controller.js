/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin',
    'plugins/widgets/widget.content.controller'
], function defineIcefloeController(PluginBase, WidgetContentController) {

    /**
     * Define icefloe controller
     * @class IcefloeController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var IcefloeController = function IcefloeController() {
    };

    return IcefloeController.extend('IcefloeController', {

        /**
         * Set embedded content
         * @member IcefloeController
         */
        setEmbeddedContent: function setEmbeddedContent() {

            this.view.elements.$icefloe.renderEmbeddedContent();
        },

        /**
         * Add Icefloe rule
         * @member IcefloeController
         * @param e
         */
        addIcefloeRule: function addIcefloeRule(e) {

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