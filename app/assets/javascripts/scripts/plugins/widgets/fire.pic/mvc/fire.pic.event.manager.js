/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'plugins/widgets/widget.content.event.manager'
], function defineFirePicEventManager(WidgetContentEventManager) {

    /**
     * Define FirePic event manager
     * @class FirePicEventManager
     * @constructor
     * @extends BaseEvent
     * @extends WidgetContentEventManager
     */
    var FirePicEventManager = function FirePicEventManager() {

        this.updateEventList({});
    };

    return FirePicEventManager.extend('FirePicEventManager', {

    }, WidgetContentEventManager.prototype);
});
