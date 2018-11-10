/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

import {PluginElement} from '../../plugin.element';

/**
 * @class SiteConfigImportFileElement
 * @extends PluginElement
 */
class SiteConfigImportFileElement extends PluginElement {

  /**
   * @constructor
   * @param view
   * @param opts
   */
  constructor(view, opts) {
    super('SiteConfigImportFileElement', view, false);
    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.init();
  }

  /**
   * Define init
   * @memberOf SiteConfigImportFileElement
   * @returns {SiteConfigImportFileElement}
   */
  init() {

    /**
     * Get scope
     * @type {SiteConfig}
     */
    const scope = this.view.scope;

    this.renderJSONUploader({
      eventName: scope.eventManager.eventList.readyToImportSiteData,
      info: true
    });
  }
}