/**
 * Created by teamco on 7/10/14.
 */

/**
 * @constant AntHill
 * @type {AntHill}
 */
const AntHill = require('../../../config/anthill.js');

/**
 * Define CheckBoxRenderer
 * @class CheckBoxRenderer
 */
module.exports = class CheckBoxRenderer extends AntHill {

  /**
   * @constructor
   * @param {string} name
   */
  constructor(name) {
    super(name || 'CheckBoxRenderer', null, false);
  }

  /**
   * Render checkbox
   * @property CheckBoxRenderer
   * @param {{
   *      text: string,
   *      name: string,
   *      value,
   *      [checked]: boolean,
   *      [disabled]: boolean,
   *      [monitor],
   *      [tooltip],
   *      [visible]
   * }} opts
   * @returns {*}
   */
  renderCheckbox(opts) {

    /**
     * Create UUID
     * @type {string}
     */
    const uuid = this.utils.gen.generator.UUID() + '-checkbox',
        checked = this.utils.setBoolean(opts.checked, false, true);

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
      disabled: this.base.defineBoolean(opts.disabled, false, true)
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
      this.renderTooltip({
        title: opts.text.humanize(),
        description: opts.tooltip,
        selector: $template
      });
    }

    return $template;
  }
};