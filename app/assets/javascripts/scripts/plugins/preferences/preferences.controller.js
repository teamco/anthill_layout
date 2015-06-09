/**
 * Created with RubyMine.
 * User: teamco
 * Date: 6/24/14
 * Time: 1:11 PM
 */

define([
    'modules/Preferences'
], function definePreferencesController(BasePreferences) {

    /**
     * Define Preferences Controller
     * @class PreferencesController
     * @constructor
     * @extends BasePreferences
     */
    var PreferencesController = function PreferencesController() {
    };

    return PreferencesController.extend('PreferencesController', {
    }, BasePreferences.prototype);
});