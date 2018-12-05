/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

import {PluginController} from '../../plugin.controller';
import {Routes} from '../../../core/config/routes';

/**
 * Aggregation of base class and mixin classes.
 * @type {(function(*, ...[*]): __Aggregate)|*|(function(): aggregate)}
 */
const aggregation = require('../../../lib/extends/aggregation');

/**
 * Define panel controller
 * @class GalleryController
 * @extends {PluginController, Routes}
 */
export class GalleryController extends aggregation(PluginController, Routes) {

  /**
   * @constructor
   * @param {string} name
   * @param {Panel} scope
   */
  constructor(name, scope) {
    super(name || 'GalleryController', scope, false);
  }

  /**
   * Define init model
   * @memberOf GalleryController
   */
  initModel() {
    this.logger.debug('Init model');
    this.model.loadStaticData();
  }

  /**
   * Get providers data
   * @memberOf GalleryController
   */
  getProvidersData() {
    return this.model.getProvidersList();
  }

  /**
   * Get current provider data
   * @memberOf GalleryController
   * @returns {{name: string, data: *[]}[]}
   */
  getModuleData() {
    return this.model.currentProvider;
  }

  /**
   * Set current provider
   * @memberOf GalleryController
   * @param name
   */
  setCurrentProvider(name) {
    this.model.setProviderAsCurrent(name);
  }

  /**
   * Set providers
   * @memberOf GalleryController
   */
  setProviders() {
    this.logger.debug('Set providers');

    /**
     * Get available providers
     * @type {*}
     */
    let data = this.model.providers,
        index, i = 0, pl;

    for (index in data) {

      if (data.hasOwnProperty(index)) {

        pl = data[index].data.length;

        for (; i < pl; i++) {

          // Categorize providers data list
          this.model.setProvider(data[index].data[i]);
        }
      }
    }
  }

  /**
   * Change current provider
   * @memberOf GalleryController
   * @param provider
   * @returns {boolean}
   */
  changeProvider(provider) {
    if (provider === this.getModuleData().key) {
      return false;
    }

    this.setCurrentProvider(provider);

    /**
     * Get scope
     * @type {Gallery}
     */
    const scope = this.scope;

    scope.observer.publish(scope.eventManager.eventList.loadModuleContent, [true, true]);
    this.updateWidgetsCounter(this.model.providers[provider].data);
  }

  /**
   * @memberOf GalleryController
   * @param items
   */
  updateWidgetsCounter(items = []) {

    /**
     * @constant
     * @type {Panel}
     */
    const panel = this.getDesignTimePanel();
    panel.observer.publish(panel.eventManager.eventList.updateItemsCount, ['gallery', items]);
  }

  /**
   * Filter search results
   * @memberOf GalleryController
   * @param e
   */
  filterResults(e) {
    e.preventDefault();

    if (e.which === 13) {
      return false;
    }

    if (e.which === 27) {
      e.target.value = '';
    }

    /**
     * Get item elements
     * @type {object}
     */
    const items = this.getView().elements.items,
        value = e.target.value;

    for (let index in items) {
      if (items.hasOwnProperty(index)) {

        /**
         * Define item
         * @type {GalleryContentElement}
         */
        const $item = items[index];

        if (!value.length) {
          $item.$.removeAttr('style');
        } else {

          /**
           * Define regex
           * @type {RegExp}
           */
          const regex = new RegExp(value, 'ig');

          ($item.data.name.match(regex) || $item.data.type.match(regex)) ?
              $item.$.removeAttr('style') :
              $item.hide();
        }
      }
    }
  }

  /**
   * Add widget
   * @memberOf GalleryController
   * @param $element
   */
  addWidget($element) {

    /**
     * Get page
     * @type {Page}
     */
    const page = this.getPage();
    const data = $element.data;

    page.controller.createWidgetFromResource({
      width: data.dimensions.width,
      height: data.dimensions.height,
      resource: $element.$.attr('resource'),
      thumbnail: data.thumbnail,
      external_resource: data.external_resource,
      title: data.name,
      description: data.description
    }, true, false);
  }
}