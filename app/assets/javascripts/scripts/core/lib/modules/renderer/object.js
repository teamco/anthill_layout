/**
 * Created by i061485 on 7/10/14.
 */

define([], function defineObjectRenderer() {

    /**
     * Define ObjectRenderer
     * @class ObjectRenderer
     * @extends LabelRenderer
     * @constructor
     */
    var ObjectRenderer = function ObjectRenderer() {

    };

    return ObjectRenderer.extend('ObjectRenderer', {

        /**
         * Render Object
         * @member ObjectRenderer
         * @param {string} object
         * @param {object} opts
         * @returns {*|jQuery}
         */
        renderObject: function renderObject(object, opts) {

            opts = opts || {};

            // Get $object
            var $object = $(object),
                params = {
                    width: '100%',
                    height: '100%',
                    wmode: $object.find("param[name='wmode']").val(),
                    movie: $object.find("param[name='movie']").val(),
                    allowscriptaccess: $object.find("param[name='allowScriptAccess']").val(),
                    flashvars: $object.find("param[name='flashvars']").val(),
                    embed: this.renderEmbed($object.find('embed'))
                };

            $.extend(params, opts);

            return $([
                '<object width="', params.width, '" height="', params.height, '">',
                '<param name="movie" value="', params.movie, '" />',
                '<param name="allowScriptAccess" value="', params.allowscriptaccess, '" />',
                '<param name="flashvars" value="', params.flashvars, '" />',
                params.embed.prop('outerHTML'),
                '</object>'
            ].join(''));
        }
    });
});