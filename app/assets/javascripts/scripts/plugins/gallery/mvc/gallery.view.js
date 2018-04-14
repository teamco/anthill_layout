/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:13 PM
 * To change this template use File | Settings | File Templates.
 */

defineP([
  'modules/View',
  'element/header.element',
  'element/footer.element',
  'plugins/gallery/element/gallery.providers.element',
  'plugins/gallery/element/gallery.content.element',
  'plugins/gallery/element/gallery.element'
], function defineGalleryView(BaseView, Header, Footer, GalleryProvidersElement,
    GalleryContentElement, GalleryElement) {

  /**
   * Define view
   * @class GalleryView
   * @constructor
   * @extends BaseView
   */
  var GalleryView = function GalleryView() {
  };

  return GalleryView.extend('GalleryView', {

    /**
     * Render Gallery
     * @memberOf GalleryView
     * @returns {boolean}
     */
    renderGallery: function renderGallery() {

      this.renderFilter(
          this.updateFooterContent.bind(this)
      );

      this.renderProviders(
          this.controller.getProvidersData(),
          this.controller.getModuleData()
      );

      if (this.isCached('$gallery', GalleryElement)) {

        /**
         * Get scope
         * @type {Gallery}
         */
        var scope = this.scope;

        scope.observer.publish(
            scope.eventManager.eventList.loadModuleContent, [
              true, true
            ]
        );

        return false;
      }

      /**
       * Define Gallery element
       * @type {GalleryElement}
       */
      this.elements.$gallery = new GalleryElement(this, {
        $container: this.get$container().$
      });
    },

    /**
     * Render gallery providers
     * @memberOf GalleryView
     * @param providers
     * @param currentProvider
     * @returns {boolean}
     */
    renderProviders: function renderProviders(providers, currentProvider) {

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
    },

    /**
     * Render gallery content
     * @memberOf GalleryView
     * @param provider
     * @param {Boolean} force
     * @returns {boolean}
     */
    renderContent: function renderContent(provider, force) {

      if (this.isCachedItems() && !force) {
        return false;
      }

      this.cleanElementItems();
      this.updateElementItems();

      /**
       * Define provider data
       * @type {Array}
       */
      var data = (provider || {}).data || [];

      for (var i = 0, l = data.length; i < l; i++) {

        /**
         * Render item
         * @type {GalleryContentElement}
         */
        var $item = new GalleryContentElement(this, {
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
    },

    /**
     * Update footer content
     * @memberOf GalleryView
     */
    updateFooterContent: function updateFooterContent() {
      this.renderFooter(Footer, this.get$item());
    },

    /**
     * Render gallery
     * @memberOf GalleryView
     */
    render: function render() {

      this.scope.observer.publish(
          this.scope.eventManager.eventList.successRendered,
          this.renderGallery.bind(this)
      );
    }

  }, BaseView.prototype)
});