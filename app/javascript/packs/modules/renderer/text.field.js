/**
 * Created by teamco on 7/10/14.
 */

import {LibGenerator} from 'js/modules/base/Generator';

/**
 * @class TextFieldRenderer
 * @type {TextFieldRenderer}
 */
export class TextFieldRenderer {

  /**
   * Render text field
   * @memberOf TextFieldRenderer
   * @param {{
    *  [text]: string,
    *  name: string,
    *  [placeholder]: string,
    *  [tooltip]: string,
    *  value,
    *  [type]: string,
    *  [style]: string,
    *  [disabled]: boolean,
    *  [monitor],
    *  [readonly],
    *  [visible],
    *  [validate]: {[mask]: RegExp, blank: boolean}
    * }} opts
   * @returns {jQuery}
   */
  renderTextField(opts) {

    /**
     * Create UUID
     * @type {string}
     */
    const uuid = LibGenerator.UUID() + '-input';

    /**
     * Define $input
     * @type {jQuery}
     */
    const $input = $('<input class="form-control" />').addClass(opts.type).attr({
      name: opts.name,
      type: 'text',
      placeholder: opts.placeholder || 'Enter ' + opts.text,
      title: opts.value,
      'aria-describedby': uuid,
      readonly: this.utils.setBoolean(opts.readonly, false),
      disabled: this.utils.setBoolean(opts.disabled, false)
    }).val(opts.value);

    const labelClass = [opts.style, opts.visible ? '' : 'd-none'].join(' '),
        $template = $('<div class="input-group mb-2" />').append(
            this.renderLabel(uuid, opts.text, labelClass, opts.visible));

    /**
     * Get tooltip
     * @type {string|*}
     */
    const tooltip = opts.tooltip;

    if (tooltip) {
      this.tooltip.render({
        title: opts.text.humanize(),
        description: opts.tooltip,
        selector: $input
      });
    }

    this.initMonitor($input, opts.monitor);
    this.checkVisibility($input, opts.visible);
    this.validateByMask($input, opts);

    $template.append($input);

    return $template;
  }
}
