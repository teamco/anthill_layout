/**
 * Created by i061485 on 7/10/14.
 */

define([], function defineTextFieldRenderer() {

    /**
     * Define TextFieldRenderer
     * @class TextFieldRenderer
     * @extends LabelRenderer
     * @constructor
     */
    var TextFieldRenderer = function TextFieldRenderer() {

    };

    return TextFieldRenderer.extend('TextFieldRenderer', {

        /**
         * Render text field
         * @member TextFieldRenderer
         * @param {{text: string, name: string, [placeholder]: string, value, [disabled]: boolean, [monitor]}} opts
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
             * @type {*|jQuery}
             */
            var $input = $('<input />').attr({
                name: opts.name,
                type: 'text',
                id: uuid,
                placeholder: opts.placeholder,
                title: opts.value,
                disabled: this.base.defineBoolean(opts.disabled, false, true)
            }).val(opts.value);

            if (opts.monitor) {

                $input.on(
                    opts.monitor.events.join(','),
                    opts.monitor.callback
                );
            }

            if (!opts.visible) {
                $input.hide();
            }

            return [
                this.renderLabel(uuid, opts.text, 'text', opts.visible),
                $input
            ];
        }
    });
});