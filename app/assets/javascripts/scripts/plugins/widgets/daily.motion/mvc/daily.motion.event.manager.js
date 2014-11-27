/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'plugins/widgets/widget.content.event.manager'
], function defineDailyMotionEventManager(WidgetContentEventManager) {

    /**
     * Define DailyMotion event manager
     * @class DailyMotionEventManager
     * @constructor
     * @extends BaseEvent
     * @extends WidgetContentEventManager
     */
    var DailyMotionEventManager = function DailyMotionEventManager() {

        this.updateEventList({});
    };

    return DailyMotionEventManager.extend('DailyMotionEventManager', {

    }, WidgetContentEventManager.prototype);
});
