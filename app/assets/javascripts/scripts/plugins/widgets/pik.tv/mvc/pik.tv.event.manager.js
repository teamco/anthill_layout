/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'plugins/widgets/widget.content.event.manager'
], function definePikTvEventManager(WidgetContentEventManager) {

    /**
     * Define PikTv event manager
     * @class PikTvEventManager
     * @constructor
     * @extends BaseEvent
     * @extends WidgetContentEventManager
     */
    var PikTvEventManager = function PikTvEventManager() {

        this.updateEventList({});
    };

    return PikTvEventManager.extend('PikTvEventManager', {

    }, WidgetContentEventManager.prototype);
});
