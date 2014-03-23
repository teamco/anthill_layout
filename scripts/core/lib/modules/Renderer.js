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
         * @param {{type: string, callback: function}} [event]
         */
        renderCombobox: function renderCombobox(data, selected, name, event) {

            /**
             * Define container
             * @type {*|jQuery}
             */
            var $div = $('<div />').addClass('combo-box').attr({
                id: this.base.lib.generator.UUID() + '-combo-box'
            });

            /**
             * Open combo box
             * @private
             */
            function _open() {
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
             * @param {Renderer} scope
             * @param $selected
             * @param selected
             * @returns {boolean}
             * @private
             */
            function _store(scope, $selected, selected) {

                /**
                 * Define value
                 * @type {String}
                 */
                var value = $selected.text();

                if (value === selected) {
                    return false;
                }

                scope.view.controller.updatePrefs();
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
                            _store(this, $selected, selected);
                            return false;
                        }

                        $('li', $selected.parent()).removeClass('selected');
                        $selected.addClass('selected');

                        _hide();
                        _store(this, $selected, selected);

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