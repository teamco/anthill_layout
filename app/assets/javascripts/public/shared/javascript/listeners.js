/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 2/13/13
 * Time: 4:50 PM
 * To change this template use File | Settings | File Templates.
 */

// 'public/shared/javascript/listeners/layout.listeners',
// 'public/shared/javascript/listeners/widget.listeners'

(() => {
  require('./listeners/application.listeners.js')();
  require('./listeners/workspace.listeners.js')();
  require('./listeners/page.listeners.js')();
})();