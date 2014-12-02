/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin',
    'plugins/widgets/widget.content.controller'
], function defineIsnareController(PluginBase, WidgetContentController) {

    /**
     * Define isnare controller
     * @class IsnareController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var IsnareController = function IsnareController() {
    };

    return IsnareController.extend('IsnareController', {

        /**
         * Set embedded content
         * @member IsnareController
         */
        setEmbeddedContent: function setEmbeddedContent() {
            this.view.elements.$isnare.renderEmbeddedContent(
                this.model.getPrefs('isnareEmbedCode')
            );
        },

        /**
         * Add Isnare rule
         * @member IsnareController
         * @param e
         */
        addIsnareRule: function addIsnareRule(e) {

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
