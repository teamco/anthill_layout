/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'plugins/widgets/widget.content.event.manager'
], function defineLiveLeakEventManager(WidgetContentEventManager) {

    /**
     * Define LiveLeak event manager
     * @class LiveLeakEventManager
     * @constructor
     * @extends BaseEvent
     * @extends WidgetContentEventManager
     */
    var LiveLeakEventManager = function LiveLeakEventManager() {

        this.updateEventList({});
    };

    return LiveLeakEventManager.extend('LiveLeakEventManager', {

    }, WidgetContentEventManager.prototype);
});
