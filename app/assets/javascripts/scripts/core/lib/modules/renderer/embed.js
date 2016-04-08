/**
 * Created by teamco on 7/10/14.
 */

define([], function defineEmbedRenderer() {

    /**
     * Define EmbedRenderer
     * @class EmbedRenderer
     * @extends LabelRenderer
     * @constructor
     */
    var EmbedRenderer = function EmbedRenderer() {
    };

    return EmbedRenderer.extend('EmbedRenderer', {

        /**
         * Render embed
         * @memberOf EmbedRenderer
         * @param {string} embed
         * @param {object} [opts]
         * @returns {*|jQuery}
         */
        renderEmbed: function renderEmbed(embed, opts) {

            opts = opts || {};

            // Get $embed
            var $embed = $(embed),
                params = {
                    width: '100%',
                    height: '100%',
                    quality: $embed.attr('quality'),
                    wmode: $embed.attr('wmode'),
                    movie: $embed.attr('movie'),
                    seamlesstabbing: $embed.attr('seamlesstabbing'),
                    allowfullscreen: $embed.attr('allowfullscreen'),
                    allowscriptaccess: $embed.attr('allowscriptaccess'),
                    overstretch: $embed.attr('overstretch'),
                    id: $embed.attr('id'),
                    src: $embed.attr('src'),
                    type: $embed.attr('type'),
                    flashvars: $embed.attr('flashvars'),
                    pluginspage: $embed.attr('pluginspage')
                };

            $.extend(params, opts);

            return $('<embed />').attr(params);
        }
    });
});