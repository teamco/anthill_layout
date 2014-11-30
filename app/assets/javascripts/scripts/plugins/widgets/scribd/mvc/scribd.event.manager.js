/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'plugins/widgets/widget.content.event.manager'
], function defineScribdEventManager(WidgetContentEventManager) {

    /**
     * Define Scribd event manager
     * @class ScribdEventManager
     * @constructor
     * @extends BaseEvent
     * @extends WidgetContentEventManager
     */
    var ScribdEventManager = function ScribdEventManager() {

        this.updateEventList({});
    };

    return ScribdEventManager.extend('ScribdEventManager', {

    }, WidgetContentEventManager.prototype);
});
