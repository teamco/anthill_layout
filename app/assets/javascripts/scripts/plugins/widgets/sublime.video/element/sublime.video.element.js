/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element'
], function defineSublimeVideoElement(BaseElement) {

    /**
     * Define SublimeVideo Element
     * @param view
     * @param opts
     * @returns {SublimeVideoElement}
     * @constructor
     * @class SublimeVideoElement
     * @extends BaseElement
     */
    var SublimeVideoElement = function SublimeVideoElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('sublime.video', {resource: '/widgets'});

        return this;
    };

    return SublimeVideoElement.extend('SublimeVideoElement', {

        /**
         * Render Embedded content
         * @memberOf SublimeVideoElement
         * @param {string} url
         */
        renderEmbeddedContent: function renderEmbeddedContent(url) {
            this.$.append(
                this.renderIframe(url)
            );
        }

    }, BaseElement.prototype);

});
