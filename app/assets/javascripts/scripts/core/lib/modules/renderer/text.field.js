/**
 * Created by i061485 on 7/10/14.
 */

define([
    'jquery'
], function defineTextFieldRenderer($) {

    /**
     * Define TextFieldRenderer
     * @class TextFieldRenderer
     * @extends LabelRenderer
     * @extends AntHill
     * @constructor
     */
    var TextFieldRenderer = function TextFieldRenderer() {
    };

    return TextFieldRenderer.extend('TextFieldRenderer', {

        /**
         * Render text field
         * @memberOf TextFieldRenderer
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
        renderTextField: function renderTextField(opts) {

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
                type: 'text',
                id: uuid,
                placeholder: opts.placeholder,
                title: opts.value,
                readonly: this.base.defineBoolean(opts.readonly, false, true),
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