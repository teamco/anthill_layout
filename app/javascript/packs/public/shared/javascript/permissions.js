/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 2/13/13
 * Time: 4:50 PM
 * To change this template use File | Settings | File Templates.
 */

import {applicationGlobalPermissions} from './permissions/application.permissions';
import {workspaceGlobalPermissions} from './permissions/workspace.permissions';
import {layoutGlobalPermissions} from './permissions/layout.permissions';
import {pageGlobalPermissions} from './permissions/page.permissions';
import {widgetGlobalPermissions} from './permissions/widget.permissions';

export const permissions = {
  application: applicationGlobalPermissions,
  workspace: workspaceGlobalPermissions,
  page: pageGlobalPermissions,
  layout: layoutGlobalPermissions,
  widget: widgetGlobalPermissions
};