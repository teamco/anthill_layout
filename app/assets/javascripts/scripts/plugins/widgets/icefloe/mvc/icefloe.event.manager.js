/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'plugins/widgets/widget.content.event.manager'
], function defineIcefloeEventManager(WidgetContentEventManager) {

    /**
     * Define Icefloe event manager
     * @class IcefloeEventManager
     * @constructor
     * @extends BaseEvent
     * @extends WidgetContentEventManager
     */
    var IcefloeEventManager = function IcefloeEventManager() {

        this.updateEventList({});
    };

    return IcefloeEventManager.extend('IcefloeEventManager', {

    }, WidgetContentEventManager.prototype);
});