/**
 * Created with RubyMine.
 * User: teamco
 * Date: 3/13/15
 * Time: 8:45 PM
 */

/**
 * @class WidgetScroll
 * @type {WidgetScroll}
 */
export class WidgetScroll {

  /**
   * Define scroll content
   * @memberOf WidgetScroll
   * @param {boolean} scrollable
   */
  scrollContent(scrollable) {

    /**
     * Define css action
     * @type {string}
     */
    const action = (scrollable ? 'add' : 'remove') + 'Class';
    this.view.get$item().$[action]('scroll');
  }
}
