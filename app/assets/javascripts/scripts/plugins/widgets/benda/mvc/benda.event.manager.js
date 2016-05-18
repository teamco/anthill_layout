/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'plugins/widgets/widget.content.event.manager'
], function defineBendaEventManager(WidgetContentEventManager) {

    /**
     * Define Benda event manager
     * @class BendaEventManager
     * @constructor
     * @extends BaseEvent
     * @extends WidgetContentEventManager
     */
    var BendaEventManager = function BendaEventManager() {

        this.updateEventList({});
    };

    return BendaEventManager.extend(
        'BendaEventManager', {},
        WidgetContentEventManager.prototype
    );
});
