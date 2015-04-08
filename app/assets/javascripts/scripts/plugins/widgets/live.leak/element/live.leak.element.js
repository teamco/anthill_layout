/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element'
], function defineLiveLeakElement(BaseElement) {

    /**
     * Define LiveLeak Element
     * @param view
     * @param opts
     * @returns {LiveLeakElement}
     * @constructor
     * @class LiveLeakElement
     * @extends BaseElement
     */
    var LiveLeakElement = function LiveLeakElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('live.leak', {resource: '/widgets'});

        return this;
    };

    return LiveLeakElement.extend('LiveLeakElement', {

        /**
         * Render Embedded content
         * @memberOf LiveLeakElement
         * @param {string} url
         */
        renderEmbeddedContent: function renderEmbeddedContent(url) {
            this.$.append(
                this.renderIframe(url)
            );
        }

    }, BaseElement.prototype);

});
