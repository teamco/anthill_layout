/**
 * Created by teamco on 7/10/14.
 */

define(function defineNumberFieldRenderer() {

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
         *      [visible],
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
            var $input = $('<input class="form-control" />').attr({
                name: opts.name,
                type: 'number',
                id: uuid,
                placeholder: opts.placeholder,
                title: opts.value,
                disabled: this.base.defineBoolean(opts.disabled, false, true)
            }).val(opts.value);

            var labelClass = [opts.style, opts.visible ? '' : 'hide'].join(' '),
                $template = $('<div class="input-group" />').append(
                    this.renderLabel(uuid, opts.text, labelClass, opts.visible)
                );

            this.initMonitor($input, opts.monitor);
            this.checkVisibility($input, opts.visible);
            this.validateByMask($input, opts);

            $template.append($input);

            return $template;
        }
    });
});