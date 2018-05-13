/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/15
 * Time: 10:34 PM
 */

/**
 * @constant Layout
 * @type {module.Layout}
 */
const Layout = require('../layout.js');

module.exports = () => {

  /**
   * Define Layout Local listeners
   * @memberOf Layout
   * @type {{afterNestedOrganizer: {name: string, callback: Function}}}
   */
  Layout.prototype.localListeners = {

    afterNestedOrganizer: {
      name: 'after.nested.organizer',
      callback() {
        // TODO
      }
    }
  };
};