/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element'
], function defineRutubeElement(BaseElement) {

    /**
     * Define Rutube Element
     * @param view
     * @param opts
     * @returns {RutubeElement}
     * @constructor
     * @class RutubeElement
     * @extends BaseElement
     */
    var RutubeElement = function RutubeElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('rutube', {resource: '/widgets'});

        return this;
    };

    return RutubeElement.extend('RutubeElement', {

        /**
         * Render Embedded content
         * @memberOf RutubeElement
         * @param {string} embed
         */
        renderEmbeddedContent: function renderEmbeddedContent(embed) {

            /**
             * Get scope
             * @type {Rutube}
             */
            var scope = this.view.scope;

            if (!embed) {
                scope.logger.debug('Add rutube content');
                return false;
            }

            /**
             * Define embedded mask
             * @type {string}
             */
            var iframe = '<iframe width="100%" height="100%" scrolling="no" allowtransparency="true" src="{{src}}" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowfullscreen>',
                url = $(embed).attr('src');

            if (!url) {
                scope.logger.warn('Undefined url', embed, url);
                return false;
            }

            this.$.append(
                iframe.replace(/{{src}}/, url)
            );
        }

    }, BaseElement.prototype);

});