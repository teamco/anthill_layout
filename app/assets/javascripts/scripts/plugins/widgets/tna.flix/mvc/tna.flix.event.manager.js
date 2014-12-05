/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'plugins/widgets/widget.content.event.manager'
], function defineTnaFlixEventManager(WidgetContentEventManager) {

    /**
     * Define TnaFlix event manager
     * @class TnaFlixEventManager
     * @constructor
     * @extends BaseEvent
     * @extends WidgetContentEventManager
     */
    var TnaFlixEventManager = function TnaFlixEventManager() {

        this.updateEventList({});
    };

    return TnaFlixEventManager.extend('TnaFlixEventManager', {

    }, WidgetContentEventManager.prototype);
});
