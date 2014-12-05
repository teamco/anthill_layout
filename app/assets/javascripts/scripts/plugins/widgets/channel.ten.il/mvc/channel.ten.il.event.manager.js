/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'plugins/widgets/widget.content.event.manager'
], function defineChannelTenIlEventManager(WidgetContentEventManager) {

    /**
     * Define ChannelTenIl event manager
     * @class ChannelTenIlEventManager
     * @constructor
     * @extends BaseEvent
     * @extends WidgetContentEventManager
     */
    var ChannelTenIlEventManager = function ChannelTenIlEventManager() {

        this.updateEventList({});
    };

    return ChannelTenIlEventManager.extend('ChannelTenIlEventManager', {

    }, WidgetContentEventManager.prototype);
});
