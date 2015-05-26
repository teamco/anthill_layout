/**
 * Created by i061485 on 7/10/14.
 */

define([
    'jquery'
], function defineRangeRenderer($) {

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
             * Update range field
             * @private
             */
            function _updateRangeField() {

                // Get number field
                var $number = numberField[1];

                $input.val(
                    _validateValue($number, $number.val())
                );
            }

            /**
             * Create UUID
             * @type {String}
             */
            var uuid = this.base.lib.generator.UUID() + '-input',
                $input = $('<input />').attr({
                    name: opts.name,
                    type: 'range',
                    id: uuid,
                    min: opts.min,
                    max: opts.max,
                    step: opts.step || 1,
                    title: opts.value || opts.min,
                    disabled: this.base.defineBoolean(opts.disabled, false, true)
                }).val(opts.value);

            this.initMonitor($input, opts.monitor);
            this.checkVisibility($input, opts.visible);
            this.validateByMask($input, opts);

            /**
             * Render number field
             * @type {NumberFieldRenderer}
             */
            var numberField = this.renderNumberField({
                value: opts.value,
                disabled: false,
                visible: true,
                monitor: {
                    events: ['keyup.range', 'blur.range'],
                    callback: _updateRangeField
                }
            });

            // Update number field
            $input.on(
                'input.range change.range keyup.range blur.range',
                function _updateNumberField() {
                    numberField[1].val(
                        _validateValue($input, $input.val())
                    );
                }
            );

            $input.val(opts.value);

            return [
                this.renderLabel(uuid, opts.text, 'text', opts.visible),
                $input,
                numberField[1],
                opts.unit || ''
            ];
        }
    });
});