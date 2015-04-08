/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element'
], function defineMyWorldElement(BaseElement) {

    /**
     * Define MyWorld Element
     * @param view
     * @param opts
     * @returns {MyWorldElement}
     * @constructor
     * @class MyWorldElement
     * @extends BaseElement
     */
    var MyWorldElement = function MyWorldElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('my.world', {resource: '/widgets'});

        return this;
    };

    return MyWorldElement.extend('MyWorldElement', {

        /**
         * Render Embedded content
         * @memberOf MyWorldElement
         * @param {string} url
         */
        renderEmbeddedContent: function renderEmbeddedContent(url) {
            this.$.append(
                this.renderIframe(url)
            );
        }

    }, BaseElement.prototype);

});
