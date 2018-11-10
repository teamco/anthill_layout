/**
 * Created by teamco on 7/31/14.
 */

import {PluginElement} from '../../plugin.element';
import '../../../lib/pretty.print';

/**
 * Define SiteConfigApproveImportElement
 * @class SiteConfigApproveImportElement
 * @extends PluginElement
 */
export class SiteConfigApproveImportElement extends PluginElement {

  /**
   * @constructor
   * @param view
   * @param opts
   */
  constructor(view, opts) {
    super('SiteConfigApproveImportElement', view, false);
    this._config(view, opts, $('<div />')).build({
      $container: opts.$container
    });

    /**
     * Define local data
     * @property SiteConfigApproveImportElement
     * @type {object}
     */
    this.data = opts.data;

    this.prettifyJSON(this.data);
  }

  /**
   * Prettify JSON
   * @memberOf SiteConfigCleanUpElement
   * @param {object} data
   * @returns {XML|string}
   */
  prettifyJSON(data) {

    /**
     * Load pretty print functionality
     * @private
     */
    function _loadPrettyPrint() {
      $(prettyPrint(data)).appendTo(this.$);
      this.adoptModalDialogPosition();
    }

    if (window.prettyPrint) {
      // Load cached version
      _loadPrettyPrint.bind(this)();
    }
  }
}