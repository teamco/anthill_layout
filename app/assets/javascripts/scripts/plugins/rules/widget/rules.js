/**
 * Created by teamco on 3/19/14.
 */

/**
 * Aggregation of base class and mixin classes.
 * @type {(function(*, ...[*]): __Aggregate)|*|(function(): aggregate)}
 */
const aggregation = require('../../../core/lib/extends/aggregation.js');

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
 * @extends {AddRuleRenderer, BaseRulesDataRenderer, ContentRulesRenderer, SubscribeRulesRenderer, WidgetRulesRenderer}
 * @type {module.BaseRules}
 */
module.exports = class BaseRules extends aggregation(AddRuleRenderer, BaseRulesDataRenderer, ContentRulesRenderer,
    SubscribeRulesRenderer, WidgetRulesRenderer) {

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
