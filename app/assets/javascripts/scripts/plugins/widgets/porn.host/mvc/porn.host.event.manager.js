/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'plugins/widgets/widget.content.event.manager'
], function definePornHostEventManager(WidgetContentEventManager) {

    /**
     * Define PornHost event manager
     * @class PornHostEventManager
     * @constructor
     * @extends BaseEvent
     * @extends WidgetContentEventManager
     */
    var PornHostEventManager = function PornHostEventManager() {

        this.updateEventList({});
    };

    return PornHostEventManager.extend('PornHostEventManager', {

    }, WidgetContentEventManager.prototype);
});
