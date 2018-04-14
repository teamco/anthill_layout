/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 2/13/13
 * Time: 4:50 PM
 * To change this template use File | Settings | File Templates.
 */

/**
 * @constant applicationGlobalListeners
 * @type {Application.prototype.globalListeners}
 */
const applicationGlobalListeners = require('./listeners/application.listeners.js');

// 'public/shared/javascript/listeners/workspace.listeners',
// 'public/shared/javascript/listeners/page.listeners',
// 'public/shared/javascript/listeners/layout.listeners',
// 'public/shared/javascript/listeners/widget.listeners'

(() => {
  applicationGlobalListeners();
})();