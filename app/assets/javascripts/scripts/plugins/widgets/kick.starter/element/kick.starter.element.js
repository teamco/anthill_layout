/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element'
], function defineKickStarterElement(BaseElement) {

    /**
     * Define KickStarter Element
     * @param view
     * @param opts
     * @returns {KickStarterElement}
     * @constructor
     * @class KickStarterElement
     * @extends BaseElement
     */
    var KickStarterElement = function KickStarterElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('kick.starter', {resource: '/widgets'});

        return this;
    };

    return KickStarterElement.extend('KickStarterElement', {

        /**
         * Render Embedded content
         * @memberOf KickStarterElement
         * @param {string} url
         */
        renderEmbeddedContent: function renderEmbeddedContent(url) {
            this.$.append(
                this.renderIframe(url)
            );
        }

    }, BaseElement.prototype);

});
