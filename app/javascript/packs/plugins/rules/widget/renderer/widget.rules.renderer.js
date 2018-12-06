/**
 * @class WidgetRulesRenderer
 * @type {WidgetRulesRenderer}
 */
export class WidgetRulesRenderer {

  /**
   * @memberOf WidgetRulesRenderer
   * @param widgetRules
   */
  renderWidgetRules(widgetRules) {
    const text = 'Widget rules',
        rulesList = this.getRulesList(widgetRules, text);

    if (!rulesList) {
      return false;
    }

    /**
     * @constant $element
     * @type {jQuery}
     */
    const $element = this.element.$;

    $element.append(
        this.getTemplate(text).append(
            this.element.renderDropDown(rulesList, rulesList[0].value, text,
                'widgetRule', {
                  type: 'click.transferValue',
                  callback: this._transferValue.bind({
                    scope: this,
                    button: 'addWidgetRule'
                  })
                }, true)));

    this.element.view.button({
          addWidgetRule: {
            text: 'Publish',
            type: 'warning',
            $container: $element.find('.input-group:last'),
            events: {click: 'addWidgetRule'}
          }
        },
        this.$buttons);
  }
}
