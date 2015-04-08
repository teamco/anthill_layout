/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element'
], function defineYouPornElement(BaseElement) {

    /**
     * Define YouPorn Element
     * @param view
     * @param opts
     * @returns {YouPornElement}
     * @constructor
     * @class YouPornElement
     * @extends BaseElement
     */
    var YouPornElement = function YouPornElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('you.porn', {resource: '/widgets'});

        return this;
    };

    return YouPornElement.extend('YouPornElement', {

        /**
         * Render Embedded content
         * @memberOf YouPornElement
         * @param {string} url
         */
        renderEmbeddedContent: function renderEmbeddedContent(url) {
            this.$.append(
                this.renderIframe(url)
            );
        }

    }, BaseElement.prototype);

});
