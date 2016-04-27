/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'plugins/widgets/widget.content.event.manager'
], function defineReleasewireEventManager(WidgetContentEventManager) {

    /**
     * Define Releasewire event manager
     * @class ReleasewireEventManager
     * @constructor
     * @extends BaseEvent
     * @extends WidgetContentEventManager
     */
    var ReleasewireEventManager = function ReleasewireEventManager() {

        this.updateEventList({});
    };

    return ReleasewireEventManager.extend(
        'ReleasewireEventManager', {},
        WidgetContentEventManager.prototype
    );
});
