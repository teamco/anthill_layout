/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'plugins/widgets/widget.content.event.manager'
], function definePostToolEventManager(WidgetContentEventManager) {

    /**
     * Define PostTool event manager
     * @class PostToolEventManager
     * @constructor
     * @extends BaseEvent
     * @extends WidgetContentEventManager
     */
    var PostToolEventManager = function PostToolEventManager() {

        this.updateEventList({});
    };

    return PostToolEventManager.extend('PostToolEventManager', {

    }, WidgetContentEventManager.prototype);
});