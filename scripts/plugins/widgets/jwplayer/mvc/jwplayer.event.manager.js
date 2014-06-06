/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'plugins/widgets/widget.content.event.manager'
], function defineJwplayerEventManager(WidgetContentEventManager) {

    /**
     * Define Jwplayer event manager
     * @class JwplayerEventManager
     * @constructor
     * @extends BaseEvent
     * @extends WidgetContentEventManager
     */
    var JwplayerEventManager = function JwplayerEventManager() {

        this.updateEventList({});
    };

    return JwplayerEventManager.extend('JwplayerEventManager', {

    }, WidgetContentEventManager.prototype);
});