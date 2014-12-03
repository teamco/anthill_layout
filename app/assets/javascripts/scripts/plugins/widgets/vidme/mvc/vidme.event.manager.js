/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'plugins/widgets/widget.content.event.manager'
], function defineVidmeEventManager(WidgetContentEventManager) {

    /**
     * Define Vidme event manager
     * @class VidmeEventManager
     * @constructor
     * @extends BaseEvent
     * @extends WidgetContentEventManager
     */
    var VidmeEventManager = function VidmeEventManager() {

        this.updateEventList({});
    };

    return VidmeEventManager.extend('VidmeEventManager', {

    }, WidgetContentEventManager.prototype);
});
