/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element'
], function defineTwentyFourVideoElement(BaseElement) {

    /**
     * Define TwentyFourVideo Element
     * @param view
     * @param opts
     * @returns {TwentyFourVideoElement}
     * @constructor
     * @class TwentyFourVideoElement
     * @extends BaseElement
     */
    var TwentyFourVideoElement = function TwentyFourVideoElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('twenty.four.video', {resource: '/widgets'});

        return this;
    };

    return TwentyFourVideoElement.extend('TwentyFourVideoElement', {

        /**
         * Render Embedded content
         * @memberOf TwentyFourVideoElement
         * @param {string} embed
         */
        renderEmbeddedContent: function renderEmbeddedContent(embed) {
            this.$.append(
                this.renderObject(embed)
            );
        }

    }, BaseElement.prototype);

});
