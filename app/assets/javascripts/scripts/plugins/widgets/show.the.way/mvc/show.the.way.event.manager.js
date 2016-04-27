/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'plugins/widgets/widget.content.event.manager'
], function defineShowTheWayEventManager(WidgetContentEventManager) {

    /**
     * Define ShowTheWay event manager
     * @class ShowTheWayEventManager
     * @constructor
     * @extends BaseEvent
     * @extends WidgetContentEventManager
     */
    var ShowTheWayEventManager = function ShowTheWayEventManager() {

        this.updateEventList({});
    };

    return ShowTheWayEventManager.extend(
        'ShowTheWayEventManager', {},
        WidgetContentEventManager.prototype
    );
});
