/**
 * Created with RubyMine.
 * User: teamco
 * Date: 3/3/14
 * Time: 12:14 AM
 */

define([
    'config/anthill'
], function defineRenderer(AntHill) {

    /**
     * Define renderer
     * @class Renderer
     * @extends AntHill
     * @constructor
     */
    var Renderer = function Renderer() {

    };

    return Renderer.extend('Renderer', {

        /**
         * Render label
         * @member Renderer
         * @param {string} uuid
         * @param {string} text
         * @returns {*|jQuery}
         */
        renderLabel: function renderLabel(uuid, text) {
            return $('<label />').attr({
                'for': uuid,
                title: text.toUpperCase()
            }).text(text);
        },

        /**
         * Render text field
         * @member Renderer
         * @param {{text: string, name: string, placeholder: string, value}} opts
         * @returns {*[]}
         */
        renderTextField: function renderTextField(opts) {

            /**
             * Create UUID
             * @type {String}
             */
            var uuid = this.base.lib.generator.UUID();

            /**
             * Define $input
             * @type {*|jQuery}
             */
            var $input = $('<input />').attr({
                name: opts.name,
                type: 'text',
                id: uuid,
                placeholder: opts.placeholder,
                title: opts.value
            }).val(opts.value);

            return [
                this.renderLabel(uuid, opts.text),
                $input
            ];
        },

        /**
         * Render text area
         * @member Renderer
         */
        renderTextArea: function renderTextArea() {

        },

        /**
         * Render combo box
         * @member Renderer
         */
        renderCombobox: function renderCombobox() {

        }

    }, AntHill.prototype);
});