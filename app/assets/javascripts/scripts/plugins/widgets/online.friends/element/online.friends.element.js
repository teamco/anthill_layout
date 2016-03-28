/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element'
], function defineOnlineFriendsElement(PluginElement) {

    /**
     * Define OnlineFriends Element
     * @param view
     * @param opts
     * @returns {OnlineFriendsElement}
     * @constructor
     * @class OnlineFriendsElement
     * @extends PluginElement
     */
    var OnlineFriendsElement = function OnlineFriendsElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('online.friends', {
            resource: '/widgets'
        });

        return this;
    };

    return OnlineFriendsElement.extend('OnlineFriendsElement', {

        /**
         * Render Embedded content
         * @memberOf OnlineFriendsElement
         */
        renderEmbeddedContent: function renderEmbeddedContent() {

            /**
             * Define $element
             * @type {OnlineFriendsElement}
             */
            var $element = this;

            var $structure = [
                '<div class="mainContainer"><h3>Friends Online</h3><i class="online_amount"></i>',
                '<div class="scrollableContent"><ul class="friendsRowsContainer"></ul>',
                '</div><div class="viewAllMenu">View All</div></div>'
            ].join('');

            $element.view.controller.clearParentThumbnail();
            $element.$.append($structure);

            require([
                'plugins/widgets/online.friends/mvc/online.friends.behavior'
            ], function showFriendsOnline(OnlineFriendsBehavior) {
                var showFriendsOnline = new OnlineFriendsBehavior();
            });
        }

    }, PluginElement.prototype);

});