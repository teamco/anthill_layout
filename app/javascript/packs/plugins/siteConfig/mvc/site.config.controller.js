import {PluginController} from '../../plugin.controller';
import {Routes} from '../../../core/config/routes';
// import {PreferencesController} from '../../preferences/preferences.controller';
import {SiteConfigActivate} from './controller/site.config.activate';
import {SiteConfigCleanup} from './controller/site.config.cleanup';
import {SiteConfigExport} from './controller/site.config.export';
import {SiteConfigImport} from './controller/site.config.import';
import {SiteConfigPreferences} from './controller/site.config.preferences';
import {SiteConfigPublish} from './controller/site.config.publish';
import {SiteConfigWidgetGenerator} from './controller/site.config.widget.generator';

/**
 * Aggregation of base class and mixin classes.
 * @type {(function(*, ...[*]): __Aggregate)|*|(function(): aggregate)}
 */
const aggregation = require('../../../lib/extends/aggregation');

/**
 * @class SiteConfigController
 */
export class SiteConfigController extends aggregation(PluginController, Routes, /*PreferencesController,*/
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