/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element'
], function defineYapFilesElement(BaseElement) {

    /**
     * Define YapFiles Element
     * @param view
     * @param opts
     * @returns {YapFilesElement}
     * @constructor
     * @class YapFilesElement
     * @extends BaseElement
     */
    var YapFilesElement = function YapFilesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('yap.files', {resource: '/widgets'});

        return this;
    };

    return YapFilesElement.extend('YapFilesElement', {

        /**
         * Render Embedded content
         * @memberOf YapFilesElement
         * @param {string} embed
         */
        renderEmbeddedContent: function renderEmbeddedContent(embed) {
            this.$.append(
                this.renderObject(embed)
            );
        }

    }, BaseElement.prototype);

});
