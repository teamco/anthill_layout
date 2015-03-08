/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element'
], function defineFirePicElement(BaseElement) {

    /**
     * Define FirePic Element
     * @param view
     * @param opts
     * @returns {FirePicElement}
     * @constructor
     * @class FirePicElement
     * @extends BaseElement
     */
    var FirePicElement = function FirePicElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('fire.pic', {resource: '/widgets'});

        return this;
    };

    return FirePicElement.extend('FirePicElement', {

        /**
         * Render Embedded content
         * @member FirePicElement
         * @param {string} url
         */
        renderEmbeddedContent: function renderEmbeddedContent(url) {
            this.$.append(
                $('<img />').attr({
                    src: url
                })
            );
        }

    }, BaseElement.prototype);

});
