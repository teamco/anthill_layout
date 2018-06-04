/**
 * @type {{renderWidgetRules(*=): boolean}}
 */
module.exports = {

  /**
   * Render widget rules
   * @param widgetRules
   */
  renderWidgetRules(widgetRules) {
    const text = 'Widget rules',
        rulesList = this.getRulesList(widgetRules, text);

    if (!rulesList) {
      return false;
    }

    this.$.append(
        this.getTemplate(text).append(
            this.renderCombobox(rulesList, rulesList[0].value, text,
                'widgetRule', {
                  type: 'click.transferValue',
                  callback: this._transferValue.bind({
                    scope: this,
                    button: 'addWidgetRule'
                  })
                }, true)));

    this.view.button({
          addWidgetRule: {
            text: 'Publish',
            type: 'warning',
            $container: this.$.find('.input-group:last'),
            events: {click: 'addWidgetRule'}
          }
        },
        this.$buttons);
  }
};
