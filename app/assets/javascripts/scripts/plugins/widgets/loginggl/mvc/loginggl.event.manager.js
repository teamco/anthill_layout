/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'plugins/widgets/widget.content.event.manager'
], function defineLogingglEventManager(WidgetContentEventManager) {

    /**
     * Define Loginggl event manager
     * @class LogingglEventManager
     * @constructor
     * @extends BaseEvent
     * @extends WidgetContentEventManager
     */
    var LogingglEventManager = function LogingglEventManager() {

        this.updateEventList({});
    };

    return LogingglEventManager.extend('LogingglEventManager', {

    }, WidgetContentEventManager.prototype);
});