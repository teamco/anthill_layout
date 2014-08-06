/**
 * Created by i061485 on 7/10/14.
 */

define([], function defineComboBoxRenderer(){

    /**
     * Define ComboBoxRenderer
     * @class ComboBoxRenderer
     * @extends LabelRenderer
     * @constructor
     */
    var ComboBoxRenderer = function ComboBoxRenderer() {

    };

    return ComboBoxRenderer.extend('ComboBoxRenderer', {

        /**
         * Render combo box
         * @member ComboBoxRenderer
         * @param {Array} data
         * @param selected
         * @param {string} name
         * @param {string} index
         * @param {{type: string, callback: function}} [event]
         * @param {boolean} [visible]
         */
        renderCombobox: function renderCombobox(data, selected, name, index, event, visible) {

            /**
             * Define container
             * @type {*|jQuery}
             */
            var $div = $('<div style="display: none;" />').addClass('combo-box').attr({
                id: this.base.lib.generator.UUID() + '-combobox'
            }).append(
                $('<input class="hidden" />').attr({
                    name: index,
                    disabled: true,
                    type: 'text',
                    value: selected
                })
            );

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

                $('input[name="' + index + '"]', $div).val(value);
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

                        $div.hasClass('open') ?
                            _hide() : _open();

                        /**
                         * Define selected $li
                         * @type {*|jQuery|HTMLElement}
                         */
                        var $selected = $(e.target);

                        if ($selected.hasClass('selected')) {
                            _store($selected, selected);
                            return false;
                        }

                        $('li', $selected.parent()).removeClass('selected');
                        $selected.addClass('selected');

                        _store($selected, selected);

                    }.bind(this)
                );

                // hide on mouse leave
                $ul.on('mouseleave.comboBoxInternal', _hide);

                if (this.base.isDefined(event)) {
                    if (this.base.isFunction(event.callback)) {
                        $li.on(event.type, function comboBoxEvent(e) {
                            event.callback($(e.target).attr('rel'));
                        });
                    }
                }

                $li.attr({rel: field.key || field.value}).appendTo($ul);
            }

            // fix to define modal dialog height
            setTimeout(function () {
                visible ? $div.show() : $div.hide();
            }, 500);

            return [
                this.renderLabel(undefined, name, undefined, visible),
                $div.append([
                    $ul,
                    $('<div />').addClass('combo-box-arrow')
                ])
            ];
        }
    });
});