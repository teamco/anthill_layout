/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:13 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'config/anthill',
  'modules/View',
  'plugins/rules/widget/rules',
  'element/header.element',
  'element/footer.element',
  'plugins/widget.rules/element/widget.rules.content.element',
  'plugins/widget.rules/element/widget.rules.element'
], function defineWidgetRulesView(AntHill, BaseView, BaseRules, Header, Footer,
    WidgetRulesContentElement, WidgetRulesElement) {

  /**
   * Define view
   * @class WidgetRulesView
   * @constructor
   * @extends BaseView
   * @extends BaseRules
   */
  var WidgetRulesView = function WidgetRulesView() {
  };

  return WidgetRulesView.extend(
      'WidgetRulesView', {

        /**
         * Render WidgetRules
         * @memberOf WidgetRulesView
         * @returns {boolean}
         */
        renderWidgetRules: function renderWidgetRules() {

          if (!this.isCached('$widgetrules', WidgetRulesElement)) {

            /**
             * Define WidgetRules element
             * @type {WidgetRulesElement}
             */
            this.elements.$widgetrules = new WidgetRulesElement(this, {
              id: this.createUUID(),
              $container: this.get$container().$
            });
          }
        },

        /**
         * Render widget.rules content
         * @memberOf WidgetRulesView
         * @param data
         * @returns {boolean}
         */
        renderContent: function renderContent(data) {

          this.cleanElementItems();
          this.updateElementItems();

          this.renderFilter(
              this.updateFooterContent.bind(this)
          );

          for (var index in data) {

            if (data.hasOwnProperty(index)) {

              /**
               * Render item
               * @type {WidgetRulesContentElement}
               */
              var $item = new WidgetRulesContentElement(this, {
                style: 'content',
                uuid: [
                  data[index].model.getConfig('uuid'),
                  this.scope.name.toDash()
                ].join('-'),
                $container: this.get$item().$,
                data: data[index]
              });

              this.scope.observer.publish(
                  this.scope.eventmanager.eventList.storeItem,
                  data[index]
              );

              this.controller.defineContentReferrer(data[index]);

              this.updateElementItems($item);
            }
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
         * @memberOf WidgetRulesView
         */
        updateFooterContent: function updateFooterContent() {
          this.renderFooter(Footer, this.get$item());
        },

        /**
         * Show rules
         * @memberOf WidgetRulesView
         * @param config
         * @param load
         * @returns {boolean|*}
         */
        showWidgetRulesModal: function showWidgetRulesModal(config, load) {

          if (!load) {
            return false;
          }

          /**
           * Define scope
           * @type {WidgetRules|{name}}
           */
          var scope = this.scope;

          /**
           * Define $html
           * @type {PluginElement}
           */
          var $html = this.controller.getRulesHtml(config.uuid, load);

          if (!$html) {

            scope.logger.warn('Wait for loading rules');
            return false;
          }

          this.openRules({
            config: config,
            $html: $html.$,
            style: [
              config.preferences.resource,
              'widget-rules rules'
            ].join(' '),
            title: 'Widget rules',
            buttons: {
              preferences: {
                text: 'Preferences',
                type: 'info',
                events: {
                  click: 'preferences' + scope.name
                }
              }
            }
          });
        },

        /**
         * Render widget.rules
         * @memberOf WidgetRulesView
         */
        render: function render() {

          this.scope.observer.publish(
              this.scope.eventmanager.eventList.successRendered,
              this.renderWidgetRules.bind(this)
          );
        }

      },
      AntHill.prototype,
      BaseView.prototype,
      BaseRules.prototype
  )
});