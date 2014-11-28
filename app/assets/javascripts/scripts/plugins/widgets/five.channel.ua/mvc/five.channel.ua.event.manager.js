/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'plugins/widgets/widget.content.event.manager'
], function defineFiveChannelUaEventManager(WidgetContentEventManager) {

    /**
     * Define FiveChannelUa event manager
     * @class FiveChannelUaEventManager
     * @constructor
     * @extends BaseEvent
     * @extends WidgetContentEventManager
     */
    var FiveChannelUaEventManager = function FiveChannelUaEventManager() {

        this.updateEventList({});
    };

    return FiveChannelUaEventManager.extend('FiveChannelUaEventManager', {

    }, WidgetContentEventManager.prototype);
});
