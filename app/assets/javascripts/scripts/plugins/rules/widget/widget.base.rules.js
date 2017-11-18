/**
 * Created with RubyMine.
 * User: teamco
 * Date: 3/7/14
 * Time: 7:39 PM
 */

defineP([
  'plugins/rules/widget/rules',
  'plugins/rules/widget/renderer/add.rule.renderer',
  'plugins/rules/widget/renderer/base.rules.data.renderer',
  'plugins/rules/widget/renderer/content.rules.renderer',
  'plugins/rules/widget/renderer/subscribe.rules.renderer',
  'plugins/rules/widget/renderer/widget.rules.renderer'
], function defineBaseWidgetRules(BaseRules, addRuleRenderer,
    baseRulesDataRenderer, contentRulesRenderer, subscribeRulesRenderer,
    widgetRulesRenderer) {

  /**
   * Define rules
   * @class BaseWidgetRules
   * @extends Renderer
   * @extends BaseRules
   * @extends PluginElement
   * @constructor
   */
  var BaseWidgetRules = function BaseWidgetRules() {

    /**
     * Buttons collector
     * @property BaseWidgetRules
     * @type {{}}
     */
    this.$buttons = {};
  };

  return BaseWidgetRules.extend('BaseWidgetRules', {

        /**
         * Define default widget rules
         * @memberOf BaseWidgetRules
         * @type {*}
         */
        defaultRules: {},

        /**
         * Get rules template
         * @memberOf BaseWidgetRules
         * @param {string} text
         * @private
         */
        getTemplate: function getTemplate(text) {
          return $([
            '<div class="input-group">',
            '<span class="input-group-addon">', text, '</span>',
            '</div>'
          ].join(''));
        },

        /**
         * Transfer selected value
         * @memberOf BaseWidgetRules
         * @param {string} value
         * @private
         */
        _transferValue: function _transferValue(value) {
          this.scope.$buttons[this.button].$.attr({
            value: value
          });
        },

        /**
         * Get rules list
         * @memberOf BaseWidgetRules
         * @param {array} rules
         * @param {string} type
         * @returns {array|boolean}
         */
        getRulesList: function getRulesList(rules, type) {

          /**
           * Define rules list
           * @type {Array}
           */
          var rulesList = [];

          for (var key in rules) {
            if (rules.hasOwnProperty(key)) {
              rulesList.push({
                type: 'text',
                value: rules[key]
              });
            }
          }

          if (!rulesList.length) {
            this.view.scope.logger.warn('No rules', type, rules);
            return false;
          }

          rulesList.sort(function sortByValue(a, b) {
            return a.value.localeCompare(b.value);
          });

          rulesList.unshift({
            type: 'text',
            value: ['Select rule (', rulesList.length - 1, ')'].join('')
          });

          return rulesList;
        }
      },
      BaseRules.prototype,
      addRuleRenderer,
      baseRulesDataRenderer,
      contentRulesRenderer,
      subscribeRulesRenderer,
      widgetRulesRenderer
  );
});
