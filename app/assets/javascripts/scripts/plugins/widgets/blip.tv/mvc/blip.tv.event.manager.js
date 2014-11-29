/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'plugins/widgets/widget.content.event.manager'
], function defineBlipTvEventManager(WidgetContentEventManager) {

    /**
     * Define BlipTv event manager
     * @class BlipTvEventManager
     * @constructor
     * @extends BaseEvent
     * @extends WidgetContentEventManager
     */
    var BlipTvEventManager = function BlipTvEventManager() {

        this.updateEventList({});
    };

    return BlipTvEventManager.extend('BlipTvEventManager', {

    }, WidgetContentEventManager.prototype);
});
