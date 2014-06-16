/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/element'
], function defineVimeoElement(BaseElement) {

    /**
     * Define Vimeo Element
     * @param view
     * @param opts
     * @returns {VimeoElement}
     * @constructor
     * @class VimeoElement
     * @extends BaseElement
     */
    var VimeoElement = function VimeoElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('vimeo', {resource: '/widgets'});

        return this;
    };

    return VimeoElement.extend('VimeoElement', {

        /**
         * Render Embedded content
         * @member VimeoElement
         * @param {string} iframe
         */
        renderEmbeddedContent: function renderEmbeddedContent(iframe) {
            this.$.append(iframe);
        }

    }, BaseElement.prototype);

});