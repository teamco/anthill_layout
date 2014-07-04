/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'plugins/widgets/widget.content.event.manager'
], function defineOnlineFriendsEventManager(WidgetContentEventManager) {

    /**
     * Define OnlineFriends event manager
     * @class OnlineFriendsEventManager
     * @constructor
     * @extends BaseEvent
     * @extends WidgetContentEventManager
     */
    var OnlineFriendsEventManager = function OnlineFriendsEventManager() {

        this.updateEventList({});
    };

    return OnlineFriendsEventManager.extend('OnlineFriendsEventManager', {

    }, WidgetContentEventManager.prototype);
});