/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/15
 * Time: 11:34 PM
 */

defineP(['config/application'],
    function defineApplicationPermissions(Application) {

      /**
       * Define Application Local permission
       * @type {{
     *      development: {},
     *      authorize: {},
     *      consumption: {},
     *      test: {}
     * }}
       */
      Application.prototype.localPermissions = {
        development: {},
        authorize: {},
        consumption: {},
        test: {}
      };

      return Application;
    });