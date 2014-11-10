/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'plugins/widgets/widget.content.event.manager'
], function definePornhubEventManager(WidgetContentEventManager) {

    /**
     * Define Pornhub event manager
     * @class PornhubEventManager
     * @constructor
     * @extends BaseEvent
     * @extends WidgetContentEventManager
     */
    var PornhubEventManager = function PornhubEventManager() {

        this.updateEventList({});
    };

    return PornhubEventManager.extend('PornhubEventManager', {

    }, WidgetContentEventManager.prototype);
});
