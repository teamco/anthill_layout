/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'plugins/widgets/widget.content.event.manager'
], function defineGiphyEventManager(WidgetContentEventManager) {

    /**
     * Define Giphy event manager
     * @class GiphyEventManager
     * @constructor
     * @extends BaseEvent
     * @extends WidgetContentEventManager
     */
    var GiphyEventManager = function GiphyEventManager() {

        this.updateEventList({});
    };

    return GiphyEventManager.extend('GiphyEventManager', {

    }, WidgetContentEventManager.prototype);
});
