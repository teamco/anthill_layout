/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'plugins/widgets/widget.content.event.manager'
], function defineForecastIoEventManager(WidgetContentEventManager) {

    /**
     * Define ForecastIo event manager
     * @class ForecastIoEventManager
     * @constructor
     * @extends BaseEvent
     * @extends WidgetContentEventManager
     */
    var ForecastIoEventManager = function ForecastIoEventManager() {

        this.updateEventList({});
    };

    return ForecastIoEventManager.extend(
        'ForecastIoEventManager', {},
        WidgetContentEventManager.prototype
    );
});
