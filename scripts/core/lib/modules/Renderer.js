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
         * @param {*|string} uuid
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
         * @param {{text: string, name: string, [placeholder]: string, value, [disabled]: boolean}} opts
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
         * @param {Array} data
         * @param selected
         */
        renderCombobox: function renderCombobox(data, selected, name) {

            /**
             * Define container
             * @type {*|jQuery}
             */
            var $div = $('<div />').addClass('combo-box').attr({
                id: this.base.lib.generator.UUID() + '-combo-box'
            });

            /**
             * Define $ul
             * @type {*|jQuery}
             */
            var $ul = $('<ul />');

            for (var i = 0, l = data.length; i < l; i++) {

                var field = data[i],
                    $li = $('<li />');

                if (field.type === 'text') {
                    $li.text(field.value);
                }

                if (field.type === 'html') {
                    $li.html(field.value);
                }

                if (field.type === 'field') {
                    $li.append(
                        this.renderTextField({
                            name: field.name,
                            placeholder: field.placeholder,
                            value: field.value,
                            disabled: field.disabled
                        })
                    );
                }

                if (selected === field.value) {
                    $li.addClass('selected');
                }

                $li.appendTo($ul);
            }

            return [
                this.renderLabel(undefined, name),
                $div.append([
                    $ul,
                    $('<div />').addClass('combo-box-arrow').on(
                        'click.combo',
                        function clickCombo() {
                            $div.hasClass('open') ?
                                $div.removeClass('open') :
                                $div.addClass('open');
                        }
                    )
                ])
            ];
        }

    }, AntHill.prototype);
});