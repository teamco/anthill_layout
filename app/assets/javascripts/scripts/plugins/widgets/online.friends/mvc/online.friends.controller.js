/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin.controller',
    'plugins/widgets/widget.content.controller',
    'lib/jquery/jquery.nicescroll'
], function defineOnlineFriendsController(PluginBase, WidgetContentController) {

    /**
     * Define online friends controller
     * @class OnlineFriendsController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var OnlineFriendsController = function OnlineFriendsController() {
    };

    return OnlineFriendsController.extend('OnlineFriendsController', {

        /**
         * Set embedded content
         * @memberOf OnlineFriendsController
         */
        setEmbeddedContent: function setEmbeddedContent() {

            this.view.elements.$onlinefriends.renderEmbeddedContent();
        },

        /**
         * Add OnlineFriends rule
         * @memberOf OnlineFriendsController
         * @param {Event} e
         */
        addOnlineFriendsRule: function addOnlineFriendsRule(e) {

            /**
             * Define $button
             * @type {*|jQuery|HTMLElement}
             */
            var $button = $(e.target),
                scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.publishRule,
                [$button.attr('value'), this.scope.name]
            );
        }

    }, PluginBase.prototype, WidgetContentController.prototype);
});