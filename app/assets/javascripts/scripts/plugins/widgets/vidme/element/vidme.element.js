/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element'
], function defineVidmeElement(BaseElement) {

    /**
     * Define Vidme Element
     * @param view
     * @param opts
     * @returns {VidmeElement}
     * @constructor
     * @class VidmeElement
     * @extends BaseElement
     */
    var VidmeElement = function VidmeElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('vidme', {resource: '/widgets'});

        return this;
    };

    return VidmeElement.extend('VidmeElement', {

        /**
         * Render Embedded content
         * @member VidmeElement
         * @param {string} url
         */
        renderEmbeddedContent: function renderEmbeddedContent(url) {
            this.$.append(
                this.renderIframe(url)
            );
        }

    }, BaseElement.prototype);

});
