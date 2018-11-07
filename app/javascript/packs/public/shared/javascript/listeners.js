/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 2/13/13
 * Time: 4:50 PM
 * To change this template use File | Settings | File Templates.
 */

import {applicationGlobalListeners} from './listeners/application.listeners';
import {workspaceGlobalListeners} from './listeners/workspace.listeners';
import {pageGlobalListeners} from './listeners/page.listeners';
import {widgetGlobalListeners} from './listeners/widget.listeners';
import {layoutGlobalListeners} from './listeners/layout.listeners';

export const listeners = {
  application: applicationGlobalListeners,
  workspace: workspaceGlobalListeners,
  page: pageGlobalListeners,
  layout: layoutGlobalListeners,
  widget: widgetGlobalListeners
};