/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element'
], function defineXVideosElement(BaseElement) {

    /**
     * Define XVideos Element
     * @param view
     * @param opts
     * @returns {XVideosElement}
     * @constructor
     * @class XVideosElement
     * @extends BaseElement
     */
    var XVideosElement = function XVideosElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('x.videos', {resource: '/widgets'});

        return this;
    };

    return XVideosElement.extend('XVideosElement', {

        /**
         * Render Embedded content
         * @member XVideosElement
         * @param {string} iframe
         */
        renderEmbeddedContent: function renderEmbeddedContent(iframe) {
            this.$.append(iframe);
        }

    }, BaseElement.prototype);

});
