/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'plugins/widgets/widget.content.event.manager'
], function defineTinyPicEventManager(WidgetContentEventManager) {

    /**
     * Define TinyPic event manager
     * @class TinyPicEventManager
     * @constructor
     * @extends BaseEvent
     * @extends WidgetContentEventManager
     */
    var TinyPicEventManager = function TinyPicEventManager() {

        this.updateEventList({});
    };

    return TinyPicEventManager.extend('TinyPicEventManager', {

    }, WidgetContentEventManager.prototype);
});
