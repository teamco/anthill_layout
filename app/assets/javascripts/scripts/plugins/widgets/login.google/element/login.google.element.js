/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element'
], function defineLoginGoogleElement(BaseElement) {

    /**
     * Define LoginGoogle Element
     * @param view
     * @param opts
     * @returns {LoginGoogleElement}
     * @constructor
     * @class LoginGoogleElement
     * @extends BaseElement
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
         * @member LoginGoogleElement
         */
        renderEmbeddedContent: function renderEmbeddedContent() {
             var $element = this;
            var $facebookLogin =  '<a class="google_signin sign_in"><label>Sign In with Google</label></a>';
            
            $element.view.controller.clearParentThumbnail();
            $element.$.append(
                $facebookLogin
            );
        }

    }, BaseElement.prototype);

});