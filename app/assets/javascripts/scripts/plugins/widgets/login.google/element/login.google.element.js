/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element'
], function defineLoginGoogleElement(PluginElement) {

    /**
     * Define LoginGoogle Element
     * @param view
     * @param opts
     * @returns {LoginGoogleElement}
     * @constructor
     * @class LoginGoogleElement
     * @extends PluginElement
     */
    var LoginGoogleElement = function LoginGoogleElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('login.google', {resource: '/widgets'});

        return this;
    };

    return LoginGoogleElement.extend('LoginGoogleElement', {

        /**
         * Render Embedded content
         * @memberOf LoginGoogleElement
         */
        renderEmbeddedContent: function renderEmbeddedContent() {
             var $element = this;
            var $facebookLogin =  '<a class="google_signin sign_in"><label>Sign In with Google</label></a>';
            
            $element.view.controller.clearParentThumbnail();
            $element.$.append(
                $facebookLogin
            );
        }

    }, PluginElement.prototype);

});