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
     * @extends BaseElement
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
         * @param {string} [type]
         * @returns {*|jQuery}
         */
        renderLabel: function renderLabel(uuid, text, type) {
            return $('<label />').attr({
                'for': uuid,
                title: text.toUpperCase()
            }).addClass(type).text(text);
        },

        /**
         * Render text field
         * @member Renderer
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

            return [
                this.renderLabel(uuid, opts.text, 'text'),
                $input
            ];
        },

        /**
         * Render checkbox
         * @member Renderer
         * @param {{text: string, name: string, value, [disabled]: boolean, [monitor]}} opts
         * @returns {*[]}
         */
        renderCheckbox: function renderCheckbox(opts) {

            /**
             * Create UUID
             * @type {String}
             */
            var uuid = this.base.lib.generator.UUID() + '-checkbox';

            /**
             * Define $input
             * @type {*|jQuery}
             */
            var $input = $('<input />').attr({
                name: opts.name,
                type: 'checkbox',
                id: uuid,
                title: opts.value,
                disabled: this.base.defineBoolean(opts.disabled, false, true)
            }).val(opts.value);

            if (opts.monitor) {

                $input.on(
                    opts.monitor.events.join(','),
                    opts.monitor.callback
                );
            }

            return [
                $input,
                this.renderLabel(uuid, opts.text, 'text')
            ];
        },

        /**
         * Render text area
         * @member Renderer
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
            return [
                this.renderLabel(uuid, opts.text, 'textarea'),
                $input
            ];
        },

        /**
         * Render combo box
         * @member Renderer
         * @param {Array} data
         * @param selected
         * @param {{type: string, callback: function}} [event]
         */
        renderCombobox: function renderCombobox(data, selected, name, event) {

            /**
             * Define container
             * @type {*|jQuery}
             */
            var $div = $('<div />').addClass('combo-box').attr({
                id: this.base.lib.generator.UUID() + '-combobox'
            });

            /**
             * Open combo box
             * @private
             */
            function _open() {
                // close all como-boxes
                $('.combo-box').removeClass('open');
                $div.addClass('open');
            }

            /**
             * Hide combo box
             * @private
             */
            function _hide() {
                $div.removeClass('open');
            }

            /**
             * Store prefs
             * @param $selected
             * @param selected
             * @returns {boolean}
             * @private
             */
            function _store($selected, selected) {

                /**
                 * Define value
                 * @type {String}
                 */
                var value = $selected.text();

                if (value === selected) {
                    return false;
                }
            }

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

                $li.on(
                    'click.comboBoxInternal',

                    /**
                     * Select combo box item
                     * @param e
                     * @returns {boolean}
                     */
                    function comboBoxInternalEvent(e) {

                        /**
                         * Define selected $li
                         * @type {*|jQuery|HTMLElement}
                         */
                        var $selected = $(e.target);

                        if ($selected.hasClass('selected')) {
                            _hide();
                            _store($selected, selected);
                            return false;
                        }

                        $('li', $selected.parent()).removeClass('selected');
                        $selected.addClass('selected');

                        _hide();
                        _store($selected, selected);

                    }.bind(this)
                );

                if (this.base.isDefined(event)) {
                    if (this.base.isFunction(event.callback)) {
                        $li.on(event.type, function comboBoxEvent(e) {
                            event.callback($(e.target).attr('rel'));
                        });
                    }
                }

                $li.attr({rel: field.value}).appendTo($ul);
            }

            return [
                this.renderLabel(undefined, name),
                $div.append([
                    $ul,
                    $('<div />').addClass('combo-box-arrow').on(
                        'click.combo',
                        function clickCombo() {
                            $div.hasClass('open') ?
                                _hide() : _open();
                        }
                    )
                ])
            ];
        }

    }, AntHill.prototype);
});