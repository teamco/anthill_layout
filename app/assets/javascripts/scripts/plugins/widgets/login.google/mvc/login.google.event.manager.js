/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'plugins/widgets/widget.content.event.manager'
], function defineLoginGoogleEventManager(WidgetContentEventManager) {

    /**
     * Define LoginGoogle event manager
     * @class LoginGoogleEventManager
     * @constructor
     * @extends BaseEvent
     * @extends WidgetContentEventManager
     */
    var LoginGoogleEventManager = function LoginGoogleEventManager() {

        this.updateEventList({});
    };

    return LoginGoogleEventManager.extend('LoginGoogleEventManager', {

    }, WidgetContentEventManager.prototype);
});