/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'plugins/widgets/widget.content.event.manager'
], function defineTelekanalUaEventManager(WidgetContentEventManager) {

    /**
     * Define TelekanalUa event manager
     * @class TelekanalUaEventManager
     * @constructor
     * @extends BaseEvent
     * @extends WidgetContentEventManager
     */
    var TelekanalUaEventManager = function TelekanalUaEventManager() {

        this.updateEventList({});
    };

    return TelekanalUaEventManager.extend('TelekanalUaEventManager', {

    }, WidgetContentEventManager.prototype);
});
