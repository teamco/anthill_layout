/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element'
], function defineMixcloudElement(BaseElement) {

    /**
     * Define Mixcloud Element
     * @param view
     * @param opts
     * @returns {MixcloudElement}
     * @constructor
     * @class MixcloudElement
     * @extends BaseElement
     */
    var MixcloudElement = function MixcloudElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('mixcloud', {resource: '/widgets'});

        return this;
    };

    return MixcloudElement.extend('MixcloudElement', {

        /**
         * Render Embedded content
         * @memberOf MixcloudElement
         * @param {string} url
         */
        renderEmbeddedContent: function renderEmbeddedContent(url) {
            this.$.append(
                this.renderIframe(url)
            );
        }

    }, BaseElement.prototype);

});
