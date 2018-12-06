/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:13 PM
 * To change this template use File | Settings | File Templates.
 */

import {BaseView} from '../../../modules/View';
import {GalleryProvidersElement} from '../element/gallery.providers.element';
import {GalleryContentElement} from '../element/gallery.content.element';

/**
 * @class GalleryView
 * @type {GalleryView}
 */
export class GalleryView extends BaseView {

  /**
   * @constructor
   * @param {string} name
   * @param {Panel} scope
   */
  constructor(name, scope) {
    super(name || 'GalleryView', scope);
  }

  /**
   * Render Gallery
   * @memberOf GalleryView
   * @returns {boolean}
   */
  renderGallery() {

    /**
     * Define Gallery element
     * @type {PanelContentElement}
     */
    this.elements.$gallery = this.get$container();
  }

  /**
   * Render gallery providers
   * @memberOf GalleryView
   * @param providers
   * @param currentProvider
   * @returns {boolean}
   */
  renderProviders(providers, currentProvider) {

    /**
     * Define Gallery element
     * @type {GalleryProvidersElement}
     */
    this.elements.$providers = new GalleryProvidersElement(this, {
      $container: this.get$container().$,
      style: 'gallery-providers',
      data: providers,
      current: currentProvider
    });
  }

  /**
   * Render gallery content
   * @memberOf GalleryView
   * @param provider
   * @param {Boolean} force
   * @returns {boolean}
   */
  renderContent(provider, force) {

    /**
     * Define provider data
     * @type {Array}
     */
    let data = (provider || {}).data || [];

    if (!this.elements.$filter) {
      this.cleanElementItems();
      this.renderFilterElement();
      this.renderProviders(this.controller.getProvidersData(), this.controller.getModuleData());
    }

    this.destroyElementItems();

    for (let i = 0, l = data.length; i < l; i++) {

      /**
       * Render item
       * @type {GalleryContentElement}
       */
      let $item = new GalleryContentElement(this, {
        style: 'content',
        $container: this.get$item().$,
        data: data[i]
      });

      this.updateElementItems($item);
    }

    this.elements.$filter.updateData({
      items: this.elements.items,
      focusOn: 'input'
    });
  }

  /**
   * Render gallery
   * @memberOf GalleryView
   */
  render() {
    this.scope.observer.publish(this.scope.eventManager.eventList.successRendered, this.renderGallery.bind(this));
  }
}