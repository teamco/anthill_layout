/**
 * Created by teamco on 7/3/14.
 */

/**
 * @class WidgetStretch
 * @type {WidgetStretch}
 */
export class WidgetStretch {

  /**
   * Stretch height
   * @memberOf WidgetStretch
   * @param {boolean} stretch
   */
  stretchHeight(stretch) {
    const $item = this.view.get$item();
    stretch ?
        $item.stretchHeight(this.controller.getContainment()) :
        $item.restoreHeight();
  }

  /**
   * Stretch width
   * @memberOf WidgetStretch
   * @param {boolean} stretch
   */
  stretchWidth(stretch) {
    const $item = this.view.get$item();
    stretch ?
        $item.stretchWidth(this.controller.getContainment()) :
        $item.restoreWidth();
  }
}
