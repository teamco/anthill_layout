/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element'
], function defineTnaFlixElement(BaseElement) {

    /**
     * Define TnaFlix Element
     * @param view
     * @param opts
     * @returns {TnaFlixElement}
     * @constructor
     * @class TnaFlixElement
     * @extends BaseElement
     */
    var TnaFlixElement = function TnaFlixElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('tna.flix', {resource: '/widgets'});

        return this;
    };

    return TnaFlixElement.extend('TnaFlixElement', {

        /**
         * Render Embedded content
         * @memberOf TnaFlixElement
         * @param {string} url
         */
        renderEmbeddedContent: function renderEmbeddedContent(url) {
            this.$.append(
                this.renderIframe(url)
            );
        }

    }, BaseElement.prototype);

});
