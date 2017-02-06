/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin.controller',
    'plugins/widgets/widget.content.controller'
], function defineLaimTvController(PluginBase, WidgetContentController) {

    /**
     * Define LaimTv controller
     * @class LaimTvController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var LaimTvController = function LaimTvController() {
    };

    return LaimTvController.extend('LaimTvController', {

        /**
         * Set embedded content
         * @memberOf LaimTvController
         */
        setEmbeddedContent: function setEmbeddedContent() {
            this.view.get$item().renderEmbeddedContent(
                this.model.getPrefs('laimtvEmbedCode')
            );
        },

        /**
         * Add LaimTv rule
         * @memberOf LaimTvController
         * @param {Event} e
         */
        addLaimTvRule: function addLaimTvRule(e) {

            /**
             * Define $button
             * @type {*|jQuery|HTMLElement}
             */
            var $button = $(e.target);

            /**
             * Get scope
             * @type {LaimTv|{name: string}}
             */
            var scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.publishRule,
                [$button.attr('value'), scope.name]
            );
        }

    }, PluginBase.prototype, WidgetContentController.prototype);
});
