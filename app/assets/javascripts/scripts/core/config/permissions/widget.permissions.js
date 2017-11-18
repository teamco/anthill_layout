/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/15
 * Time: 11:50 PM
 */

defineP(['config/widget'], function defineWidgetPermissions(Widget) {

  /**
   * Define Widget Local permission
   * @type {{
     *      development: {maximizable: boolean, zoomable: boolean, draggable:
     *     boolean, resizable: boolean}, authorize: {maximizable: boolean,
     *     zoomable: boolean, draggable: boolean, resizable: boolean},
     *     consumption: {maximizable: boolean, zoomable: boolean, draggable:
     *     boolean, resizable: boolean}, test: {maximizable: boolean, zoomable:
     *     boolean, draggable: boolean, resizable: boolean}
     * }}
   */
  Widget.prototype.localPermissions = {
    development: {
      maximizable: true,
      zoomable: true,
      draggable: true,
      resizable: true
    },
    authorize: {
      maximizable: true,
      zoomable: true,
      draggable: true,
      resizable: true
    },
    consumption: {
      maximizable: true,
      zoomable: true,
      draggable: false,
      resizable: false
    },
    test: {
      maximizable: true,
      zoomable: true,
      draggable: true,
      resizable: true
    }
  };

  return Widget;
});