/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'plugins/widgets/widget.content.event.manager'
], function defineMyWorldEventManager(WidgetContentEventManager) {

    /**
     * Define MyWorld event manager
     * @class MyWorldEventManager
     * @constructor
     * @extends BaseEvent
     * @extends WidgetContentEventManager
     */
    var MyWorldEventManager = function MyWorldEventManager() {

        this.updateEventList({});
    };

    return MyWorldEventManager.extend('MyWorldEventManager', {

    }, WidgetContentEventManager.prototype);
});
