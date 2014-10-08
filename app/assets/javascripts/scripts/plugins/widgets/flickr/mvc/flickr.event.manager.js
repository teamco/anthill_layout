/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'plugins/widgets/widget.content.event.manager'
], function defineFlickrEventManager(WidgetContentEventManager) {

    /**
     * Define Flickr event manager
     * @class FlickrEventManager
     * @constructor
     * @extends BaseEvent
     * @extends WidgetContentEventManager
     */
    var FlickrEventManager = function FlickrEventManager() {

        this.updateEventList({});
    };

    return FlickrEventManager.extend('FlickrEventManager', {

    }, WidgetContentEventManager.prototype);
});
