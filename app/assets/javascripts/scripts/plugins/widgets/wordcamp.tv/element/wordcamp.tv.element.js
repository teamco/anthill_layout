/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element'
], function defineWordcampTvElement(BaseElement) {

    /**
     * Define WordcampTv Element
     * @param view
     * @param opts
     * @returns {WordcampTvElement}
     * @constructor
     * @class WordcampTvElement
     * @extends BaseElement
     */
    var WordcampTvElement = function WordcampTvElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('wordcamp.tv', {resource: '/widgets'});

        return this;
    };

    return WordcampTvElement.extend('WordcampTvElement', {

        /**
         * Render Embedded content
         * @memberOf WordcampTvElement
         * @param {string} embed
         */
        renderEmbeddedContent: function renderEmbeddedContent(embed) {
            this.$.append(
                this.renderEmbed(embed)
            );
        }

    }, BaseElement.prototype);

});
