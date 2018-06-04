/**
 * Created by teamco on 3/19/14.
 */

/**
 * Aggregation of base class and mixin classes.
 * @type {(function(*, ...[*]): __Aggregate)|*|(function(): aggregate)}
 */
const aggregation = require('../../../core/lib/extends/aggregation.js');

/**
 * @constant addRuleRenderer
 * @type {{addRule}|*}
 */
const addRuleRenderer = require('./renderer/add.rule.renderer.js');

/**
 * @constant baseRulesDataRenderer
 * @type {{renderBaseRulesData, (*, *=, *=): void}}
 */
const baseRulesDataRenderer = require('./renderer/base.rules.data.renderer.js');

/**
 * @constant contentRulesRenderer
 * @type {{renderContentRules, (*=): boolean}}
 */
const contentRulesRenderer = require('./renderer/content.rules.renderer.js');

/**
 * @constant subscribeRulesRenderer
 * @type {{renderSubscribeRules, (*=): boolean}}
 */
const subscribeRulesRenderer = require('./renderer/subscribe.rules.renderer.js');

/**
 * @constant widgetRulesRenderer
 * @type {{renderWidgetRules, (*=): boolean}}
 */
const widgetRulesRenderer = require('./renderer/widget.rules.renderer.js');

/**
 * @class BaseRules
 * @extends {addRuleRenderer, baseRulesDataRenderer, contentRulesRenderer, subscribeRulesRenderer, widgetRulesRenderer}
 * @type {module.BaseRules}
 */
module.exports = class BaseRules extends aggregation(addRuleRenderer, baseRulesDataRenderer, contentRulesRenderer,
    subscribeRulesRenderer, widgetRulesRenderer) {

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

    this.modalDialog({
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
