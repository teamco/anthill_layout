/**
 * Created by teamco on 11/4/14.
 */

/**
 * @class SiteConfigPreferences
 */
export class SiteConfigPreferences {

  /**
   * Load preferences
   * @memberOf SiteConfigPreferences
   * @param data
   */
  loadSitePreferences(data) {
    this.view.showPreferences(data, this.model.getSiteWidthRange());
  }

  /**
   * Approve update preferences
   * @memberOf SiteConfigPreferences
   */
  approveUpdatePreferences() {

    /**
     * Define scope
     * @type {SitePreferences}
     */
    const scope = this.scope;
    const workspace = scope.controller.getWorkspace();

    workspace.controller.updatePreferences(
        scope.view.elements.$modal,
        false
    );
  }

  /**
   * Revert preferences on cancel
   * @memberOf SiteConfigPreferences
   */
  revertSitePreferences() {

    /**
     * Define workspace
     * @type {Workspace}
     */
    const workspace = this.getWorkspace();

    workspace.observer.publish(workspace.eventManager.eventList.updateSiteWidth);
  }
}
  