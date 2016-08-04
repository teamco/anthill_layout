/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'plugins/widgets/widget.content.event.manager'
], function defineAccuweatherVideosEventManager(WidgetContentEventManager) {

    /**
     * Define AccuweatherVideos event manager
     * @class AccuweatherVideosEventManager
     * @constructor
     * @extends BaseEvent
     * @extends WidgetContentEventManager
     */
    var AccuweatherVideosEventManager = function AccuweatherVideosEventManager() {

        this.updateEventList({});
    };

    return AccuweatherVideosEventManager.extend(
        'AccuweatherVideosEventManager', {},
        WidgetContentEventManager.prototype
    );
});
