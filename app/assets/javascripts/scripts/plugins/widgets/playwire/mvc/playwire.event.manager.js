/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'plugins/widgets/widget.content.event.manager'
], function definePlaywireEventManager(WidgetContentEventManager) {

    /**
     * Define Playwire event manager
     * @class PlaywireEventManager
     * @constructor
     * @extends BaseEvent
     * @extends WidgetContentEventManager
     */
    var PlaywireEventManager = function PlaywireEventManager() {

        this.updateEventList({});
    };

    return PlaywireEventManager.extend(
        'PlaywireEventManager', {},
        WidgetContentEventManager.prototype
    );
});
