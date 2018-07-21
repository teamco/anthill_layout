/**
 * @class AddRuleRenderer
 * @type {module.AddRuleRenderer}
 */
module.exports = class AddRuleRenderer {

  /**
   * Add new rule
   * @memberOf AddRuleRenderer
   * @param {string} rule
   * @param {string} type
   * @param $container
   * @returns {boolean}
   */
  addRule(rule, type, $container) {

    /**
     * Get $ul
     * @type {*|jQuery|HTMLElement|{length, append}}
     */
    let $ul = $('ul.publish-rules', $container);

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
      const title = 'Published events';

      $container.find('div.content-rules').append(
          $('<fieldset />').append([
            $('<legend />').text(title).on('click.toggle',
                this.element.toggleFieldset.bind(this)).attr({title: title}), $ul]));
    }

    if (!rule) {
      this.view.scope.logger.warn('Select rule');
      return false;
    }

    /**
     * Set value
     * @type {string}
     */
    let value = [type.toLowerCase(), rule].join(':');

    if ($('li[value="' + value + '"]', $ul).length) {
      this.view.scope.logger.warn('Duplicate rule', value);
      return false;
    }

    const $input = [
      '<input value="', rule, '" disabled="disabled"',
      ' type="text" class="form-control" placeholder="Rule">'].join('');

    $ul.append($('<li />').attr({value: value}).append(this.getTemplate(type).append($input)));
  }
};
