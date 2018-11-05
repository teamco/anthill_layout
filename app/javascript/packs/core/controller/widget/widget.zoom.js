/**
 * Created with RubyMine.
 * User: teamco
 * Date: 6/22/14
 * Time: 9:15 PM
 */

/**
 * @class WidgetZoom
 * @type {module.WidgetZoom}
 */
module.exports = class WidgetZoom {

  /**
   * Define set zoom
   * @memberOf WidgetZoom
   */
  setZoomable() {
    this.view.get$item().setZoom(true);
  }

  /**
   * Define unset zoom
   * @memberOf WidgetZoom
   */
  unsetZoomable() {
    this.view.get$item().setZoom(false);
  }
};

