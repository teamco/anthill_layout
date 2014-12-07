/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'plugins/widgets/widget.content.event.manager'
], function defineElevenChannelUaEventManager(WidgetContentEventManager) {

    /**
     * Define ElevenChannelUa event manager
     * @class ElevenChannelUaEventManager
     * @constructor
     * @extends BaseEvent
     * @extends WidgetContentEventManager
     */
    var ElevenChannelUaEventManager = function ElevenChannelUaEventManager() {

        this.updateEventList({});
    };

    return ElevenChannelUaEventManager.extend('ElevenChannelUaEventManager', {

    }, WidgetContentEventManager.prototype);
});
