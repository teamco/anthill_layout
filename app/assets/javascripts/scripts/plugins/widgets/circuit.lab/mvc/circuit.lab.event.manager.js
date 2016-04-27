/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'plugins/widgets/widget.content.event.manager'
], function defineCircuitLabEventManager(WidgetContentEventManager) {

    /**
     * Define CircuitLab event manager
     * @class CircuitLabEventManager
     * @constructor
     * @extends BaseEvent
     * @extends WidgetContentEventManager
     */
    var CircuitLabEventManager = function CircuitLabEventManager() {

        this.updateEventList({});
    };

    return CircuitLabEventManager.extend(
        'CircuitLabEventManager', {},
        WidgetContentEventManager.prototype
    );
});
