/**
 * @class ContentRulesRenderer
 * @type {module.ContentRulesRenderer}
 */
module.exports = class ContentRulesRenderer {

  /**
   * @memberOf ContentRulesRenderer
   * @param contentRules
   */
  renderContentRules(contentRules) {

    /**
     * @constant $element
     * @type {jQuery}
     */
    const $element = this.element.$;

    /**
     * @constant view
     * @type {BaseView}
     */
    const view = this.element.view;

    const cname = view.scope.name,
        text = [cname, 'rules'].join(' '),
        rulesList = this.getRulesList(contentRules, text);

    if (!rulesList) {
      return false;
    }

    $element.append(this.getTemplate(text).append(
        this.element.renderCombobox(rulesList, rulesList[0].value, text,
            [cname, 'Rule'].join(''), {
              type: 'click.transferValue',
              callback: this._transferValue.bind({
                scope: this,
                button: 'addContentRule'
              })
            }, true)));

    this.element.view.button({
          addContentRule: {
            text: 'Publish',
            type: 'warning',
            $container: $element.find('.input-group:last'),
            events: {click: 'addContentRule'}
          }
        },
        this.$buttons
    );
  }
};
