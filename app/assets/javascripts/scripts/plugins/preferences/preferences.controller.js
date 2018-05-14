/**
 * Created with RubyMine.
 * User: teamco
 * Date: 6/24/14
 * Time: 1:11 PM
 */

/**
 * @constant BasePreferences
 * @type {module.BasePreferences}
 */
const BasePreferences = require('../../core/lib/modules/Preferences.js');

/**
 * @class BasePreferences
 * @type {module.PreferencesController}
 */
module.exports = class PreferencesController extends BasePreferences {

  /**
   * @constructor
   * @param {string} name
   * @param scope
   */
  constructor(name, scope) {
    super(name || 'PreferencesController', scope, false);
  }
};
