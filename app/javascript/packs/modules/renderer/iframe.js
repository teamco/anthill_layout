/**
 * Created by teamco on 7/10/14.
 */

defineP(function defineIframeRenderer() {

  /**
   * Define IframeRenderer
   * @class IframeRenderer
   * @extends AntHill
   * @constructor
   */
  var IframeRenderer = function IframeRenderer() {
  };

  return IframeRenderer.extend('IframeRenderer', {

    /**
     * Render iframe
     * @memberOf IframeRenderer
     * @param {string|boolean} src
     * @param {object} [opts]
     * @returns {*|jQuery}
     */
    renderIframe: function renderIframe(src, opts) {

      if (_.isUndefined(src)) {

        // Initial state
        return false;
      }

      opts = opts || {};

      var iframe = '<iframe webkitAllowFullScreen mozallowfullscreen allowfullscreen />',
          attrs = {
            src: src ? src.replace(/(http|https):/, '') : undefined,
            frameborder: 0,
            width: '100%',
            height: '100%',
            scrolling: opts.scrolling || 'no',
            allowtransparency: true
          };

      $.extend(attrs, opts);

      /**
       * Define $iframe
       * @type {*|jQuery}
       */
      var $iframe = $(iframe).attr(attrs);

      this.checkVisibility(
          $iframe,
          this.base.defineBoolean(opts.visible, true, true)
      );

      return $iframe;
    }
  });
});