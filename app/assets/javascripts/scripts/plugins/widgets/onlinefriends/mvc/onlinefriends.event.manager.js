/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'plugins/widgets/widget.content.event.manager'
], function defineOnlinefriendsEventManager(WidgetContentEventManager) {

    /**
     * Define Onlinefriends event manager
     * @class OnlinefriendsEventManager
     * @constructor
     * @extends BaseEvent
     * @extends WidgetContentEventManager
     */
    var OnlinefriendsEventManager = function OnlinefriendsEventManager() {

        this.updateEventList({});
    };

    return OnlinefriendsEventManager.extend('OnlinefriendsEventManager', {

    }, WidgetContentEventManager.prototype);
});