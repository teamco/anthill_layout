/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element'
], function defineMetaUaElement(BaseElement) {

    /**
     * Define MetaUa Element
     * @param view
     * @param opts
     * @returns {MetaUaElement}
     * @constructor
     * @class MetaUaElement
     * @extends BaseElement
     */
    var MetaUaElement = function MetaUaElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('meta.ua', {resource: '/widgets'});

        return this;
    };

    return MetaUaElement.extend('MetaUaElement', {

        /**
         * Render Embedded content
         * @member MetaUaElement
         * @param {string} url
         */
        renderEmbeddedContent: function renderEmbeddedContent(url) {
            this.$.append(
                this.renderIframe(url)
            );
        }

    }, BaseElement.prototype);

});
