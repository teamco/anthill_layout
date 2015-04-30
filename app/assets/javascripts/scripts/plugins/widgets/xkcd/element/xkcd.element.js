/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element'
], function defineXkcdElement(BaseElement) {

    /**
     * Define Xkcd Element
     * @param view
     * @param opts
     * @returns {XkcdElement}
     * @constructor
     * @class XkcdElement
     * @extends BaseElement
     */
    var XkcdElement = function XkcdElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('xkcd', {resource: '/widgets'});

        return this;
    };

    return XkcdElement.extend('XkcdElement', {

        /**
         * Render Embedded content
         * @memberOf XkcdElement
         * @param {string} embed
         */
        renderEmbeddedContent: function renderEmbeddedContent(embed) {
            this.$.append(
                $('<img />').attr({
                    src: embed
                })
            );
        }

    }, BaseElement.prototype);

});
