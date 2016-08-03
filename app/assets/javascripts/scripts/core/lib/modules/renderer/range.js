/**
 * Created by teamco on 7/10/14.
 */

define(function defineRangeRenderer() {

    /**
     * Define RangeRenderer
     * @class RangeRenderer
     * @extends LabelRenderer
     * @extends NumberFieldRenderer
     * @constructor
     */
    var RangeRenderer = function RangeRenderer() {
    };

    return RangeRenderer.extend('RangeRenderer', {

        /**
         * Render text field
         * @memberOf RangeRenderer
         * @param {{
         *      [text]: string,
         *      name: string,
         *      [placeholder]: string,
         *      value, min, max, step,
         *      [disabled]: boolean,
         *      [monitor],
         *      [visible],
         *      [unit],
         *      [validate]: {mask: RegExp, blank: boolean}
         * }} opts
         * @returns {*[]}
         */
        renderRange: function renderRange(opts) {

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
                var $number = numberField[1];

                $input.val(
                    _validateValue($number, $number.val())
                );

                _triggerCallback();
            }

            var uuid = this.base.lib.generator.UUID() + '-input',
                disabled = this.base.defineBoolean(opts.disabled, false, true),
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

            var $numberField = this.renderNumberField({
                    value: opts.value,
                    disabled: disabled,
                    visible: true,
                    monitor: {
                        events: ['keyup.range', 'blur.range'],
                        callback: _updateRangeField
                    }
                }),
                $numberInput = $numberField.find('input');

            // Update number field
            $input.on(
                'input.range change.range keyup.range blur.range',
                function _updateNumberField() {

                    $numberInput.val(
                        _validateValue($input, $input.val())
                    );

                    _triggerCallback();
                }
            );

            $input.val(opts.value);

            var $unit = $('<div />').append([
                $numberInput,
                opts.unit || ''
            ]);

            return [
                this.renderLabel(undefined, opts.text, 'text', opts.visible),
                $unit,
                $input
            ];
        }
    });
});