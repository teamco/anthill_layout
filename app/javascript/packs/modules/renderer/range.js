/**
 * Created by teamco on 7/10/14.
 */

import {LibGenerator} from 'js/modules/base/Generator';

/**
 * @class RangeRenderer
 * @type {RangeRenderer}
 */
export class RangeRenderer {

  /**
   * Render text field
   * @memberOf RangeRenderer
   * @param {{
   *  [text]: string,
   *  name: string,
   *  [placeholder]: string,
   *  value, min, max, step,
   *  [disabled]: boolean,
   *  [style],
   *  [monitor],
   *  [visible],
   *  [unit],
   *  [validate]: {mask: RegExp, blank: boolean}
   * }} opts
   * @returns {*[]}
   */
  renderRange(opts) {

    /**
     * Validate value
     * @param $field
     * @param value
     * @returns {*}
     * @private
     */
    function _validateValue($field, value) {

      if (value > opts.max) {
        $field.val(opts.max);
        value = opts.max;
      }

      if (value < opts.min) {
        $field.val(opts.min);
        value = opts.min;
      }

      return value;
    }

    /**
     * Define trigger callback
     * @private
     */
    function _triggerCallback() {
      if (opts.monitor && opts.monitor.events) {
        $input.trigger(opts.monitor.events.join(' '));
      }
    }

    /**
     * Update range field
     * @private
     */
    function _updateRangeField() {

      // Get number field
      const $number = $numberField[1];
      $input.val(_validateValue($number, $number.val()));
      _triggerCallback();
    }

    const uuid = LibGenerator.UUID() + '-range',
        disabled = this.view.utils.setBoolean(opts.disabled, false),
        $input = $('<input />').attr({
          name: opts.name,
          type: 'range',
          id: uuid,
          min: opts.min,
          max: opts.max,
          step: opts.step || 1,
          title: opts.value || opts.min,
          disabled: disabled
        }).val(opts.value);

    this.initMonitor($input, opts.monitor);
    this.checkVisibility($input, opts.visible);
    this.validateByMask($input, opts);

    const $numberField = this.renderNumberField({
          value: opts.value,
          disabled: disabled,
          text: opts.text,
          style: opts.style,
          visible: true,
          monitor: {
            events: ['keyup.range', 'blur.range'],
            callback: _updateRangeField
          }
        }),
        $numberInput = $numberField.find('input');

    // Update number field
    $input.on('input.range change.range keyup.range blur.range', () => {
      $numberInput.val(_validateValue($input, $input.val()));
      _triggerCallback();
    });

    $numberField.find('.input-group-text').addClass('lg-input');
    $input.val(opts.value);

    if (opts.unit) {
      $numberField.append(`
        <div class="input-group-append">
          <span class="input-group-text sm-input">${opts.unit}</span>
        </div>
      `);
    }
    return [$numberField, $input];
  }
}