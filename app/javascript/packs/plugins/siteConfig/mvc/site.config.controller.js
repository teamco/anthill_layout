import {PluginController} from '../../plugin.controller';
import {Routes} from '../../../core/config/routes';
import {SiteConfigActivate} from './controller/site.config.activate';
import {SiteConfigCleanup} from './controller/site.config.cleanup';
import {SiteConfigExport} from './controller/site.config.export';
import {SiteConfigImport} from './controller/site.config.import';
import {SiteConfigPreferences} from './controller/site.config.preferences';
import {SiteConfigPublish} from './controller/site.config.publish';
import {SiteConfigWidgetGenerator} from './controller/site.config.widget.generator';
import {BasePreferences} from '../../../modules/Preferences';
import {aggregation} from '../../../lib/extends/aggregation';

/**
 * @class SiteConfigController
 */
export class SiteConfigController extends aggregation(PluginController, Routes, BasePreferences,
    SiteConfigActivate, SiteConfigCleanup, SiteConfigExport, SiteConfigImport, SiteConfigPreferences,
    SiteConfigPublish, SiteConfigWidgetGenerator) {

  /**
   * @constructor
   * @param name
   * @param scope
   */
  constructor(name, scope) {
    super('SiteConfigController', scope);
  }

  /**
   * Get module data
   * @memberOf SiteConfigController
   * @returns {*}
   */
  getModuleData() {
    return this.model.getDataItems(
        this.getWorkspace()
    );
  }

  /**
   * Load site content
   * @memberOf SiteConfigController
   * @param opened
   */
  loadModuleContent(opened) {
    if (opened) {
      this.getView().renderContent(
          this.getData()
      );
    }
  }
}