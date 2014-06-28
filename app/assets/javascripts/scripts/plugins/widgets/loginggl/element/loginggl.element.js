/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element'
], function defineLogingglElement(BaseElement) {

    /**
     * Define Loginggl Element
     * @param view
     * @param opts
     * @returns {LogingglElement}
     * @constructor
     * @class LogingglElement
     * @extends BaseElement
     */
    var LogingglElement = function LogingglElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('loginggl', {resource: '/widgets'});

        return this;
    };

    return LogingglElement.extend('LogingglElement', {

        /**
         * Render Embedded content
         * @member LogingglElement
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