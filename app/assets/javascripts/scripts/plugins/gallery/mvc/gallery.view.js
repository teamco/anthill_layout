/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:13 PM
 * To change this template use File | Settings | File Templates.
 */

/**
 * @constant BaseView
 * @type {BaseView}
 */
const BaseView = require('../../../core/lib/modules/View.js');

/**
 * @class GalleryView
 * @type {module.GalleryView}
 */
module.exports = class GalleryView extends BaseView {

  /**
   * @constructor
   * @param {string} name
   * @param {Panel} scope
   */
  constructor(name, scope) {
    super(name || 'GalleryView', scope, false);
  }

  /**
   * Render Gallery
   * @memberOf GalleryView
   * @returns {boolean}
   */
  renderGallery() {

    /**
     * @constant GalleryElement
     * @type {module.GalleryElement|*}
     */
    const GalleryElement = require('../element/gallery.element.js');

    if (this.isCached('$gallery', GalleryElement)) {

      /**
       * Get scope
       * @type {Gallery}
       */
      const scope = this.scope;

      scope.observer.publish(scope.eventManager.eventList.loadModuleContent, [true, true]);
      return false;
    }

    /**
     * Define Gallery element
     * @type {module.GalleryElement}
     */
    this.elements.$gallery = new GalleryElement(this, {
      $container: this.get$container().$
    });

    this.renderFilter(this.updateFooterContent.bind(this));
    this.renderProviders(this.controller.getProvidersData(), this.controller.getModuleData());
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
     * @constant GalleryProvidersElement
     * @type {module.GalleryProvidersElement|*}
     */
    const GalleryProvidersElement = require('../element/gallery.providers.element.js');

    /**
     * Define Gallery element
     * @type {module.GalleryProvidersElement}
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
    if (this.isCachedItems() && !force) {
      return false;
    }

    this.cleanElementItems();
    this.updateElementItems();

    /**
     * Define provider data
     * @type {Array}
     */
    let data = (provider || {}).data || [];

    /**
     * @constant GalleryContentElement
     * @type {module.GalleryContentElement|*}
     */
    const GalleryContentElement = require('../element/gallery.content.element.js');

    for (let i = 0, l = data.length; i < l; i++) {

      /**
       * Render item
       * @type {module.GalleryContentElement}
       */
      let $item = new GalleryContentElement(this, {
        style: 'content',
        $container: this.get$item().$,
        data: data[i]
      });

      this.updateElementItems($item);
    }

    this.updateScrollCover();

    this.elements.$filter.updateData({
      items: this.elements.items,
      focusOn: 'input'
    });

    this.updateFooterContent();
  }

  /**
   * Update footer content
   * @memberOf GalleryView
   */
  updateFooterContent() {
    this.renderFooter(this.get$item());
  }

  /**
   * Render gallery
   * @memberOf GalleryView
   */
  render() {
    this.scope.observer.publish(this.scope.eventManager.eventList.successRendered, this.renderGallery.bind(this));
  }
};