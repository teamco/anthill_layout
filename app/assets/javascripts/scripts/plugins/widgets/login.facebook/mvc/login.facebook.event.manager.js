/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'plugins/widgets/widget.content.event.manager'
], function defineLoginFacebookEventManager(WidgetContentEventManager) {

    /**
     * Define LoginFacebook event manager
     * @class LoginFacebookEventManager
     * @constructor
     * @extends BaseEvent
     * @extends WidgetContentEventManager
     */
    var LoginFacebookEventManager = function LoginFacebookEventManager() {

        this.updateEventList({});
    };

    return LoginFacebookEventManager.extend('LoginFacebookEventManager', {

    }, WidgetContentEventManager.prototype);
});