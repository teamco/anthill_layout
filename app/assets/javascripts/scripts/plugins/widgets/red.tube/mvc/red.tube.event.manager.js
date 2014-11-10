/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'plugins/widgets/widget.content.event.manager'
], function defineRedTubeEventManager(WidgetContentEventManager) {

    /**
     * Define RedTube event manager
     * @class RedTubeEventManager
     * @constructor
     * @extends BaseEvent
     * @extends WidgetContentEventManager
     */
    var RedTubeEventManager = function RedTubeEventManager() {

        this.updateEventList({});
    };

    return RedTubeEventManager.extend('RedTubeEventManager', {

    }, WidgetContentEventManager.prototype);
});
