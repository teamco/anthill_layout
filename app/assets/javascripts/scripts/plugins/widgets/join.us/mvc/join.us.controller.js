/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin.controller',
    'plugins/widgets/widget.content.controller'
], function defineJoinUsController(PluginBase, WidgetContentController) {

    /**
     * Define JoinUs controller
     * @class JoinUsController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var JoinUsController = function JoinUsController() {
    };

    return JoinUsController.extend('JoinUsController', {

        /**
         * Set embedded content
         * @memberOf JoinUsController
         */
        setEmbeddedContent: function setEmbeddedContent() {
            this.view.get$item().renderEmbeddedContent();
        },

        /**
         * Add JoinUs rule
         * @memberOf JoinUsController
         * @param e
         */
        addJoinUsRule: function addJoinUsRule(e) {

            /**
             * Define $button
             * @type {*|jQuery|HTMLElement}
             */
            var $button = $(e.target);

            /**
             * Get scope
             * @type {JoinUs|{name: string}}
             */
            var scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.publishRule,
                [$button.attr('value'), scope.name]
            );
        }

    }, PluginBase.prototype, WidgetContentController.prototype);
});
