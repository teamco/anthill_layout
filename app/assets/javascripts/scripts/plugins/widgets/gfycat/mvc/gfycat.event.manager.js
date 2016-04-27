/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'plugins/widgets/widget.content.event.manager'
], function defineGfycatEventManager(WidgetContentEventManager) {

    /**
     * Define Gfycat event manager
     * @class GfycatEventManager
     * @constructor
     * @extends BaseEvent
     * @extends WidgetContentEventManager
     */
    var GfycatEventManager = function GfycatEventManager() {

        this.updateEventList({});
    };

    return GfycatEventManager.extend(
        'GfycatEventManager', {},
        WidgetContentEventManager.prototype
    );
});
