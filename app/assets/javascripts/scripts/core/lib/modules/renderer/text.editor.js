/**
 * Created by i061485 on 7/10/14.
 */
define(['tinyMCE'], function defineTextEditorRenderer(tinyMCE) {

    /**
     * Define TextEditorRenderer
     * @class TextEditorRenderer
     * @extends LabelRenderer
     * @constructor
     */
    var TextEditorRenderer = function TextEditorRenderer() {

    };

    return TextEditorRenderer.extend('TextEditorRenderer', {

        /**
         * Render text area
         * @member TextEditorRenderer
         * @param {{
         *      text: string,
         *      name: string,
         *      [placeholder]: string,
         *      value,
         *      [monitor],
         *      [disabled]: boolean,
         *      [validate]: {mask: RegExp, blank: boolean}
         * }} opts
         * @returns {*[]}
         */
        renderTextEditor: function renderTextEditor(opts) {

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
                }).addClass('editor').val(opts.value);
            }

            if (opts.monitor) {

                $input.on(
                    opts.monitor.events.join(','),
                    opts.monitor.callback
                );
            }

            $input.on('focus.tinymce', function init() {
                tinyMCE.init({
                    selector: 'textarea#' + uuid
                });
            });

            if (!opts.visible) {
                $input.hide();
            }

            this.validateByMask($input, opts);

            return [
                this.renderLabel(uuid, opts.text, 'textarea', opts.visible),
                $input
            ];
        }
    });
});