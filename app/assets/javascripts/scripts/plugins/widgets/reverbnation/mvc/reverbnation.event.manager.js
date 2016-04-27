/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'plugins/widgets/widget.content.event.manager'
], function defineReverbnationEventManager(WidgetContentEventManager) {

    /**
     * Define Reverbnation event manager
     * @class ReverbnationEventManager
     * @constructor
     * @extends BaseEvent
     * @extends WidgetContentEventManager
     */
    var ReverbnationEventManager = function ReverbnationEventManager() {

        this.updateEventList({});
    };

    return ReverbnationEventManager.extend(
        'ReverbnationEventManager', {},
        WidgetContentEventManager.prototype
    );
});
