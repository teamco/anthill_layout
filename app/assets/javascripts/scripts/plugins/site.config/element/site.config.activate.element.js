/**
 * Created by teamco on 7/31/14.
 */

defineP([
  'plugins/plugin.element'
], function defineSiteConfigActivateElement(PluginElement) {

  /**
   * Define SiteConfigActivateElement
   * @class SiteConfigActivateElement
   * @constructor
   * @param {SiteConfigView} view
   * @param opts
   * @extends PluginElement
   * @extends Renderer
   * @returns {SiteConfigActivateElement}
   */
  var SiteConfigActivateElement = function SiteConfigActivateElement(view,
      opts) {

    this._config(view, opts, $('<div class="site-version" />')).build({
      $container: opts.$container
    });

    this.fetchScreenshot(opts.callback);

    return this;
  };

  return SiteConfigActivateElement.extend('SiteConfigActivateElement', {

    /**
     * Define fetch screenshot
     * @memberOf SiteConfigActivateElement
     * @param {function} callback
     */
    fetchScreenshot: function fetchScreenshot(callback) {

      /**
       * Get element
       * @type {SiteConfigActivateElement}
       */
      var $element = this;

      // Hide popovers before send screenshot
      $('.popover').remove();

      /**
       * Define combo
       * @type {*|jQuery}
       */
      this.base.lib.image.resizeThumbnail(
          document.body, function _fetchScreenshot(img) {

            $element.addContent(
                $('<img class="activate-thumbnail"/>').attr({
                  src: img,
                  alt: 'Screenshot'
                })
            );

            $element.$.removeClass('loading');

            callback();
          }
      );

      this.addContent('<div class="uil-ripple-css" />').$.addClass('loading');
    }

  }, PluginElement.prototype);
});