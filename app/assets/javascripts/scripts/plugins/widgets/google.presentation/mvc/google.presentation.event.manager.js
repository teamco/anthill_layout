/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'plugins/widgets/widget.content.event.manager'
], function defineGooglePresentationEventManager(WidgetContentEventManager) {

    /**
     * Define GooglePresentation event manager
     * @class GooglePresentationEventManager
     * @constructor
     * @extends BaseEvent
     * @extends WidgetContentEventManager
     */
    var GooglePresentationEventManager = function GooglePresentationEventManager() {

        this.updateEventList({});
    };

    return GooglePresentationEventManager.extend('GooglePresentationEventManager', {

    }, WidgetContentEventManager.prototype);
});
