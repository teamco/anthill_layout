define([
  'element/button.element'
], function defineContentRulesRenderer(ButtonElement) {

  return {

    /**
     * Render content rules
     * @memberOf BaseWidgetRules
     * @param contentRules
     */
    renderContentRules: function renderContentRules(contentRules) {

      var cname = this.view.scope.name,
          text = [cname, 'rules'].join(' '),
          rulesList = this.getRulesList(contentRules, text);

      if (!rulesList) {
        return false;
      }

      this.$.append(
        this.getTemplate(text).append(
          this.renderCombobox(
            rulesList,
            rulesList[0].value,
            text,
            [cname, 'Rule'].join(''), {
              type: 'click.transferValue',
              callback: this._transferValue.bind({
                scope: this,
                button: 'addContentRule'
              })
            },
            true
          )
        )
      );

      this.view.button(
        ButtonElement, {
          addContentRule: {
            text: 'Publish',
            type: 'warning',
            $container: this.$.find('.input-group:last'),
            events: {
              click: [
                'add',
                this.view.scope.name,
                'Rule'
              ].join('')
            }
          }
        },
        this.$buttons
      );
    },
  };
});
