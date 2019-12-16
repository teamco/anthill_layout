/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/27/14
 * Time: 5:40 PM
 */

/**
 * @class WidgetContent
 * @type {WidgetContent}
 */
export class WidgetContent {

  /**
   * Define load widget data
   * @memberOf WidgetContent
   */
  loadWidgetData() {

    /**
     * Get local scope
     * @type {Widget}
     */
    const scope = this.scope;

    /**
     * Get widget page
     * @type {Workspace}
     */
    const workspace = this.getWorkspace();

    /**
     * Get current page
     * @type {Page}
     */
    const page = workspace.controller.isLoadPageContent();

    if (page) {

      scope.observer.batchPublish(
          scope.eventManager.eventList.loadContent,
          scope.eventManager.eventList.loadPreferences
      );
      scope.logger.debug('Content start loading');
    }
  }

  /**
   * Load widget content
   * @memberOf WidgetContent
   */
  loadContent() {

    /**
     * Get resource
     * @type {string}
     */
    const resource = this.model.getConfig('preferences').resource;

    if (typeof resource !== 'string') {
      this.logger.error('Unable to load resource');
      return false;
    }

    this.controller.fetchExternalContent(resource);
    this.controller.fetchInternalContent(resource);
  }

  /**
   * Define fetch external resource
   * @memberOf WidgetContent
   * @returns {*|string}
   */
  fetchExternalResource() {
    return this.model.getConfig('preferences').external_resource;
  }

  /**
   * Define fetch content
   * @memberOf WidgetContent
   * @param {class} Content
   * @param {boolean} isInternal
   */
  fetchContent(Content, isInternal) {

    /**
     * Define widget instance
     * @type {Widget}
     */
    const widget = this.scope;

    if (!Content) {
      widget.logger.debug('Unable to load widget content', Content);
      return false;
    }

    widget.logger.debug('Load widget content', Content);

    if (isInternal) {
      widget.controller.destroyContent();
    }

    widget.observer.publish(widget.eventManager.eventList.setContent, [
      Content, {
        events: widget.contentEvents || {},
        rules: widget.contentRules || {}
      }
    ]);

    widget.logger.debug('Content finish loading');
    widget.observer.publish(widget.eventManager.eventList.loadPreferences);
  }

  /**
   * Define fetch external content
   * @memberOf WidgetContent
   * @param {string} resource
   * @returns {boolean}
   */
  fetchExternalContent(resource) {

    /**
     * Define widget instance
     * @type {Widget}
     */
    const widget = this.scope;

    if (this.isInternalContent()) {
      widget.logger.debug('Fetch internal content');
      return false;
    }

    // Get prefs
    const prefs = widget.model.getConfig('preferences');

    /**
     * Define resource path
     * @type {string}
     */
    const path = `${prefs.external_resource}${resource}.js`;

    this.fetchContent(path, false);
  }

  /**
   * Destroy widget content
   * @memberOf WidgetContent
   */
  destroyContent() {

    // Delete content
    delete this.scope.content;
    this.getView().elements.$content.cleanMetamorphicContent();
  }

  /**
   * Define fetch internal content
   * @memberOf WidgetContent
   * @param {string} resource
   * @returns {boolean}
   */
  fetchInternalContent(resource) {

    /**
     * Define widget instance
     * @type {Widget}
     */
    const widget = this.scope;

    if (this.isExternalContent()) {
      widget.logger.debug('Fetch external content');
      return false;
    }

    if (this.getAvailableContent) {
      this.fetchContent(this.getAvailableContent.apply(this, [resource]), true);
    }
  }

  /**
   * Define if widget content is internal
   * @memberOf WidgetContent
   * @returns {boolean}
   */
  isInternalContent() {
    return !this.isExternalContent();
  }

  /**
   * Define if widget content is external
   * @memberOf WidgetContent
   * @returns {boolean}
   */
  isExternalContent() {
    return !!this.model.getConfig('preferences').is_external;
  }

  /**
   * Define prepare rendering content
   * @memberOf WidgetContent
   * @param {PluginController} plugin
   * @param {Function} callback
   */
  prepareRenderingContent(plugin, callback) {
    const widget = this.scope,
        language = widget.i18n.getCurrentLanguage(),
        translationPath = this.isExternalContent() ? [
          this.model.getConfig('preferences').external_resource,
          '/translations/', language, '.js'
        ] : [
          'plugins/widgets/',
          plugin.name.toPoint().replace(/\./, ''),
          '/translations/', language
        ];

    plugin.observer.publish(plugin.eventManager.eventList.updateTranslations, [
          translationPath.join(''), () => {
            callback(plugin);
            widget.observer.publish(widget.eventManager.eventList.afterRenderContent);
          }
        ]
    );
  }

  /**
   * Show/Hide content
   * @memberOf WidgetContent
   * @param {boolean} show
   * @param {string} eventName
   */
  showContent(show, eventName) {

    /**
     * Get scope
     * @type {Widget}
     */
    const scope = this.scope;

    if (!this.isDevelopmentMode() && !this.isAuthorizeMode()) {
      scope.logger.debug('Unable to toggle content', show);
      return false;
    }

    /**
     * Get prefs
     * @type {*}
     */
    const preferences = this.model.getConfig('preferences');
    let event;

    if (eventName.match(/drag/i)) {
      event = 'Drag';
    } else if (eventName.match(/resizable/i)) {
      event = 'Resize';
    }

    if (!event) {
      scope.logger.warn('Undefined caller', event);
      return false;
    }

    // Define hide locals
    const hide = !!preferences['hideContentOn' + event],
        force = this.isHideableContentArea();

    if (hide || force) {

      // Get $content
      const $content = this.get$content();

      if ($content) {
        show ? $content.show() : $content.hide();
      }
    }
  }

  /**
   * Check if content should be force hide
   * @memberOf WidgetContent
   * @returns {jQuery.length}
   */
  isHideableContentArea() {

    // Get $content
    const $content = this.get$content();

    if ($content) {
      return $content.hasIframe() || $content.hasFlash();
    }
  }

  /**
   * Set content
   * @memberOf WidgetContent
   * @param {class} Content
   * @param {{}} [opts]
   */
  setContent(Content, opts) {

    /**
     * Define content
     * @memberOf WidgetContent
     * @type {*}
     */
    this.content = new Content(null, this, opts);
    this.observer.publish(this.eventManager.eventList.afterSetContent, opts);
  }

  /**
   * Define after set content
   * @memberOf WidgetContent
   * @param {Object} [opts]
   */
  afterSetContent(opts) {
    this.logger.debug('After set content', this.content, opts);
  }

  /**
   * Define after render content
   * @memberOf WidgetContent
   */
  afterRenderContent() {
    this.logger.debug('After render content');

    if (this.model.getConfig('preferences').expandable) {
      this.view.contentExpander();
    }

    /**
     * Get page
     * @type {Page}
     */
    const page = this.controller.getContainment();

    page.observer.publish(page.eventManager.eventList.updateLoadedContent, this);
  }

  /**
   * Get content
   * @memberOf WidgetContent
   * @returns {*}
   */
  getContent() {
    const $content = this.scope.content;
    if ($content) {
      this.scope.logger.warn('Undefined content');
    }
    return $content;
  }

  /**
   * Get $content
   * @memberOf WidgetContent
   * @returns {*}
   */
  get$content() {

    // Get widget content
    const content = this.getContent();

    if (!content) {
      this.scope.logger.debug('Undefined content');
      return false;
    }

    // Get content $item
    const $content = content.view.get$item();

    this.scope.logger.debug('$content', $content);
    return $content;
  }

  /**
   * Clear thumbnail bg
   * @memberOf WidgetContent
   */
  clearThumbnail() {
    this.view.get$item().clearBackground();
  }

  /**
   * Adopt widget dimension on resize page
   * @memberOf WidgetContent
   * @param {Boolean} animate
   */
  adoptDimensions(animate) {
    this.map.adoptTo(animate);
  }

  /**
   * Get widget thumbnail
   * @memberOf WidgetContent
   * @returns {*}
   */
  getThumbnail() {
    return this.model.getConfig('preferences').thumbnail;
  }

  /**
   * Get widget resource
   * @memberOf WidgetContent
   * @returns {string}
   */
  getResource() {
    return this.model.getConfig('preferences').resource;
  }
}