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

            /**
             * Export object params
             * @param params
             * @returns {string}
             * @private
             */
            function _exportParams(params) {

                var index, $params = '';

                for (index in params) {

                    if (params.hasOwnProperty(index)) {

                        $params += [
                            '<param name="', index, '" value="',
                            params[index], '" />'
                        ].join('');
                    }
                }

                return $params;
            }

            // Get $object
            var $object = $(object),
                data = {
                    width: '100%',
                    height: '100%',
                    embed: this.renderEmbed($object.find('embed'))
                };

            var attrs = $object.find('param'),
                i = 0, l = attrs.length,
                params = {};

            for (; i < l; i++) {
                params[attrs[i].name] = attrs[i].value;
            }

            $.extend(params, opts);

            return $([
                '<object width="', data.width, '" height="', data.height, '">',
                _exportParams(params),
                data.embed.prop('outerHTML'),
                '</object>'
            ].join(''));
        }
    });
});