/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 2/13/13
 * Time: 4:50 PM
 * To change this template use File | Settings | File Templates.
 */

//       'public/shared/javascript/permissions/widget.permissions'
//     ],

(() => {
  require('./permissions/application.permissions.js')();
  require('./permissions/workspace.permissions.js')();
  require('./permissions/page.permissions.js')();
  require('./permissions/layout.permissions.js')();
})();