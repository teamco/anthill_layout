/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin',
    'plugins/widgets/widget.content.controller',
    'lib/jquery/jquery.nicescroll'
], function defineOnlinefriendsController(PluginBase, WidgetContentController) {

    /**
     * Define onlinefriends controller
     * @class OnlinefriendsController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var OnlinefriendsController = function OnlinefriendsController() {
    };

    return OnlinefriendsController.extend('OnlinefriendsController', {

        /**
         * Set embedded content
         * @member OnlinefriendsController
         */
        setEmbeddedContent: function setEmbeddedContent() {

            this.view.elements.$onlinefriends.renderEmbeddedContent();
        },

        /**
         * Add Onlinefriends rule
         * @member OnlinefriendsController
         * @param e
         */
        addOnlinefriendsRule: function addOnlinefriendsRule(e) {

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