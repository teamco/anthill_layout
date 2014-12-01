/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element'
], function defineOnePlusOneElement(BaseElement) {

    /**
     * Define OnePlusOne Element
     * @param view
     * @param opts
     * @returns {OnePlusOneElement}
     * @constructor
     * @class OnePlusOneElement
     * @extends BaseElement
     */
    var OnePlusOneElement = function OnePlusOneElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('one.plus.one', {resource: '/widgets'});

        return this;
    };

    return OnePlusOneElement.extend('OnePlusOneElement', {

        /**
         * Render Embedded content
         * @member OnePlusOneElement
         * @param {string} embed
         */
        renderEmbeddedContent: function renderEmbeddedContent(embed) {
            this.$.append(
                this.renderEmbed(embed)
            );
        }

    }, BaseElement.prototype);

});
