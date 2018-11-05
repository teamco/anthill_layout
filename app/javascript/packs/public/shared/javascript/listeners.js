/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 2/13/13
 * Time: 4:50 PM
 * To change this template use File | Settings | File Templates.
 */

import {ApplicationGlobalListeners} from './listeners/application.listeners';

export const listeners = {
  application: ApplicationGlobalListeners
};
// (() => {
//   // require('./listeners/application.listeners.js')();
//   // require('./listeners/workspace.listeners.js')();
//   // require('./listeners/page.listeners.js')();
//   // require('./listeners/layout.listeners.js')();
//   // require('./listeners/widget.listeners.js')();
// })();