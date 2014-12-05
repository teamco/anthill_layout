/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'plugins/widgets/widget.content.event.manager'
], function defineChannelTwoIlEventManager(WidgetContentEventManager) {

    /**
     * Define ChannelTwoIl event manager
     * @class ChannelTwoIlEventManager
     * @constructor
     * @extends BaseEvent
     * @extends WidgetContentEventManager
     */
    var ChannelTwoIlEventManager = function ChannelTwoIlEventManager() {

        this.updateEventList({});
    };

    return ChannelTwoIlEventManager.extend('ChannelTwoIlEventManager', {

    }, WidgetContentEventManager.prototype);
});
