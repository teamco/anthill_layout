/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin',
    'plugins/widgets/widget'
], function defineTwitsController(PluginBase, WidgetContentController) {

    /**
     * Define twits controller
     * @class TwitsController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var TwitsController = function TwitsController() {
    };

    return TwitsController.extend('TwitsController', {

        /**
         * Set embedded content
         * @member TwitsController
         */
        setEmbeddedContent: function setEmbeddedContent() {

            this.view.elements.$twits.renderEmbeddedContent(
                this.model.getPrefs('twitsUrl')
            );
        },

        /**
         * Add Twits rule
         * @member TwitsController
         * @param e
         */
        addTwitsRule: function addTwitsRule(e) {

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