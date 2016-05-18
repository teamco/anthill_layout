/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'plugins/widgets/widget.content.event.manager'
], function defineGiladEventManager(WidgetContentEventManager) {

    /**
     * Define Gilad event manager
     * @class GiladEventManager
     * @constructor
     * @extends BaseEvent
     * @extends WidgetContentEventManager
     */
    var GiladEventManager = function GiladEventManager() {

        this.updateEventList({});
    };

    return GiladEventManager.extend(
        'GiladEventManager', {},
        WidgetContentEventManager.prototype
    );
});
