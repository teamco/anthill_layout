/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

defineP(
    ['plugins/plugin.element'],

    /**
     * Define PageDataRulesElement
     * @param {PluginElement} PluginElement
     * @returns {*}
     */
    function definePageDataRulesElement(PluginElement) {

      /**
       * Define WorkspaceData AddPage Element
       * @constructor
       * @class PageDataRulesElement
       * @extends Renderer
       * @extends PluginElement
       * @param {WorkspaceDataView} view
       * @param opts
       * @returns {PageDataRulesElement}
       */
      var PageDataRulesElement = function PageDataRulesElement(view, opts) {

        this._config(view, opts, $('<li class="content" />')).build({
          $container: opts.$container,
          destroy: false
        });

        /**
         * Define title
         * @memberOf PageDataRulesElement
         * @type {string}
         */
        this.title = 'Show page content visual rules';

        /**
         * Define description
         * @memberOf PageDataRulesElement
         * @type {string}
         */
        this.description =
            'Clicking a button will take you to the show page content rules';

        return this.init();
      };

      return PageDataRulesElement.extend(
          'PageDataRulesElement', {

            /**
             * Define inner content
             * @memberOf WorkspaceDataContentElement
             */
            getTemplate: function getTemplate() {
              $('<a class="page-rules" />').appendTo(this.$);
            },

            /**
             * Define Init
             * @memberOf PageDataRulesElement
             * @returns {PageDataRulesElement}
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
             * @memberOf PageDataRulesElement
             * @param {Page} page
             * @returns {*|jQuery|HTMLElement}
             */
            renderWizard: function renderWizard(page) {

              var uuid = this.base.lib.generator.UUID();
              var $html = $('<div class="canvas-rules" />').attr({id: uuid});

              require(['lib/packages/go'], function() {
                require(['plugins/rules/page/page.rules'],
                    function(GenerateRules) {
                      var rules = new GenerateRules(uuid, page);
                    }
                );
              });

              return $html;
            }
          },
          PluginElement.prototype
      );
    }
);