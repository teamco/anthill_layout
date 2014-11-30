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
         * @member WordcampTvElement
         * @param {string} embed
         */
        renderEmbeddedContent: function renderEmbeddedContent(embed) {

            // Get $embed
            var $embed = $(embed),
                opts = {
                    wmode: 'direct',
                    width: '100%',
                    height: '100%',
                    seamlesstabbing: true,
                    allowfullscreen: true,
                    allowscriptaccess: 'always',
                    overstretch: true,
                    src: $embed.attr('src'),
                    type: $embed.attr('type'),
                    flashvars: $embed.attr('flashvars')
                };

            this.$.append(
                $('<embed />').attr(opts)
            );
        }

    }, BaseElement.prototype);

});
