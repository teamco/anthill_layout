define(function defineBaseRulesDataRenderer() {

  return {

    /**
     * Render data
     * @memberOf BaseWidgetRules
     * @param data
     * @param widgetRules
     * @param contentRules
     */
    renderBaseRulesData: function renderBaseRulesData(data, widgetRules,
        contentRules) {

      /**
       * Buttons collector
       * @memberOf BaseWidgetRules
       * @type {{}}
       */
      this.$buttons = this.base.define(this.$buttons, {}, true);

      this.renderWidgetRules(widgetRules);
      this.renderContentRules(contentRules);
      this.$.append('<div class="content-rules" />');
      this.renderSubscribeRules(data.subscribe);
    }
  };
});
