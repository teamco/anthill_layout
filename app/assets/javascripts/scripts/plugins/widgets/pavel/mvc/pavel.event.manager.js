/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'plugins/widgets/widget.content.event.manager'
], function definePavelEventManager(WidgetContentEventManager) {

    /**
     * Define Pavel event manager
     * @class PavelEventManager
     * @constructor
     * @extends BaseEvent
     * @extends WidgetContentEventManager
     */
    var PavelEventManager = function PavelEventManager() {

        this.updateEventList({});
    };

    return PavelEventManager.extend(
        'PavelEventManager', {},
        WidgetContentEventManager.prototype
    );
});
