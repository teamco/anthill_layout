/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'plugins/widgets/widget.content.event.manager'
], function definePassportEventManager(WidgetContentEventManager) {

    /**
     * Define Passport event manager
     * @class PassportEventManager
     * @constructor
     * @extends BaseEvent
     * @extends WidgetContentEventManager
     */
    var PassportEventManager = function PassportEventManager() {

        this.updateEventList({});
    };

    return PassportEventManager.extend('PassportEventManager', {

    }, WidgetContentEventManager.prototype);
});