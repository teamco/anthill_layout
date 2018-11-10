/**
 * Created by teamco on 7/31/14.
 */
import {PluginElement} from '../../plugin.element';

/**
 * Define SiteConfigActivateElement
 * @class SiteConfigActivateElement
 * @extends PluginElement
 * @extends Renderer
 */
export class SiteConfigActivateElement extends PluginElement {

  /**
   * @constructor
   * @param view
   * @param opts
   */
  constructor(view, opts) {
    super('SiteConfigActivateElement', view, false);
    this._config(view, opts, $('<div class="site-version" />')).build({
      $container: opts.$container
    });

    this.fetchScreenshot(opts.callback);
  }

  /**
   * Define fetch screenshot
   * @memberOf SiteConfigActivateElement
   * @param {function} callback
   */
  fetchScreenshot(callback) {

    /**
     * Get element
     * @type {SiteConfigActivateElement}
     */
    const $element = this;

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
}