/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element'
], function defineHromadskeTvElement(BaseElement) {

    /**
     * Define HromadskeTv Element
     * @param view
     * @param opts
     * @returns {HromadskeTvElement}
     * @constructor
     * @class HromadskeTvElement
     * @extends BaseElement
     */
    var HromadskeTvElement = function HromadskeTvElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('hromadske.tv', {resource: '/widgets'});

        return this;
    };

    return HromadskeTvElement.extend('HromadskeTvElement', {

        /**
         * Render Embedded content
         * @member HromadskeTvElement
         * @param {string} url
         */
        renderEmbeddedContent: function renderEmbeddedContent(url) {
            this.$.append(
                this.renderIframe(url, {
                    id: "ytplayer",
                    type: "text/html"
                })
            );
        }

    }, BaseElement.prototype);

});
