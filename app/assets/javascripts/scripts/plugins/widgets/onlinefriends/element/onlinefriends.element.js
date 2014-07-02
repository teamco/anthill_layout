/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element'
], function defineOnlinefriendsElement(BaseElement) {

    /**
     * Define Onlinefriends Element
     * @param view
     * @param opts
     * @returns {OnlinefriendsElement}
     * @constructor
     * @class OnlinefriendsElement
     * @extends BaseElement
     */
    var OnlinefriendsElement = function OnlinefriendsElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('onlinefriends', {
            resource: '/widgets'
        });

        return this;
    };

    return OnlinefriendsElement.extend('OnlinefriendsElement', {

        /**
         * Render Embedded content
         * @member OnlinefriendsElement
         */
        renderEmbeddedContent: function renderEmbeddedContent() {
            var $element = this;
            var $structure = [
            '<div class="mainContainer"><h3>Friends Online</h3><i class="online_amount"></i>',
        '<div class="scrollableContent"><ul class="friendsRowsContainer"></ul>',
        '</div><div class="viewAllMenu">View All</div></div>'].join('');
            
            $element.view.controller.clearParentThumbnail();
            $element.$.append($structure);
            
            require([
                'plugins/widgets/onlinefriends/mvc/onlinefriends.behavior',
                
            ], function showFriendsOnline(OnlineFriendsBehavior) {
                var showFriendsOnline = new OnlineFriendsBehavior();
            });
        }

    }, BaseElement.prototype);

});