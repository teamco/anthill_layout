/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/15
 * Time: 11:34 PM
 */

define(['config/application'],
    function defineApplicationPermissions(Application) {

      /**
       * Define Application global permission
       * @property Application
       * @type {{
     *      development: {store: boolean},
     *      authorize: {store: boolean},
     *      consumption: {store: boolean},
     *      test: {store: boolean}
     * }}
       */
      Application.prototype.globalPermissions = {
        development: {store: true},
        authorize: {store: true},
        consumption: {store: false},
        test: {store: false}
      };

      return Application;
    });