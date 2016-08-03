/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'plugins/widgets/widget.content.event.manager'
], function defineProchanEventManager(WidgetContentEventManager) {

    /**
     * Define Prochan event manager
     * @class ProchanEventManager
     * @constructor
     * @extends BaseEvent
     * @extends WidgetContentEventManager
     */
    var ProchanEventManager = function ProchanEventManager() {

        this.updateEventList({});
    };

    return ProchanEventManager.extend(
        'ProchanEventManager', {},
        WidgetContentEventManager.prototype
    );
});
