/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'plugins/widgets/widget.content.event.manager'
], function defineTutByEventManager(WidgetContentEventManager) {

    /**
     * Define TutBy event manager
     * @class TutByEventManager
     * @constructor
     * @extends BaseEvent
     * @extends WidgetContentEventManager
     */
    var TutByEventManager = function TutByEventManager() {

        this.updateEventList({});
    };

    return TutByEventManager.extend(
        'TutByEventManager', {},
        WidgetContentEventManager.prototype
    );
});
