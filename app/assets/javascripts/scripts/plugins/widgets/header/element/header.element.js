/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element'
], function defineHeaderElement(BaseElement) {

    /**
     * Define Header Element
     * @param view
     * @param opts
     * @returns {HeaderElement}
     * @constructor
     * @class HeaderElement
     * @extends BaseElement
     */
    var HeaderElement = function HeaderElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('header', {
            resource: '/widgets'
        });

        return this;
    };

    return HeaderElement.extend('HeaderElement', {

        /**
         * Render Embedded content
         * @member HeaderElement
         */


        renderEmbeddedContent: function renderEmbeddedContent() {
            var $element = this;
            $element.view.controller.clearParentThumbnail();
            var $logoutButtonElement = '<a class="logoutBtn" title="Exit your accout">Logout</a>';
            var $mainLogo = '<a class="mainLogo"></a>'
            var $name = '<h1>I DOG YOU</h1>';
            $element.$.append(
                $logoutButtonElement, $mainLogo, $name
            );
            // TODO
        }

    }, BaseElement.prototype);

});