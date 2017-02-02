/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define(
    [
      'config/anthill',
      'modules/Controller',
      'modules/Preferences',
      'modules/Router',
      'controller/page/page.layer',
      'controller/page/page.layout',
      'controller/page/page.widget',
      'controller/page/page.maximize'
    ], function definePageController(AntHill, BaseController, BasePreferences,
                                     Router, PageLayer, PageLayout, PageWidget,
                                     PageItemMaximize) {
      /**
       * Define page controller
       * @class PageController
       * @extends {AntHill} AntHill
       * @extends {BaseController} BaseController
       * @extends {BasePreferences} BasePreferences
       * @extends {Router} Router
       * @extends {PageLayer} PageLayer
       * @extends {PageLayout} PageLayout
       * @extends {PageWidget} PageWidget
       * @extends {PageItemMaximize} PageItemMaximize
       * @constructor
       */
      var PageController = function PageController() {
      };

      return PageController.extend('PageController', {

            /**
             * Define set as ready state
             * @memberOf PageController
             */
            setAsReady: function setAsReady() {
              this.logger.debug('Page is ready to use');
              this.controller.store();
            },

            /**
             * Transfer preferences
             * @memberOf PageController
             * @param {string} index
             * @param value
             */
            transferContentPreferences: function transferContentPreferences(index,
                                                                            value) {
              this.logger.debug('Preferences successfully transferred', index, value);
            },

            /**
             * Get content loaded
             * @memberOf PageController
             * @return {boolean}
             */
            isLoadedContent: function isLoadedContent() {
              return this.scope.contentLoaded;
            },

            /**
             * Define content loaded setter
             * @memberOf PageController
             * @param {boolean} loaded
             */
            setLoadedContent: function setLoadedContent(loaded) {

              /**
               * Define content loaded
               * @memberOf Page
               * @type {boolean}
               */
              this.contentLoaded = loaded;
              this.view.get$item().hideLoader();
            },

            /**
             * Check if page lazy loaded
             * @memberOf PageController
             * @returns {boolean}
             */
            isLazyLoaded: function isLazyLoaded() {
              return !!this.model.getConfig('preferences').lazyLoading;
            },

            /**
             * Check if page is current
             * @memberOf PageController
             * @returns {Page}
             */
            isCurrent: function isCurrent() {

              /**
               * Define page matcher
               * @type {Array|{index: number, input: string}}
               */
              var pageMatch = this.isPageMatch2Hash();

              if (pageMatch) {
                if (pageMatch[1] === this.model.getItemTitle().
                        toClassName()) {
                  return this.scope;
                }
              }
            }
          },

          AntHill.prototype,
          BaseController.prototype,
          BasePreferences.prototype,
          PageLayer.prototype,
          PageLayout.prototype,
          PageWidget.prototype,
          PageItemMaximize.prototype,
          Router.prototype
      );
    }
);