/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'plugins/widgets/widget.content.event.manager'
], function defineSimpleWeatherEventManager(WidgetContentEventManager) {

    /**
     * Define SimpleWeather event manager
     * @class SimpleWeatherEventManager
     * @constructor
     * @extends BaseEvent
     * @extends WidgetContentEventManager
     */
    var SimpleWeatherEventManager = function SimpleWeatherEventManager() {

        this.updateEventList({
            getLocation: 'get.location'
        });
    };

    return SimpleWeatherEventManager.extend('SimpleWeatherEventManager', {

    }, WidgetContentEventManager.prototype);
});
