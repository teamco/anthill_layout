/**
 * Created with RubyMine.
 * User: teamco
 * Date: 6/24/14
 * Time: 1:11 PM
 */

import {BasePreferences} from '../../modules/Preferences';

/**
 * @class BasePreferences
 * @type {PreferencesController}
 */
export class PreferencesController extends BasePreferences {

  /**
   * @constructor
   * @param {string} name
   * @param scope
   */
  constructor(name, scope) {
    super(name || 'PreferencesController', scope);
  }
}
