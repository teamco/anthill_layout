/**
 * Created by i061485 on 7/10/14.
 */

define([
    'jquery'
], function defineNumberFieldRenderer($) {

    /**
     * Define NumberFieldRenderer
     * @class NumberFieldRenderer
     * @extends LabelRenderer
     * @constructor
     */
    var NumberFieldRenderer = function NumberFieldRenderer() {
    };

    return NumberFieldRenderer.extend('NumberFieldRenderer', {

        /**
         * Render text field
         * @memberOf NumberFieldRenderer
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
        renderNumberField: function renderNumberField(opts) {

            /**
             * Create UUID
             * @type {String}
             */
            var uuid = this.base.lib.generator.UUID() + '-input';

            /**
             * Define $input
             * @type {jQuery}
             */
            var $input = $('<input />').attr({
                name: opts.name,
                type: 'number',
                id: uuid,
                placeholder: opts.placeholder,
                title: opts.value,
                disabled: this.base.defineBoolean(opts.disabled, false, true)
            }).val(opts.value);

            this.initMonitor($input, opts.monitor);
            this.checkVisibility($input, opts.visible);
            this.validateByMask($input, opts);

            return [
                this.renderLabel(uuid, opts.text, 'text', opts.visible),
                $input
            ];
        }
    });
});