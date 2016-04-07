/**
 * Created by teamco on 7/10/14.
 */

define(function defineTextAreaRenderer() {

    /**
     * Define TextAreaRenderer
     * @class TextAreaRenderer
     * @extends LabelRenderer
     * @constructor
     */
    var TextAreaRenderer = function TextAreaRenderer() {
    };

    return TextAreaRenderer.extend('TextAreaRenderer', {

        /**
         * Render text area
         * @memberOf TextAreaRenderer
         * @param {{
         *      text: string,
         *      name: string,
         *      [placeholder]: string,
         *      value,
         *      [style]: string,
         *      [monitor],
         *      [disabled]: boolean,
         *      [readonly]: boolean,
         *      [visible]: boolean,
         *      [validate]: {mask: RegExp, blank: boolean}
         * }} opts
         * @extends AntHill
         * @returns {*[]}
         */
        renderTextArea: function renderTextArea(opts) {

            /**
             * Create UUID
             * @type {String}
             */
            var uuid = this.base.lib.generator.UUID() + '-textarea',
                $input;

            /**
             * Define $input
             * @type {*|jQuery}
             */
            $input = $('<textarea class="form-control" />').attr({
                name: opts.name,
                id: uuid,
                placeholder: opts.placeholder,
                disabled: this.base.defineBoolean(opts.disabled, false, true),
                readonly: this.base.defineBoolean(opts.readonly, false, true),
                title: opts.value
            }).val(opts.value).addClass(opts.style);

            this.initMonitor($input, opts.monitor);
            this.checkVisibility($input, opts.visible);
            this.validateByMask($input, opts);

            return [
                this.renderLabel(uuid, opts.text, 'textarea', opts.visible),
                $input
            ];
        }
    });
});