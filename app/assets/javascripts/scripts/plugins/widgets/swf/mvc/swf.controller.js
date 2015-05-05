/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin',
    'plugins/widgets/widget.content.controller'
], function defineSwfController(PluginBase, WidgetContentController) {

    /**
     * Define swf controller
     * @class SwfController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var SwfController = function SwfController() {
    };

    return SwfController.extend('SwfController', {

        /**
         * Set embedded content
         * @memberOf SwfController
         */
        setEmbeddedContent: function setEmbeddedContent() {

            this.view.elements.$swf.renderEmbeddedContent({
                url: this.model.getPrefs('swfUrl'),
                flashvars: this.model.getPrefs('swfFlashVars'),
                params: this.model.getPrefs('swfParams'),
                attributes: this.model.getPrefs('swfAttributes')
            });
        },

        /**
         * Add Swf rule
         * @memberOf SwfController
         * @param e
         */
        addSwfRule: function addSwfRule(e) {

            /**
             * Define $button
             * @type {*|jQuery|HTMLElement}
             */
            var $button = $(e.target),
                scope = this.scope;

            scope.observer.publish(
                scope.eventManager.eventList.publishRule,
                [$button.attr('value'), scope.constructor.prototype.name]
            );
        }

    }, PluginBase.prototype, WidgetContentController.prototype);
});