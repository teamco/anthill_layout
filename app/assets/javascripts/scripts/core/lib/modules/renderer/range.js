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
         *      value,
         *      [disabled]: boolean,
         *      [monitor],
         *      [validate]: {mask: RegExp, blank: boolean}
         * }} opts
         * @returns {*[]}
         */
        renderRange: function renderRange(opts) {

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
                    title: opts.value,
                    disabled: this.base.defineBoolean(opts.disabled, false, true)
                }).val(opts.value);

            this.initMonitor($input, opts.monitor);
            this.checkVisibility($input, opts.visible);
            this.validateByMask($input, opts);

            var numberField = this.renderNumberField({
                value: opts.value,
                disabled: false,
                visible: true
            });

            return [
                this.renderLabel(uuid, opts.text, 'text', opts.visible),
                $input,
                numberField[1],
                opts.unit || ''
            ];
        }
    });
});