/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'plugins/widgets/widget.content.event.manager'
], function definePosttoolEventManager(WidgetContentEventManager) {

    /**
     * Define Posttool event manager
     * @class PosttoolEventManager
     * @constructor
     * @extends BaseEvent
     * @extends WidgetContentEventManager
     */
    var PosttoolEventManager = function PosttoolEventManager() {

        this.updateEventList({});
    };

    return PosttoolEventManager.extend('PosttoolEventManager', {

    }, WidgetContentEventManager.prototype);
});