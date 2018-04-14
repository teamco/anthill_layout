/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 2/13/13
 * Time: 4:50 PM
 * To change this template use File | Settings | File Templates.
 */

/**
 * @constant applicationGlobalPermissions
 * @type {Application.prototype.globalPermissions}
 */
const applicationGlobalPermissions = require('./permissions/application.permissions.js');
//       'public/shared/javascript/permissions/workspace.permissions',
//       'public/shared/javascript/permissions/page.permissions',
//       'public/shared/javascript/permissions/layout.permissions',
//       'public/shared/javascript/permissions/widget.permissions'
//     ],

(() => {
  applicationGlobalPermissions();
})();