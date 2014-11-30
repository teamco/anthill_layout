/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'plugins/widgets/widget.content.event.manager'
], function defineRdioEventManager(WidgetContentEventManager) {

    /**
     * Define Rdio event manager
     * @class RdioEventManager
     * @constructor
     * @extends BaseEvent
     * @extends WidgetContentEventManager
     */
    var RdioEventManager = function RdioEventManager() {

        this.updateEventList({});
    };

    return RdioEventManager.extend('RdioEventManager', {

    }, WidgetContentEventManager.prototype);
});
