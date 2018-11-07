/**
 * Created by teamco on 3/19/14.
 */

/**
 * Aggregation of base class and mixin classes.
 * @type {(function(*, ...[*]): __Aggregate)|*|(function(): aggregate)}
 */
const aggregation = require('../../../core/lib/extends/aggregation');

/**
 * @constant AntHill
 * @type {module.AntHill}
 */
const AntHill = require('../../../core/config/anthill');

/**
 * @constant AddRuleRenderer
 * @type {module.AddRuleRenderer}
 */
const AddRuleRenderer = require('./renderer/add.rule.renderer.js');

/**
 * @constant BaseRulesDataRenderer
 * @type {module.BaseRulesDataRenderer}
 */
const BaseRulesDataRenderer = require('./renderer/base.rules.data.renderer.js');

/**
 * @constant ContentRulesRenderer
 * @type {module.ContentRulesRenderer}
 */
const ContentRulesRenderer = require('./renderer/content.rules.renderer.js');

/**
 * @constant SubscribeRulesRenderer
 * @type {module.SubscribeRulesRenderer}
 */
const SubscribeRulesRenderer = require('./renderer/subscribe.rules.renderer.js');

/**
 * @constant WidgetRulesRenderer
 * @type {module.WidgetRulesRenderer}
 */
const WidgetRulesRenderer = require('./renderer/widget.rules.renderer.js');

/**
 * @class BaseRules
 * @extends {AddRuleRenderer, BaseRulesDataRenderer, ContentRulesRenderer, SubscribeRulesRenderer, WidgetRulesRenderer,
 *  PluginElement}
 * @type {module.BaseRules}
 */
module.exports = class BaseRules extends aggregation(AntHill, AddRuleRenderer, BaseRulesDataRenderer,
    ContentRulesRenderer,
    SubscribeRulesRenderer, WidgetRulesRenderer) {

  /**
   * @constructor
   * @param {string} [name]
   * @param {BaseElement} element
   */
  constructor(name, element) {
    super(name || 'BaseRules', null, false);

    /**
     * Buttons collector
     * @property BaseRules
     * @type {{}}
     */
    this.$buttons = {};

    /**
     * Define default widget rules
     * @property BaseRules
     * @type {*}
     */
    this.defaultRules = {};

    /**
     * @type {BaseElement}
     * @property BaseRules
     */
    this.element = element;
  }

  /**
   * Get rules template
   * @memberOf BaseRules
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
   * @memberOf BaseRules
   * @param {string} value
   * @private
   */
  _transferValue(value) {
    this.element.view.scope.$buttons[this.button].$.attr({value: value});
  }

  /**
   * Get rules list
   * @memberOf BaseRules
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
      this.element.view.scope.logger.warn('No rules', type, rules);
      return false;
    }

    rulesList.sort((a, b) => a.value.localeCompare(b.value));

    rulesList.unshift({
      type: 'text',
      value: ['Select rule (', rulesList.length - 1, ')'].join('')
    });

    return rulesList;
  }

  /**
   * Open preferences
   * @memberOf BaseRules
   * @param opts
   */
  openRules(opts) {

    /**
     * Define buttons
     * @type {*}
     */
    const buttons = $.extend(true, {}, {
      locate: {
        text: 'Locate',
        type: 'default',
        events: {
          click: 'locateElementItem'
        }
      },
      approve: {
        text: 'OK',
        type: 'success',
        events: {
          click: 'approveUpdateRules'
        }
      },
      reject: {
        text: 'Cancel',
        type: 'default',
        events: {
          click: 'rejectModalEvent'
        }
      }
    }, opts.buttons || {});

    this.element.view.modalDialog({
      style: opts.style,
      type: opts.type || 'info',
      title: opts.title,
      text: opts.config.uuid,
      html: opts.$html,
      cover: true,
      buttons: buttons
    });
  }
};
