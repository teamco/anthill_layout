/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'plugins/widgets/widget.content.event.manager'
], function defineGooglePlusEventManager(WidgetContentEventManager) {

    /**
     * Define GooglePlus event manager
     * @class GooglePlusEventManager
     * @constructor
     * @extends BaseEvent
     * @extends WidgetContentEventManager
     */
    var GooglePlusEventManager = function GooglePlusEventManager() {

        this.updateEventList({});
    };

    return GooglePlusEventManager.extend('GooglePlusEventManager', {

    }, WidgetContentEventManager.prototype);
});
