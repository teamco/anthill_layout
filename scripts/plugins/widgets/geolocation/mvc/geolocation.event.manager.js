/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'plugins/widgets/widget.content.event.manager'
], function defineGeolocationEventManager(WidgetContentEventManager) {

    /**
     * Define Geolocation event manager
     * @class GeolocationEventManager
     * @constructor
     * @extends WidgetContentEventManager
     * @extends BaseEvent
     */
    var GeolocationEventManager = function GeolocationEventManager() {

        this.updateEventList({
            getLocation: 'get.location'
        });
    };

    return GeolocationEventManager.extend('GeolocationEventManager', {

    }, WidgetContentEventManager.prototype);
});