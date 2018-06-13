/**
 * @class BaseRulesDataRenderer
 * @type {module.BaseRulesDataRenderer}
 */
module.exports = class BaseRulesDataRenderer {

  /**
   * @memberOf BaseRulesDataRenderer
   * @param data
   * @param widgetRules
   * @param contentRules
   */
  renderBaseRulesData(data, widgetRules, contentRules) {

    /**
     * Buttons collector
     * @property BaseRulesDataRenderer
     * @type {{}}
     */
    this.$buttons = this.$buttons || {};

    this.renderWidgetRules(widgetRules);
    this.renderContentRules(contentRules);
    this.$.append('<div class="content-rules" />');
    this.renderSubscribeRules(data.subscribe);
  }
};