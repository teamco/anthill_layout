/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin.controller',
    'plugins/widgets/widget.content.controller'
], function defineSwayController(PluginBase, WidgetContentController) {

    /**
     * Define Sway controller
     * @class SwayController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var SwayController = function SwayController() {
    };

    return SwayController.extend('SwayController', {

        /**
         * Set embedded content
         * @memberOf SwayController
         */
        setEmbeddedContent: function setEmbeddedContent() {
            this.view.get$item().renderEmbeddedContent(
                this.model.getPrefs('swayEmbedCode')
            );
        },

        /**
         * Add Sway rule
         * @memberOf SwayController
         * @param e
         */
        addSwayRule: function addSwayRule(e) {

            /**
             * Define $button
             * @type {*|jQuery|HTMLElement}
             */
            var $button = $(e.target);

            /**
             * Get scope
             * @type {Sway|{name: string}}
             */
            var scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.publishRule,
                [$button.attr('value'), scope.name]
            );
        }

    }, PluginBase.prototype, WidgetContentController.prototype);
});
