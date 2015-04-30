/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element'
], function defineHowcastElement(BaseElement) {

    /**
     * Define Howcast Element
     * @param view
     * @param opts
     * @returns {HowcastElement}
     * @constructor
     * @class HowcastElement
     * @extends BaseElement
     */
    var HowcastElement = function HowcastElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('howcast', {resource: '/widgets'});

        return this;
    };

    return HowcastElement.extend('HowcastElement', {

        /**
         * Render Embedded content
         * @memberOf HowcastElement
         * @param {string} embed
         */
        renderEmbeddedContent: function renderEmbeddedContent(embed) {
            this.$.append(
                this.renderObject(embed)
            );
        }

    }, BaseElement.prototype);

});
