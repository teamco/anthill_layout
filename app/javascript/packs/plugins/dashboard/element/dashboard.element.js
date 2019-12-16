/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

import {PluginElement} from '../../plugin.element';

export class DashboardElement extends PluginElement {

  /**
   * @constructor
   * @param view
   * @param opts
   */
  constructor(view, opts) {
    super('DashboardElement', view, false);
    this._config(view, opts, window.$()).build(opts);

    /**
     * Define opener
     * @property DashboardElement
     */
    this.opener = undefined;
  }

  /**
   * Bind open dashboard
   * @memberOf DashboardElement
   */
  openDashboard() {
    if (this.opener && !this.opener.closed) {
      this.opener.focus();
      return false;
    }

    /**
     * Define window open
     * @type {Window}
     */
    this.opener = window.open('/');
  }
}
