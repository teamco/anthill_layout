/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element'
], function defineDeviantArtElement(BaseElement) {

    /**
     * Define DeviantArt Element
     * @param view
     * @param opts
     * @returns {DeviantArtElement}
     * @constructor
     * @class DeviantArtElement
     * @extends BaseElement
     */
    var DeviantArtElement = function DeviantArtElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('deviant.art', {resource: '/widgets'});

        return this;
    };

    return DeviantArtElement.extend('DeviantArtElement', {

        /**
         * Render Embedded content
         * @member DeviantArtElement
         * @param {string} embed
         */
        renderEmbeddedContent: function renderEmbeddedContent(embed) {

            if (!embed) {
                return false;
            }

            this.$.append(
                this.renderObject($(embed)[0])
            );
        }

    }, BaseElement.prototype);

});
