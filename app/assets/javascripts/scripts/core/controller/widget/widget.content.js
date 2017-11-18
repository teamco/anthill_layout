/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/27/14
 * Time: 5:40 PM
 */

defineP([
  'controller/widget/widget.expand',
  'controller/widget/widget.scroll',
  'controller/widget/widget.comment'
], function defineWidgetContent(WidgetExpand, WidgetScroll, WidgetComment) {

  /**
   * Define WidgetContent
   * @class WidgetContent
   * @extends {WidgetExpand} WidgetExpand
   * @extends {WidgetScroll} WidgetScroll
   * @extends {WidgetComment} WidgetComment
   * @extends {BaseController} BaseController
   * @constructor
   */
  var WidgetContent = function WidgetContent() {
  };

  return WidgetContent.extend(
      'WidgetContent', {

        /**
         * Define load widget data
         * @memberOf WidgetContent
         */
        loadWidgetData: function loadWidgetData() {

          /**
           * Get local scope
           * @type {Widget}
           */
          var scope = this.scope;

          /**
           * Get widget page
           * @type {Workspace}
           */
          var workspace = this.getWorkspace();

          /**
           * Get current page
           * @type {Page}
           */
          var page = workspace.controller.isLoadPageContent();

          if (page) {

            scope.observer.batchPublish(
                scope.eventmanager.eventList.loadContent,
                scope.eventmanager.eventList.loadPreferences
            );

            scope.logger.debug('Content start loading');
          }
        },

        /**
         * Load widget content
         * @memberOf WidgetContent
         */
        loadContent: function loadContent() {

          /**
           * Get resource
           * @type {string}
           */
          var resource = this.model.getConfig('preferences').resource;

          if (!this.base.isString(resource)) {
            this.logger.error('Unable to load resource');
            return false;
          }

          this.controller.fetchExternalContent(resource);
          this.controller.fetchInternalContent(resource);
        },

        /**
         * Define fetch external resource
         * @memberOf WidgetContent
         * @returns {*|string}
         */
        fetchExternalResource: function fetchExternalResource() {
          return this.model.getConfig('preferences').external_resource;
        },

        /**
         * Define fetch content
         * @memberOf WidgetContent
         * @param {string} path
         * @param {boolean} isInternal
         */
        fetchContent: function fetchContent(path, isInternal) {

          /**
           * Define widget instance
           * @type {Widget}
           */
          var widget = this.scope;

          widget.logger.debug('Load widget content', path);

          requireP([path], function _getDependencies(Content) {

            if (isInternal) {
              widget.controller.destroyContent();
            }

            widget.observer.publish(
                widget.eventmanager.eventList.setContent,
                [Content, {
                  events: widget.contentEvents || {},
                  rules: widget.contentRules || {}
                }]
            );

            widget.logger.debug('Content finish loading');
          });
        },

        /**
         * Define fetch external content
         * @memberOf WidgetContent
         * @param {string} resource
         * @returns {boolean}
         */
        fetchExternalContent: function fetchExternalContent(resource) {

          /**
           * Define widget instance
           * @type {Widget}
           */
          var widget = this.scope;

          if (this.isInternalContent()) {

            widget.logger.debug('Fetch internal content');
            return false;
          }

          // Get prefs
          var prefs = widget.model.getConfig('preferences');

          /**
           * Define resource path
           * @type {string}
           */
          var path = [
            prefs.external_resource,
            resource,
            '.js'
          ].join('');

          this.fetchContent(path, 0);
        },

        /**
         * Destroy widget content
         * @memberOf WidgetContent
         */
        destroyContent: function destroyContent() {

          // Delete content
          delete this.scope.content;
          this.getView().elements.$content.cleanMetamorphicContent();
        },

        /**
         * Define fetch internal content
         * @memberOf WidgetContent
         * @param {string} resource
         * @returns {boolean}
         */
        fetchInternalContent: function fetchInternalContent(resource) {

          /**
           * Define widget instance
           * @type {Widget}
           */
          var widget = this.scope;

          if (this.isExternalContent()) {

            widget.logger.debug('Fetch external content');
            return false;
          }

          /**
           * Define resource path
           * @type {string}
           */
          var path = [
            'plugins/widgets',
            ('/' + resource).repeat(2)
          ].join('');

          this.fetchContent(path, 1);
        },

        /**
         * Define if widget content is internal
         * @memberOf WidgetContent
         * @returns {boolean}
         */
        isInternalContent: function isInternalContent() {
          return !this.isExternalContent();
        },

        /**
         * Define if widget content is external
         * @memberOf WidgetContent
         * @returns {boolean}
         */
        isExternalContent: function isExternalContent() {
          return !!this.model.getConfig('preferences').is_external;
        },

        /**
         * Define prepare rendering content
         * @memberOf WidgetContent
         * @param {PluginController} plugin
         * @param {Function} callback
         */
        prepareRenderingContent: function prepareRenderingContent(plugin,
            callback) {

          var widget = this.scope,
              language = this.i18n.getCurrentLanguage(),
              translationPath = this.isExternalContent() ? [
                    this.model.getConfig('preferences').external_resource,
                    '/translations/', language, '.js'
                  ] : [
                    'plugins/widgets/',
                    plugin.name.toPoint().replace(/\./, ''),
                    '/translations/', language
                  ];

          plugin.observer.publish(
              plugin.eventmanager.eventList.updateTranslations, [
                translationPath.join(''),
                function _successRenderedExtendedCallback() {

                  callback(plugin);

                  widget.observer.publish(
                      widget.eventmanager.eventList.afterRenderContent
                  );
                }
              ]
          );
        },

        /**
         * Show/Hide content
         * @memberOf WidgetContent
         * @param {boolean} show
         */
        showContent: function showContent(show) {

          /**
           * Get scope
           * @type {Widget}
           */
          var scope = this.scope;

          if (!(this.isDevelopmentMode() || this.isAuthorizeMode())) {
            scope.logger.debug('Unable to toggle content', show);
            return false;
          }

          /**
           * Get prefs
           * @type {*}
           */
          var preferences = this.model.getConfig('preferences'),
              eventName = this.showContent.caller.eventName,
              event;

          if (eventName.match(/drag/i)) {
            event = 'Drag';
          } else if (eventName.match(/resizable/i)) {
            event = 'Resize';
          }

          if (_.isUndefined(event)) {
            scope.logger.warn('Undefined caller', fname);
            return false;
          }

          // Define hide locals
          var hide = !!preferences['hideContentOn' + event],
              force = this.isHideableContentArea();

          if (hide || force) {

            // Get $content
            var $content = this.get$content();

            if ($content) {
              show ? $content.show() : $content.hide();
            }
          }
        },

        /**
         * Check if content should be force hide
         * @memberOf WidgetContent
         * @returns {jQuery.length}
         */
        isHideableContentArea: function isHideableContentArea() {

          // Get $content
          var $content = this.get$content();

          if ($content) {
            return $content.hasIframe() ||
                $content.hasFlash();
          }
        },

        /**
         * Set content
         * @memberOf WidgetContent
         * @param {Function} Content
         * @param {{}} [opts]
         */
        setContent: function setContent(Content, opts) {

          /**
           * Define content
           * @memberOf WidgetContent
           * @type {*}
           */
          this.content = new Content(this, opts);

          this.observer.publish(
              this.eventmanager.eventList.afterSetContent,
              opts
          );
        },

        /**
         * Define after set content
         * @memberOf WidgetContent
         * @param {Object} [opts]
         */
        afterSetContent: function afterSetContent(opts) {
          this.logger.debug('After set content', this.content, opts);
        },

        /**
         * Define after render content
         * @memberOf WidgetContent
         */
        afterRenderContent: function afterRenderContent() {

          this.logger.debug('After render content');

          if (this.model.getConfig('preferences').expandable) {
            this.view.contentExpander();
          }

          /**
           * Get page
           * @type {Page}
           */
          var page = this.controller.getContainment();

          page.observer.publish(
              page.eventmanager.eventList.updateLoadedContent,
              this
          );
        },

        /**
         * Get content
         * @memberOf WidgetContent
         * @returns {*}
         */
        getContent: function getContent() {
          return this.scope.content;
        },

        /**
         * Get $content
         * @memberOf WidgetContent
         * @returns {*}
         */
        get$content: function get$content() {

          // Get widget content
          var content = this.getContent();

          if (_.isUndefined(content)) {
            this.scope.logger.debug('Undefined content');
            return false;
          }

          // Get content $item
          var $content = content.view.get$item();

          this.scope.logger.debug('$content', $content);
          return $content;
        },

        /**
         * Clear thumbnail bg
         * @memberOf WidgetContent
         */
        clearThumbnail: function clearThumbnail() {
          this.view.get$item().clearBackground();
        },

        /**
         * Adopt widget dimension on resize page
         * @memberOf WidgetContent
         * @param {Boolean} animate
         */
        adoptDimensions: function adoptDimensions(animate) {
          this.map.adoptTo(animate);
        },

        /**
         * Get widget thumbnail
         * @memberOf WidgetContent
         * @returns {*}
         */
        getThumbnail: function getThumbnail() {
          return this.model.getConfig('preferences').thumbnail;
        },

        /**
         * Get widget resource
         * @memberOf WidgetContent
         * @returns {string}
         */
        getResource: function getResource() {
          return this.model.getConfig('preferences').resource;
        }
      },
      WidgetExpand.prototype,
      WidgetScroll.prototype,
      WidgetComment.prototype
  );
});
