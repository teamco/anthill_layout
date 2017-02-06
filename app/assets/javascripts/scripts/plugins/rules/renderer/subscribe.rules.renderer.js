define(function defineSubscribeRulesRenderer() {

  return {

    /**
     * Render subscribe rules
     * @memberOf BaseWidgetRules
     * @param subscribe
     */
    renderSubscribeRules: function renderSubscribeRules(subscribe) {

      subscribe = this.base.define(subscribe, {}, true);

      /**
       * Get published rules
       * @type {{}}
       */
      var published = this.view.controller.getPublishedRules();

      var empty = false,
          render = false;

      if (this.base.lib.hash.hashLength(published) === 0) {
        this.view.scope.logger.debug('No published rules', published);
        return false;
      }

      /**
       * Set $ul
       * @type {*|jQuery}
       */
      var $ul = $('<ul />').addClass('subscribe-rules');

      /**
       * Define title
       * @type {string}
       */
      var title = 'Subscribe events';

      for (var index in published) {
        if (published.hasOwnProperty(index)) {

          var $inner = $('<ul />'),
              rulesList = this.base.define(
                  published[index].rules, {}, true
              ),
              checkedRulesList = this.base.define(
                  subscribe[index], {}, true
              );

          empty = !this.base.lib.hash.hashLength(rulesList);

          for (var type in rulesList) {
            if (rulesList.hasOwnProperty(type)) {

              var rules = rulesList[type],
                  checked = checkedRulesList[type] || [];

              for (var i = 0, l = rules.length; i < l; i++) {

                var $checkbox = this.renderCheckbox({
                  name: [type, rules[i]].join(':'),
                  text: rules[i],
                  checked: $.inArray(rules[i], checked) !== -1,
                  disabled: false,
                  visible: true
                });

                $checkbox.find('.input-group-addon').append(type);

                $inner.append(
                  $('<li />').append($checkbox)
                );
              }
            }
          }

          if (!empty) {

            render = true;

            $('<li />').append(
              $('<fieldset />').append([
                $('<legend />').attr({'data-uuid': index}).html([
                  '<span class="glyphicon glyphicon-chevron-up"></span>',
                  published[index].type, ': ',
                  index.replace(/-content/, '')
                ].join('')).on(
                  'click.toggle',
                  this.toggleFieldset.bind(this)
                ),
                $inner
              ])
            ).appendTo($ul);
          }
        }
      }

      if (render) {
        this.$.find('div.content-rules').append(
          $('<fieldset />').append([
            $('<legend />').text(title).on('click.toggle', this.toggleFieldset.bind(this)).attr({
              title: title
            }),
            $ul
          ])
        );
      }
    }
  };
});
