/**
 * Created by teamco on 3/19/14.
 */

/**
 * Aggregation of base class and mixin classes.
 * @type {(function(*, ...[*]): __Aggregate)|*|(function(): aggregate)}
 */
const aggregation = require('../../../core/lib/extends/aggregation.js');

/**
 * @constant AddRule
 * @type {module.AddRule}
 */
const AddRule = require('./renderer/add.rule.renderer.js');

/**
 * @constant BaseRulesData
 * @type {module.BaseRulesData}
 */
const BaseRulesData = require('./renderer/base.rules.data.renderer.js');

/**
 * @constant ContentRules
 * @type {module.ContentRules}
 */
const ContentRules = require('./renderer/content.rules.renderer.js');

/**
 * @constant SubscribeRules
 * @type {module.SubscribeRules}
 */
const SubscribeRules = require('./renderer/subscribe.rules.renderer.js');

/**
 * @constant WidgetRules
 * @type {module.WidgetRules}
 */
const WidgetRules = require('./renderer/widget.rules.renderer.js');

/**
 * @class BaseRules
 * @extends {AddRule, BaseRulesData, ContentRules, SubscribeRules, WidgetRules}
 * @type {module.BaseRules}
 */
module.exports = class BaseRules extends aggregation(AddRule, BaseRulesData, ContentRules, SubscribeRules,
    WidgetRules) {

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
