/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element'
], function defineScreenrElement(BaseElement) {

    /**
     * Define Screenr Element
     * @param view
     * @param opts
     * @returns {ScreenrElement}
     * @constructor
     * @class ScreenrElement
     * @extends BaseElement
     */
    var ScreenrElement = function ScreenrElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('screenr', {resource: '/widgets'});

        return this;
    };

    return ScreenrElement.extend('ScreenrElement', {

        /**
         * Render Embedded content
         * @member ScreenrElement
         * @param {string} url
         */
        renderEmbeddedContent: function renderEmbeddedContent(url) {
            this.$.append(
                this.renderIframe(url)
            );
        }

    }, BaseElement.prototype);

});
