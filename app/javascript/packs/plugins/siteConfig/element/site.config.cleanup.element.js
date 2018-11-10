/**
 * Created by teamco on 7/31/14.
 */

import {PluginElement} from '../../plugin.element';
import '../../../lib/pretty.print';

/**
 * @class SiteConfigCleanUpElement
 */
export class SiteConfigCleanUpElement extends PluginElement {

  /**
   * @constructor
   * @param view
   * @param opts
   */
  constructor(view, opts) {
    super('SiteConfigCleanUpElement', view, false);
    this._config(view, opts, $('<div />')).build({
      $container: opts.$container
    });

    this.prettifyJSON();
  }

  /**
   * Prettify JSON
   * @memberOf SiteConfigCleanUpElement
   * @returns {XML|string}
   */
  prettifyJSON() {

    /**
     * Load pretty print functionality
     * @private
     */
    function _loadPrettyPrint() {
      $(prettyPrint(data)).appendTo(this.$);
      this.adoptModalDialogPosition();
    }

    /**
     * Get scope
     * @type {SiteConfig|AntHill}
     */
    const scope = this.view.scope;
    const data = scope.controller.root().model.setting.load();

    if (window.prettyPrint) {
      // Load cached version
      _loadPrettyPrint.bind(this)();
    }
  }
}
