/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element'
], function definePornhubElement(BaseElement) {

    /**
     * Define Pornhub Element
     * @param view
     * @param opts
     * @returns {PornhubElement}
     * @constructor
     * @class PornhubElement
     * @extends BaseElement
     */
    var PornhubElement = function PornhubElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('pornhub', {resource: '/widgets'});

        return this;
    };

    return PornhubElement.extend('PornhubElement', {

        /**
         * Render Embedded content
         * @memberOf PornhubElement
         * @param {string} url
         */
        renderEmbeddedContent: function renderEmbeddedContent(url) {
            this.$.append(
                this.renderIframe(url)
            );
        }

    }, BaseElement.prototype);

});
