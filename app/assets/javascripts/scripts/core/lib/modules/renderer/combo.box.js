/**
 * Created by teamco on 7/10/14.
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
         * @memberOf ComboBoxRenderer
         * @param {Array} data
         * @param selected
         * @param {string} name
         * @param {string} index
         * @param {{type: string, callback: function}} [event]
         * @param {boolean} [visible]
         * @param {boolean} [placeholder]
         */
        renderCombobox: function renderCombobox(data, selected, name, index, event, visible, placeholder) {

            // Init placeholder
            placeholder = _.isUndefined(placeholder) ? false : !!placeholder;

            /**
             * Get wrapper
             * @param {BaseElement} $element
             * @returns {BaseElement.$}
             * @private
             */
            function _getWrapper($element) {

                /**
                 * Get referrer
                 * @type {*}
                 */
                var referrer = $element.view.scope.referrer,
                    $modal, $wrapper = $element.$;

                referrer = referrer ? referrer : $element;

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
            var $combo = $([
                '<ul class="nav"><li role="presentation" class="dropdown">',
                '<a class="dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">',
                '<span class="caret pull-right"></span></a>',
                '<ul class="dropdown-menu"></ul>',
                '</li></ul>'
            ].join('')).
                addClass((activeContent ? [index, activeContent.name].join('') : index).toDash()).
                attr({id: this.base.lib.generator.UUID() + '-combobox'}).
                append($('<input class="hidden" />').attr({
                    name: index,
                    disabled: true,
                    type: 'text',
                    value: selected
                })
            );

            /**
             * Store prefs
             * @param $selected
             * @param [force] {boolean}
             * @returns {boolean}
             * @private
             */
            function _store($selected, force) {

                if ($selected instanceof $.Event) {
                    $selected = $($selected.target).parent();
                }

                /**
                 * Define value
                 * @type {String}
                 */
                var value = $selected.text();

                if (!force && value === selected) {
                    return false;
                }

                selected = value;

                $('li', $selected.parent()).removeClass('selected');
                $selected.addClass('selected');
                $('input[name="' + index + '"]', $combo).val(value);
                $('.dropdown-toggle', $combo).html(value + '<span class="caret pull-right"></span>');
            }

            /**
             * Define $ul
             * @type {*|jQuery}
             */
            var $ul = $('ul.dropdown-menu', $combo),
                i = 0, l = data.length;

            for (; i < l; i++) {

                var field = data[i],
                    $li = $('<li />');

                if (field.type === 'text') {
                    $li.html(
                        $('<a href="#" />').text(field.value)
                    );
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
                    _store($li, true);
                }

                $li.on('click.comboBoxInternal', _store);

                if (!_.isUndefined(event)) {
                    if (_.isFunction(event.callback)) {
                        $li.on(event.type, function comboBoxEvent(e) {
                            event.callback(
                                $(e.target).parent().attr('rel')
                            );
                        });
                    }
                }

                $li.attr({
                    rel: field.key || field.value,
                    title: data[i].title || field.value
                }).appendTo($ul);

                /**
                 * Get tooltip
                 * @type {string|*}
                 */
                var tooltip = data[i].tooltip;

                if (tooltip) {

                    // Set reference
                    $li.$ = $li;

                    this.renderTooltip({
                        title: field.value,
                        description: tooltip,
                        $container: $li
                    });
                }
            }

            if (_.isUndefined(selected)) {

                if (placeholder) {

                    $ul.prepend(
                        $('<li class="placeholder" />').text(
                            'Select ' + name
                        ).on(
                            'click.placeholder',
                            function _clickOn(e) {

                                if (this.isDisabledComboBox($combo.parent())) {
                                    return false;
                                }

                                $(e.target).remove();
                                $('li:first', $ul).trigger('click.comboBoxInternal');

                            }.bind(this)
                        )
                    );
                }

                $('li:first', $ul).show();
            }

            return $combo;
        },

        /**
         * Check if combo box disabled
         * @memberOf ComboBoxRenderer
         * @param $combo
         * @returns {boolean}
         */
        isDisabledComboBox: function isDisabledComboBox($combo) {
            return $combo.find('div.combo-box.disabled').length === 1;
        },

        /**
         * Define enable combo box
         * @memberOf ComboBoxRenderer
         * @param $combo
         */
        enableComboBox: function enableComboBox($combo) {
            $combo.find('div.combo-box').removeClass('disabled');
        },

        /**
         * Define disable combo box
         * @memberOf ComboBoxRenderer
         * @param $combo
         */
        disableComboBox: function disableComboBox($combo) {
            $combo.find('div.combo-box').addClass('disabled');
        },

        /**
         * Clear placeholder
         * @memberOf ComboBoxRenderer
         * @param $combo
         */
        clearPlaceholder: function clearPlaceholder($combo) {
            $combo.find('div.combo-box > ul li.placeholder').
                trigger('click.placeholder').
                remove();
        }
    });
});