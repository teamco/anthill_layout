/**
 * Created by teamco on 7/10/14.
 */

define(function defineTextFieldRenderer() {

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
         *      [style]: string,
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
            var $input = $('<input class="form-control" />').attr({
                name: opts.name,
                type: 'text',
                placeholder: opts.placeholder,
                title: opts.value,
                'aria-describedby': uuid,
                readonly: this.base.defineBoolean(opts.readonly, false, true),
                disabled: this.base.defineBoolean(opts.disabled, false, true)
            }).val(opts.value);

            var labelClass = [opts.style, opts.visible ? '' : 'hide'].join(' '),
                $template = $([
                    '<div class="input-group input-group-sm">',
                    '<span id="', uuid, '" class="input-group-addon ', labelClass, '">', opts.text, '</span>',
                    '</div>'
                ].join(''));

            this.initMonitor($input, opts.monitor);
            this.checkVisibility($input, opts.visible);
            this.validateByMask($input, opts);

            $template.append($input);

            return $template;
        }
    });
});