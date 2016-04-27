/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'plugins/widgets/widget.content.event.manager'
], function defineSketchfabEventManager(WidgetContentEventManager) {

    /**
     * Define Sketchfab event manager
     * @class SketchfabEventManager
     * @constructor
     * @extends BaseEvent
     * @extends WidgetContentEventManager
     */
    var SketchfabEventManager = function SketchfabEventManager() {

        this.updateEventList({});
    };

    return SketchfabEventManager.extend(
        'SketchfabEventManager', {},
        WidgetContentEventManager.prototype
    );
});
