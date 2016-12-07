/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'plugins/widgets/widget.content.event.manager'
], function defineGeolocationMapEventManager(WidgetContentEventManager) {

    /**
     * Define GeolocationMap event manager
     * @class GeolocationMapEventManager
     * @constructor
     * @extends WidgetContentEventManager
     * @extends BaseEvent
     */
    let GeolocationMapEventManager = function GeolocationMapEventManager() {

        this.updateEventList({
            getLocation: 'get.location'
        });
    };

    return GeolocationMapEventManager.extend('GeolocationMapEventManager', {

    }, WidgetContentEventManager.prototype);
});