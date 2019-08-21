/**
 * Created by teamco on 7/10/14.
 */

import {LibGenerator} from 'js/modules/base/Generator';

/**
 * @class TextAreaRenderer
 * @type {TextAreaRenderer}
 */
export class TextAreaRenderer {

  /**
   * Render text area
   * @memberOf TextAreaRenderer
   * @param {{
   *  text: string,
   *  name: string,
   *  [placeholder]: string,
   *  [tooltip]: string,
   *  value,
   *  [style]: string,
   *  [monitor],
   *  [disabled]: boolean,
   *  [readonly]: boolean,
   *  [visible]: boolean,
   *  [validate]: {[mask]: RegExp, blank: boolean}
   * }} opts
   * @extends AntHill
   * @returns {*[]}
   */
  renderTextArea(opts) {

    /**
     * @constant utils
     * @type {string|*|module.Base|{setBoolean, waitFor, gen}}
     */
    const utils = this.view.utils;

    /**
     * Create UUID
     * @type {string}
     */
    const uuid = LibGenerator.UUID() + '-textarea';

    /**
     * Define $input
     * @type {*|jQuery}
     */
    const $input = $('<textarea class="form-control" />').attr({
      name: opts.name,
      id: uuid,
      placeholder: opts.placeholder || 'Enter ' + opts.text,
      disabled: utils.setBoolean(opts.disabled, false),
      readonly: utils.setBoolean(opts.readonly, false),
      title: opts.value
    }).val(opts.value).addClass(opts.style);

    const $template = $('<div class="input-group mb-2" />').append(
        this.renderLabel(uuid, opts.text, 'textarea', opts.visible));

    this.initMonitor($input, opts.monitor);
    this.checkVisibility($input, opts.visible);
    this.validateByMask($input, opts);

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

    $template.append($input);

    return $template;
  }
}