/**
 * @type {{renderSubscribeRules(*=): boolean}}
 */
module.exports = {

  /**
   * Render subscribe rules
   * @param subscribe
   */
  renderSubscribeRules(subscribe) {
    subscribe = subscribe || {};

    /**
     * Get published rules
     * @type {{}}
     */
    const published = this.view.controller.getPublishedRules();

    let empty = false,
        render = false;

    if (!this.base.lib.hash.hashLength(published)) {
      this.view.scope.logger.debug('No published rules', published);
      return false;
    }

    /**
     * Set $ul
     * @type {*|jQuery}
     */
    const $ul = $('<ul />').addClass('subscribe-rules');

    /**
     * Define title
     * @type {string}
     */
    const title = 'Subscribe events';

    for (let index in published) {
      if (published.hasOwnProperty(index)) {

        const $inner = $('<ul />'),
            rulesList = published[index].rules || {},
            checkedRulesList = subscribe[index] || {};

        empty = !Object.keys(rulesList).length;

        for (let type in rulesList) {
          if (rulesList.hasOwnProperty(type)) {

            const rules = rulesList[type],
                checked = checkedRulesList[type] || [];

            for (let i = 0, l = rules.length; i < l; i++) {

              const $checkbox = this.renderCheckbox({
                name: [type, rules[i]].join(':'),
                text: rules[i],
                checked: $.inArray(rules[i], checked) !== -1,
                disabled: false,
                visible: true
              });

              $checkbox.find('.input-group-addon').append(type);
              $inner.append($('<li />').append($checkbox));
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
                ].join('')).on('click.toggle', this.toggleFieldset.bind(this)),
                $inner
              ])
          ).appendTo($ul);
        }
      }
    }

    if (render) {
      this.$.find('div.content-rules').append(
          $('<fieldset />').append([
            $('<legend />').text(title).on('click.toggle', this.toggleFieldset.bind(this)).attr({title: title}),
            $ul]));
    }
  }
};
