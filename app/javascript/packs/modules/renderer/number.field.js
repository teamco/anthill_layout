/**
 * Created by teamco on 7/10/14.
 */

/**
 * @class NumberFieldRenderer
 * @type {NumberFieldRenderer}
 */
export class NumberFieldRenderer {

  /**
   * Render text field
   * @memberOf NumberFieldRenderer
   * @param {{
   *  [text]: string,
   *  name: string,
   *  [placeholder]: string,
   *  [tooltip]: string,
   *  value,
   *  [disabled]: boolean,
   *  [monitor],
   *  [visible],
   *  [validate]: {mask: RegExp, blank: boolean}
   * }} opts
   * @returns {*[]}
   */
  renderNumberField(opts) {

    /**
     * @constant utils
     * @type {string|*|module.Base|{setBoolean, waitFor, gen}}
     */
    const utils = this.view.utils;

    /**
     * Create UUID
     * @type {string}
     */
    const uuid = utils.gen.UUID() + '-input';

    /**
     * Define $input
     * @type {jQuery}
     */
    const $input = $('<input class="form-control" />').attr({
      name: opts.name,
      type: 'number',
      id: uuid,
      placeholder: opts.placeholder,
      title: opts.value,
      disabled: utils.setBoolean(opts.disabled, false)
    }).val(opts.value);

    const labelClass = [opts.style, opts.visible ? '' : 'hide'].join(' '),
        $template = $('<div class="input-group" />').append(
            this.renderLabel(uuid, opts.text, labelClass, opts.visible)
        );

    this.initMonitor($input, opts.monitor);
    this.checkVisibility($input, opts.visible);
    this.validateByMask($input, opts);

    $template.append($input);

    /**
     * Get tooltip
     * @type {string|*}
     */
    const tooltip = opts.tooltip;

    if (tooltip) {
      this.renderTooltip({
        title: opts.text.humanize(),
        description: opts.tooltip,
        selector: $input
      });
    }

    return $template;
  }
}