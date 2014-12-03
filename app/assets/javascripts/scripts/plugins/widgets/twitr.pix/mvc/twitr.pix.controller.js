/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin',
    'plugins/widgets/widget.content.controller'
], function defineTwitrPixController(PluginBase, WidgetContentController) {

    /**
     * Define twitrpix controller
     * @class TwitrPixController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var TwitrPixController = function TwitrPixController() {
    };

    return TwitrPixController.extend('TwitrPixController', {

        /**
         * Set embedded content
         * @member TwitrPixController
         */
        setEmbeddedContent: function setEmbeddedContent() {
            this.view.elements.$twitrpix.renderEmbeddedContent(
                this.model.getPrefs('twitrpixEmbedCode')
            );
        },

        /**
         * Add TwitrPix rule
         * @member TwitrPixController
         * @param e
         */
        addTwitrPixRule: function addTwitrPixRule(e) {

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
