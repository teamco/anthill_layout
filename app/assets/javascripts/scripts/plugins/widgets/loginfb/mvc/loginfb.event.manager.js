/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'plugins/widgets/widget.content.event.manager'
], function defineLoginfbEventManager(WidgetContentEventManager) {

    /**
     * Define Loginfb event manager
     * @class LoginfbEventManager
     * @constructor
     * @extends BaseEvent
     * @extends WidgetContentEventManager
     */
    var LoginfbEventManager = function LoginfbEventManager() {

        this.updateEventList({});
    };

    return LoginfbEventManager.extend('LoginfbEventManager', {

    }, WidgetContentEventManager.prototype);
});