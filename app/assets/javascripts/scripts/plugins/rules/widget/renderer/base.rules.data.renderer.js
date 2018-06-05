/**
 * @class BaseRulesData
 * @type {module.BaseRulesData}
 */
module.exports = class BaseRulesData {

  /**
   * @memberOf BaseRulesData
   * @param data
   * @param widgetRules
   * @param contentRules
   */
  renderBaseRulesData(data, widgetRules, contentRules) {

    /**
     * Buttons collector
     * @property BaseWidgetRules
     * @type {{}}
     */
    this.$buttons = this.base.define(this.$buttons, {}, true);

    this.renderWidgetRules(widgetRules);
    this.renderContentRules(contentRules);
    this.$.append('<div class="content-rules" />');
    this.renderSubscribeRules(data.subscribe);
  }
};