/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'plugins/widgets/widget.content.event.manager'
], function defineYouPornEventManager(WidgetContentEventManager) {

    /**
     * Define YouPorn event manager
     * @class YouPornEventManager
     * @constructor
     * @extends BaseEvent
     * @extends WidgetContentEventManager
     */
    var YouPornEventManager = function YouPornEventManager() {

        this.updateEventList({});
    };

    return YouPornEventManager.extend('YouPornEventManager', {

    }, WidgetContentEventManager.prototype);
});
