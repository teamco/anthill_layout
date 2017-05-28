/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define(
    ['plugins/plugin.element'],

    /**
     * Define PageContentRulesElement
     * @param {PluginElement} PluginElement
     * @returns {*}
     */
    function definePageContentRulesElement(PluginElement) {

      /**
       * Define WorkspaceData AddPage Element
       * @constructor
       * @class PageContentRulesElement
       * @extends Renderer
       * @extends PluginElement
       * @param {WorkspaceDataView} view
       * @param opts
       * @returns {PageContentRulesElement}
       */
      var PageContentRulesElement = function PageContentRulesElement(view,
          opts) {

        this._config(view, opts, $('<li class="content" />')).build({
          $container: opts.$container,
          destroy: false
        });

        /**
         * Define title
         * @memberOf PageContentRulesElement
         * @type {string}
         */
        this.title = 'Show page content visual rules';

        /**
         * Define description
         * @memberOf PageContentRulesElement
         * @type {string}
         */
        this.description =
            'Clicking a button will take you to the show page content rules';

        return this.init();
      };

      return PageContentRulesElement.extend(
          'PageContentRulesElement', {

            /**
             * Define inner content
             * @memberOf WorkspaceDataContentElement
             */
            getTemplate: function getTemplate() {
              $('<a class="page-rules" />').appendTo(this.$);
            },

            /**
             * Define Init
             * @memberOf PageContentRulesElement
             * @returns {PageContentRulesElement}
             */
            init: function init() {

              this.setTitle(this.title);
              this.renderTooltip({
                title: this.title,
                description: this.description,
                selector: this.$
              });

              this.getTemplate();

              return this;
            },

            /**
             * Render content rules wizard
             * @memberOf PageContentRulesElement
             * @param {Page} page
             * @returns {*|jQuery|HTMLElement}
             */
            renderWizard: function renderWizard(page) {

              require(['plugins/page.data/element/page.rules'], function() {

              });
            }
          },
          PluginElement.prototype
      );
    }
);