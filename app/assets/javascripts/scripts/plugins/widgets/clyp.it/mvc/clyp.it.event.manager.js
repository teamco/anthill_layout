/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'plugins/widgets/widget.content.event.manager'
], function defineClypItEventManager(WidgetContentEventManager) {

    /**
     * Define ClypIt event manager
     * @class ClypItEventManager
     * @constructor
     * @extends BaseEvent
     * @extends WidgetContentEventManager
     */
    var ClypItEventManager = function ClypItEventManager() {

        this.updateEventList({});
    };

    return ClypItEventManager.extend(
        'ClypItEventManager', {},
        WidgetContentEventManager.prototype
    );
});
