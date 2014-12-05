/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'plugins/widgets/widget.content.event.manager'
], function defineExtremeTubeEventManager(WidgetContentEventManager) {

    /**
     * Define ExtremeTube event manager
     * @class ExtremeTubeEventManager
     * @constructor
     * @extends BaseEvent
     * @extends WidgetContentEventManager
     */
    var ExtremeTubeEventManager = function ExtremeTubeEventManager() {

        this.updateEventList({});
    };

    return ExtremeTubeEventManager.extend('ExtremeTubeEventManager', {

    }, WidgetContentEventManager.prototype);
});
