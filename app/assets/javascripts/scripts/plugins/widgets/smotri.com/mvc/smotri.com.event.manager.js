/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'plugins/widgets/widget.content.event.manager'
], function defineSmotriComEventManager(WidgetContentEventManager) {

    /**
     * Define SmotriCom event manager
     * @class SmotriComEventManager
     * @constructor
     * @extends BaseEvent
     * @extends WidgetContentEventManager
     */
    var SmotriComEventManager = function SmotriComEventManager() {

        this.updateEventList({});
    };

    return SmotriComEventManager.extend('SmotriComEventManager', {

    }, WidgetContentEventManager.prototype);
});
