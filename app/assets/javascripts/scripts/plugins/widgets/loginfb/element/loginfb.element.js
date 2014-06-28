/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element'
], function defineLoginfbElement(BaseElement) {

    /**
     * Define Loginfb Element
     * @param view
     * @param opts
     * @returns {LoginfbElement}
     * @constructor
     * @class LoginfbElement
     * @extends BaseElement
     */
    var LoginfbElement = function LoginfbElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('loginfb', {resource: '/widgets'});

        return this;
    };

    return LoginfbElement.extend('LoginfbElement', {

        /**
         * Render Embedded content
         * @member LoginfbElement
         */
        renderEmbeddedContent: function renderEmbeddedContent() {
            var $element = this;
            var $facebookLogin = '<a class="facebook_signin sign_in"><label>Sign In with Facebook</label></a>';

            $element.view.controller.clearParentThumbnail();
            $element.$.append(
                $facebookLogin
            );
        }

    }, BaseElement.prototype);

});