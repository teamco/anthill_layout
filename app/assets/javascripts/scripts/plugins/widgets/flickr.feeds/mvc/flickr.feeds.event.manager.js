/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'plugins/widgets/widget.content.event.manager'
], function defineFlickrFeedsEventManager(WidgetContentEventManager) {

    /**
     * Define FlickrFeeds event manager
     * @class FlickrFeedsEventManager
     * @constructor
     * @extends BaseEvent
     * @extends WidgetContentEventManager
     */
    var FlickrFeedsEventManager = function FlickrFeedsEventManager() {

        this.updateEventList({});
    };

    return FlickrFeedsEventManager.extend('FlickrFeedsEventManager', {

    }, WidgetContentEventManager.prototype);
});
