/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element'
], function defineTubeEightElement(BaseElement) {

    /**
     * Define TubeEight Element
     * @param view
     * @param opts
     * @returns {TubeEightElement}
     * @constructor
     * @class TubeEightElement
     * @extends BaseElement
     */
    var TubeEightElement = function TubeEightElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('tube.eight', {resource: '/widgets'});

        return this;
    };

    return TubeEightElement.extend('TubeEightElement', {

        /**
         * Render Embedded content
         * @memberOf TubeEightElement
         * @param {string} url
         */
        renderEmbeddedContent: function renderEmbeddedContent(url) {
            this.$.append(
                this.renderIframe(url)
            );
        }

    }, BaseElement.prototype);

});
