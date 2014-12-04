/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'plugins/widgets/widget.content.event.manager'
], function defineChannelTwoEventManager(WidgetContentEventManager) {

    /**
     * Define ChannelTwo event manager
     * @class ChannelTwoEventManager
     * @constructor
     * @extends BaseEvent
     * @extends WidgetContentEventManager
     */
    var ChannelTwoEventManager = function ChannelTwoEventManager() {

        this.updateEventList({});
    };

    return ChannelTwoEventManager.extend('ChannelTwoEventManager', {

    }, WidgetContentEventManager.prototype);
});
