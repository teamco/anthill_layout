/**
 * Created with RubyMine.
 * User: teamco
 * Date: 3/3/14
 * Time: 12:14 AM
 */

define([], function defineRenderer() {

    var Renderer = function Renderer() {

    };

    return Renderer.extend({

        /**
         * Render label
         * @param {string} uuid
         * @param {string} text
         * @returns {*|jQuery}
         */
        renderLabel: function renderLabel(uuid, text) {
            return $('<label />').attr({
                'for': uuid,
                title: text
            }).text(text);
        },

        /**
         * Render text field
         * @param {{text: string, name: string, placeholder: string, value}} opts
         * @returns {*[]}
         */
        renderTextField: function renderTextField(opts) {

            /**
             * Create UUID
             * @type {String}
             */
            var uuid = anthill.base.lib.generator.UUID();

            /**
             * Define $input
             * @type {*|jQuery}
             */
            var $input = $('<input />').attr({
                name: opts.name,
                type: 'text',
                id: uuid,
                placeholder: opts.placeholder
            }).val(opts.value);

            return [
                this.renderLabel(uuid, opts.text),
                $input
            ];
        },

        renderTextArea: function renderTextArea() {

        },

        renderCombobox: function renderCombobox() {

        }
    });
});