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
            var uuid = this.base.lib.generator.UUID() + '-input',
                $span = $('<span class="validate" />').
                    text('The text you entered is not valid');

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

            if (typeof(opts.validate) === 'object') {

                $input.focusout(function focusOut() {

                    /**
                     * Get value
                     * @type {string}
                     */
                    var value = $input.val();

                    if (value.match(opts.validate.mask)) {

                        $input.removeClass('validate');
                        $span.remove();

                    } else {

                        if (opts.validate.blank && value.length === 0) {

                            $input.removeClass('validate');
                            $span.remove();
                            return false;
                        }

                        $input.addClass('validate');
                        $input.after($span);
                    }
                });
            }

            return [
                this.renderLabel(uuid, opts.text, 'text', opts.visible),
                $input
            ];
        }
    });
});