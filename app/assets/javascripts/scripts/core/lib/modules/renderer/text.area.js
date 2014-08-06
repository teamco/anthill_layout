/**
 * Created by i061485 on 7/10/14.
 */

define([], function defineTextAreaRenderer(){

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
         * @param {{text: string, name: string, [placeholder]: string, value, [disabled]: boolean}} opts
         * @returns {*[]}
         */
        renderTextArea: function renderTextArea(opts) {

            /**
             * Create UUID
             * @type {String}
             */
            var uuid = this.base.lib.generator.UUID() + '-textarea',
                $input;

            if (this.base.defineBoolean(opts.disabled, false, true)) {

                /**
                 * Define $input
                 * @type {*|jQuery}
                 */
                $input = $('<p />').attr({
                    name: opts.name,
                    id: uuid,
                    title: opts.value
                }).addClass('textarea').text(opts.value);

            } else {

                /**
                 * Define $input
                 * @type {*|jQuery}
                 */
                $input = $('<textarea />').attr({
                    name: opts.name,
                    id: uuid,
                    placeholder: opts.placeholder,
                    title: opts.value
                }).val(opts.value);
            }

            if (!opts.visible) {
                $input.hide();
            }

            return [
                this.renderLabel(uuid, opts.text, 'textarea', opts.visible),
                $input
            ];
        }
    });
});