/**
 * Created by i061485 on 7/10/14.
 */

define([], function defineComboBoxRenderer() {

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
             * Get wrapper
             * @returns {BaseElement.$}
             * @private
             */
            function _getWrapper() {

                /**
                 * Get referrer
                 * @type {*}
                 */
                var referrer = this.view.scope.referrer,
                    $modal, $wrapper = this.$;

                if (referrer) {

                    /**
                     * Get $modal dialog
                     * @type {ModalElement}
                     */
                    $modal = referrer.view.elements.$modal;

                    if ($modal) {
                        $wrapper = $modal.$;
                    }
                }

                return $wrapper;
            }

            /**
             * Define active content
             * @type {*|Page|WidgetContent}
             */
            var activeContent = this.view.scope.activeContent;

            /**
             * Define container
             * @type {*|jQuery}
             */
            var $div = $('<div class="combo-box" />').
                addClass((activeContent ? [index, activeContent.constructor.name].join('') : index).toDash()).
                attr({
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

                // Get wrapper
                var $wrapper = _getWrapper.bind(this)();

                // close all como-boxes
                $('.combo-box', $wrapper).removeClass('open');
                $div.addClass('open');
                $('div.html', $wrapper).addClass('visible');
            }

            /**
             * Hide combo box
             * @private
             */
            function _hide() {

                // Get wrapper
                var $wrapper = _getWrapper.bind(this)();

                $div.removeClass('open');
                $('div.html', $wrapper).removeClass('visible');
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
            var $ul = $('<ul />'),
                i = 0, l = data.length;

            for (; i < l; i++) {

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

                        ($div.hasClass('open') ?
                            _hide : _open).bind(this)();

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
                $ul.on('mouseleave.comboBoxInternal', _hide.bind(this));

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