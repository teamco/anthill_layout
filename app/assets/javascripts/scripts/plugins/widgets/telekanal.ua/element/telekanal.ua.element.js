/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element'
], function defineTelekanalUaElement(BaseElement) {

    /**
     * Define TelekanalUa Element
     * @param view
     * @param opts
     * @returns {TelekanalUaElement}
     * @constructor
     * @class TelekanalUaElement
     * @extends BaseElement
     */
    var TelekanalUaElement = function TelekanalUaElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('telekanal.ua', {resource: '/widgets'});

        return this;
    };

    return TelekanalUaElement.extend('TelekanalUaElement', {

        /**
         * Render Embedded content
         * @memberOf TelekanalUaElement
         * @param {string} url
         */
        renderEmbeddedContent: function renderEmbeddedContent(url) {
            this.$.append(
                this.renderIframe(url)
            );
        }

    }, BaseElement.prototype);

});
