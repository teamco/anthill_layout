/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */
import {PluginController} from '../../plugin.controller';

/**
 * @class DashboardController
 * @extends PluginController
 */
export class DashboardController extends PluginController {

  /**
   * @constructor
   * @param name
   * @param scope
   */
  constructor(name, scope) {
    super(name || 'DashboardController', scope);
  }

  /**
   * Define show content
   * @memberOf DashboardController
   */
  getModuleData() {
    this.getView().get$item().openDashboard();
  }
}
