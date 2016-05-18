/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'plugins/widgets/widget.content.event.manager'
], function defineDemoChatEventManager(WidgetContentEventManager) {

    /**
     * Define DemoChat event manager
     * @class DemoChatEventManager
     * @constructor
     * @extends BaseEvent
     * @extends WidgetContentEventManager
     */
    var DemoChatEventManager = function DemoChatEventManager() {

        this.updateEventList({});
    };

    return DemoChatEventManager.extend(
        'DemoChatEventManager', {},
        WidgetContentEventManager.prototype
    );
});
