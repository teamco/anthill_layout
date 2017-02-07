/**
 * Created by teamco on 7/10/14.
 */

define([], function defineObjectRenderer() {

  /**
   * Define ObjectRenderer
   * @class ObjectRenderer
   * @extends LabelRenderer
   * @extends EmbedRenderer
   * @constructor
   */
  var ObjectRenderer = function ObjectRenderer() {

  };

  return ObjectRenderer.extend('ObjectRenderer', {

    /**
     * Render Object
     * @memberOf ObjectRenderer
     * @param {string} object
     * @param {object} [opts]
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

      /**
       * Export objects attributes
       * @param attrs
       * @returns {string}
       * @private
       */
      function _exportAttributes(attrs) {

        var index,
            $attrs = [
              '<object width="', data.width,
              '" height="', data.height, '"'
            ];

        for (index in attrs) {

          if (attrs.hasOwnProperty(index)) {

            $attrs.push(
                index + '="' + attrs[index] + '"'
            );
          }
        }

        $attrs.push('>');

        return $attrs.join('');
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
          params = {},
          attributes = {};

      for (; i < l; i++) {
        params[attrs[i].name] = attrs[i].value;
      }

      attrs = $object[0].attributes;
      i = 0;
      l = attrs.length;

      for (; i < l; i++) {

        // Define accessor
        var item = attrs[i],
            name = item.name,
            accessor = name.toLowerCase();

        if (accessor !== 'width' && accessor !== 'height') {
          attributes[name] = item.value;
        }
      }

      $.extend(params, opts);

      return [
        _exportAttributes(attributes),
        _exportParams(params),
        data.embed.prop('outerHTML'),
        '</object>'
      ].join('');
    }
  });
});