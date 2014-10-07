/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'plugins/widgets/widget.content.event.manager'
], function defineCoubEventManager(WidgetContentEventManager) {

    /**
     * Define Coub event manager
     * @class CoubEventManager
     * @constructor
     * @extends BaseEvent
     * @extends WidgetContentEventManager
     */
    var CoubEventManager = function CoubEventManager() {

        this.updateEventList({});
    };

    return CoubEventManager.extend('CoubEventManager', {

    }, WidgetContentEventManager.prototype);
});
