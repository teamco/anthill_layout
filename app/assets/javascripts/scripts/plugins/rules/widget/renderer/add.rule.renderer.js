defineP(function defineAddRuleRenderer() {

  return {

    /**
     * Add new rule
     * @memberOf BaseWidgetRules
     * @param {string} rule
     * @param {string} type
     * @param $container
     * @returns {boolean}
     */
    addRule: function addRule(rule, type, $container) {

      /**
       * Get $ul
       * @type {*|jQuery|HTMLElement}
       */
      var $ul = $('ul.publish-rules', $container);

      if (!$ul.length) {

        /**
         * Set $ul
         * @type {*|jQuery}
         */
        $ul = $('<ul />').addClass('publish-rules');

        /**
         * Define title
         * @type {string}
         */
        var title = 'Published events';

        $container.find('div.content-rules').append(
            $('<fieldset />').append([
              $('<legend />').text(title).on(
                  'click.toggle',
                  this.toggleFieldset.bind(this)).attr({
                title: title
              }),
              $ul
            ])
        );
      }

      if (!this.base.isDefined(rule)) {
        this.view.scope.logger.warn('Select rule');
        return false;
      }

      /**
       * Set value
       * @type {string}
       */
      var value = [type.toLowerCase(), rule].join(':');

      if ($('li[value="' + value + '"]', $ul).length > 0) {
        this.view.scope.logger.warn('Duplicate rule', value);
        return false;
      }

      var $input = [
        '<input value="', rule, '" disabled="disabled"',
        ' type="text" class="form-control" placeholder="Rule">'
      ].join('');

      $ul.append(
          $('<li />').attr({value: value}).
              append(this.getTemplate(type).append($input))
      );
    }
  };
});
