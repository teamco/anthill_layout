/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'plugins/widgets/widget.content.event.manager'
], function definePetRadarEventManager(WidgetContentEventManager) {

    /**
     * Define PetRadar event manager
     * @class PetRadarEventManager
     * @constructor
     * @extends BaseEvent
     * @extends WidgetContentEventManager
     */
    var PetRadarEventManager = function PetRadarEventManager() {

        this.updateEventList({});
    };

    return PetRadarEventManager.extend('PetRadarEventManager', {

    }, WidgetContentEventManager.prototype);
});