/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'plugins/widgets/widget.content.event.manager'
], function definePetradarEventManager(WidgetContentEventManager) {

    /**
     * Define Petradar event manager
     * @class PetradarEventManager
     * @constructor
     * @extends BaseEvent
     * @extends WidgetContentEventManager
     */
    var PetradarEventManager = function PetradarEventManager() {

        this.updateEventList({});
    };

    return PetradarEventManager.extend('PetradarEventManager', {

    }, WidgetContentEventManager.prototype);
});