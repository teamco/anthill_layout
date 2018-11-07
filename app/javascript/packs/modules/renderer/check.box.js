/**
 * Created by teamco on 7/10/14.
 */

/**
 * Define CheckBoxRenderer
 * @class CheckBoxRenderer
 * @type {CheckBoxRenderer}
 */
export class CheckBoxRenderer  {

  /**
   * Render checkbox
   * @property CheckBoxRenderer
   * @param {{
   *  text: string,
   *  name: string,
   *  value,
   *  [checked]: boolean,
   *  [disabled]: boolean,
   *  [monitor],
   *  [tooltip],
   *  [visible]
   * }} opts
   * @returns {*}
   */
  renderCheckbox(opts) {

    /**
     * Create UUID
     * @type {string}
     */
    const uuid = this.utils.gen.UUID() + '-checkbox';
        const checked = this.utils.setBoolean(opts.checked, false);

    /**
     * Define $input
     * @type {Object}
     */
    const $input = $('<input />').attr({
      name: opts.name,
      type: 'checkbox',
      id: uuid,
      title: opts.value,
      checked: checked,
      disabled: this.utils.setBoolean(opts.disabled, false)
    }).val(opts.value);

    $input.prop('checked', checked);

    this.initMonitor($input, opts.monitor);
    this.checkVisibility($input, opts.visible);

    const $template = $([
      '<div class="input-group">',
      '<span class="input-group-addon"></span>',
      '<input type="text" class="form-control" disabled="disabled" value="', opts.text, '">',
      '</div>'
    ].join(''));

    $template.find('.input-group-addon').append($input);

    /**
     * Get tooltip
     * @type {string|*}
     */
    const tooltip = opts.tooltip;

    if (tooltip) {
      this.tooltip.render({
        title: opts.text.humanize(),
        description: opts.tooltip,
        selector: $template
      });
    }

    return $template;
  }
}