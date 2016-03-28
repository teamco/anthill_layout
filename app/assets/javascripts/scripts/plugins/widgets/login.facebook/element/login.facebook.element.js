/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element'
], function defineLoginFacebookElement(PluginElement) {

    /**
     * Define LoginFacebook Element
     * @param view
     * @param opts
     * @returns {LoginFacebookElement}
     * @constructor
     * @class LoginFacebookElement
     * @extends PluginElement
     */
    var LoginFacebookElement = function LoginFacebookElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('login.facebook', {resource: '/widgets'});

        return this;
    };

    return LoginFacebookElement.extend('LoginFacebookElement', {

        /**
         * Render Embedded content
         * @memberOf LoginFacebookElement
         */
        renderEmbeddedContent: function renderEmbeddedContent() {
            var $element = this;
            var $facebookLogin = '<a class="facebook_signin sign_in"><label>Sign In with Facebook</label></a>';

            $element.view.controller.clearParentThumbnail();
            $element.$.append(
                $facebookLogin
            );
        }

    }, PluginElement.prototype);

});