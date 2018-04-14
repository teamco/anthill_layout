/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

defineP([
  'plugins/plugin.element'
], function defineSiteConfigImportFileElement(PluginElement) {

  /**
   * Define SiteConfigImportFileElement Element
   * @constructor
   * @class SiteConfigImportFileElement
   * @extends PluginElement
   * @extends Renderer
   * @param {SiteConfigView} view
   * @param opts
   * @returns {SiteConfigImportFileElement}
   */
  var SiteConfigImportFileElement = function SiteConfigImportFileElement(view,
      opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    return this.init();
  };

  return SiteConfigImportFileElement.extend('SiteConfigImportFileElement', {

    /**
     * Define init
     * @memberOf SiteConfigImportFileElement
     * @returns {SiteConfigImportFileElement}
     */
    init: function init() {

      /**
       * Get scope
       * @type {SiteConfig}
       */
      var scope = this.view.scope;

      this.renderJSONUploader({
        eventName: scope.eventManager.eventList.readyToImportSiteData,
        info: true
      });

      return this;
    }

  }, PluginElement.prototype);

});