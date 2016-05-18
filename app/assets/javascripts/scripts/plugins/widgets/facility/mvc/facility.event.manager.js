/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'plugins/widgets/widget.content.event.manager'
], function defineFacilityEventManager(WidgetContentEventManager) {

    /**
     * Define Facility event manager
     * @class FacilityEventManager
     * @constructor
     * @extends BaseEvent
     * @extends WidgetContentEventManager
     */
    var FacilityEventManager = function FacilityEventManager() {

        this.updateEventList({});
    };

    return FacilityEventManager.extend(
        'FacilityEventManager', {},
        WidgetContentEventManager.prototype
    );
});
