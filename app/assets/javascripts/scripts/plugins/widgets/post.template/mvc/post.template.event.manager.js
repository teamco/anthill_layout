/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'plugins/widgets/widget.content.event.manager'
], function definePostTemplateEventManager(WidgetContentEventManager) {

    /**
     * Define PostTemplate event manager
     * @class PostTemplateEventManager
     * @constructor
     * @extends BaseEvent
     * @extends WidgetContentEventManager
     */
    var PostTemplateEventManager = function PostTemplateEventManager() {

        this.updateEventList({});
    };

    return PostTemplateEventManager.extend('PostTemplateEventManager', {

    }, WidgetContentEventManager.prototype);
});