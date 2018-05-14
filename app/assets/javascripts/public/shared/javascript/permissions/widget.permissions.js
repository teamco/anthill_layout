/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/15
 * Time: 11:50 PM
 */

/**
 * @constant Widget
 * @type {module.Widget}
 */
const Widget = require('../../../../scripts/core/config/widget.js');

module.exports = () => {

  /**
   * Define Widget global permission
   * @property Widget
   * @type {{
   *  development: {maximizable: boolean, zoomable: boolean, draggable:
   *  boolean, resizable: boolean}, authorize: {maximizable: boolean,
   *  zoomable: boolean, draggable: boolean, resizable: boolean},
   *  consumption: {maximizable: boolean, zoomable: boolean, draggable:
   *  boolean, resizable: boolean}, test: {maximizable: boolean, zoomable:
   *  boolean, draggable: boolean, resizable: boolean}
   * }}
   */
  Widget.prototype.globalPermissions = {
    development: {
      maximizable: true,
      zoomable: true,
      draggable: true,
      resizable: true,
      store: true
    },
    authorize: {
      maximizable: true,
      zoomable: true,
      draggable: true,
      resizable: true,
      store: true
    },
    consumption: {
      maximizable: true,
      zoomable: true,
      draggable: false,
      resizable: false,
      store: false
    },
    test: {
      maximizable: true,
      zoomable: true,
      draggable: true,
      resizable: true,
      store: false
    }
  };
};