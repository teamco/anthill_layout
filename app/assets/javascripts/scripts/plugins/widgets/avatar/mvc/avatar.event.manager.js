/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'plugins/widgets/widget.content.event.manager'
], function defineAvatarEventManager(WidgetContentEventManager) {

    /**
     * Define Avatar event manager
     * @class AvatarEventManager
     * @constructor
     * @extends BaseEvent
     * @extends WidgetContentEventManager
     */
    var AvatarEventManager = function AvatarEventManager() {

        this.updateEventList({});
    };

    return AvatarEventManager.extend('AvatarEventManager', {

    }, WidgetContentEventManager.prototype);
});