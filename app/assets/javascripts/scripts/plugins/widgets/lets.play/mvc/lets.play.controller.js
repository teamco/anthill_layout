/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin.controller',
    'plugins/widgets/widget.content.controller'
], function defineLetsPlayController(PluginBase, WidgetContentController) {

    /**
     * Define LetsPlay controller
     * @class LetsPlayController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var LetsPlayController = function LetsPlayController() {
    };

    return LetsPlayController.extend('LetsPlayController', {

        /**
         * Set embedded content
         * @memberOf LetsPlayController
         */
        setEmbeddedContent: function setEmbeddedContent() {
            this.view.get$item().renderEmbeddedContent();
        },

        /**
         * Add LetsPlay rule
         * @memberOf LetsPlayController
         * @param e
         */
        addLetsPlayRule: function addLetsPlayRule(e) {

            /**
             * Define $button
             * @type {*|jQuery|HTMLElement}
             */
            var $button = $(e.target);

            /**
             * Get scope
             * @type {LetsPlay|{name: string}}
             */
            var scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.publishRule,
                [$button.attr('value'), scope.name]
            );
        }

    }, PluginBase.prototype, WidgetContentController.prototype);
});
