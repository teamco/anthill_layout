/**
 * Created with RubyMine.
 * User: teamco
 * Date: 3/7/14
 * Time: 7:39 PM
 */

/**
 * @constant BaseRules
 * @type {module.BaseRules}
 */
const BaseRules = require('./rules.js');

/**
 * @class BaseWidgetRules
 * @extends BaseRules
 * @type {module.BaseWidgetRules}
 */
module.exports = class BaseWidgetRules extends BaseRules {
  
  /**
   * Define rules
   * @class BaseWidgetRules
   * @extends Renderer
   * @extends BaseRules
   * @extends PluginElement
   * @constructor
   */
  constructor() {
    super();

    /**
     * Buttons collector
     * @property BaseWidgetRules
     * @type {{}}
     */
    this.$buttons = {};

    /**
     * Define default widget rules
     * @property BaseWidgetRules
     * @type {*}
     */
    this.defaultRules = {};
  }

  /**
   * Get rules template
   * @memberOf BaseWidgetRules
   * @param {string} text
   * @private
   */
  getTemplate(text) {
    return $([
      '<div class="input-group">',
      '<span class="input-group-addon">', text, '</span>',
      '</div>'
    ].join(''));
  }

  /**
   * Transfer selected value
   * @memberOf BaseWidgetRules
   * @param {string} value
   * @private
   */
  _transferValue(value) {
    this.scope.$buttons[this.button].$.attr({value: value});
  }

  /**
   * Get rules list
   * @memberOf BaseWidgetRules
   * @param {array} rules
   * @param {string} type
   * @returns {array|boolean}
   */
  getRulesList(rules, type) {

    /**
     * Define rules list
     * @type {Array}
     */
    let rulesList = [];

    for (let key in rules) {
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

    rulesList.sort((a, b) => a.value.localeCompare(b.value));

    rulesList.unshift({
      type: 'text',
      value: ['Select rule (', rulesList.length - 1, ')'].join('')
    });

    return rulesList;
  }
};

