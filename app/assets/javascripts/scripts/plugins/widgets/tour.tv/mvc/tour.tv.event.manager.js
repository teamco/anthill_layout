/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'plugins/widgets/widget.content.event.manager'
], function defineTourTvEventManager(WidgetContentEventManager) {

    /**
     * Define TourTv event manager
     * @class TourTvEventManager
     * @constructor
     * @extends BaseEvent
     * @extends WidgetContentEventManager
     */
    var TourTvEventManager = function TourTvEventManager() {

        this.updateEventList({});
    };

    return TourTvEventManager.extend('TourTvEventManager', {

    }, WidgetContentEventManager.prototype);
});
