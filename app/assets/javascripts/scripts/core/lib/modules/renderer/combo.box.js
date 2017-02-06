/**
 * Created by teamco on 7/10/14.
 */

define([], function defineComboBoxRenderer() {

    /**
     * Define ComboBoxRenderer
     * @class ComboBoxRenderer
     * @extends AntHill
     * @extends LabelRenderer
     * @extends TextFieldRenderer
     * @extends ToolTipRenderer
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
         * @param {boolean} [disabled]
         * @param {string} [placeholder]
         * @param {boolean} [store]
         * @param {boolean} [label]
         */
        renderCombobox: function renderCombobox(data, selected, name, index, event, visible, disabled, placeholder, store, label) {

            /**
             * Define element
             * @type {ComboBoxRenderer}
             */
            var element = this;

            // Init placeholder
            placeholder = _.isUndefined(placeholder) ? false : placeholder;

            // Init disabled
            disabled = _.isUndefined(disabled) ? false : !!disabled;

            // Init store
            store = _.isUndefined(store) ? true : !!store;

            // Init label
            label = _.isUndefined(label) ? false : !!label;

            // Set default event
            event = event || {};

            /**
             * Define active content
             * @type {{name}|Page|WidgetContent}
             */
            var activeContent = element.view.scope.activeContent;

            var $input = $('<input class="hidden' + (store ? ' store' : '') + '" />').attr({
                name: index,
                disabled: true,
                type: 'text',
                value: selected
            });

            /**
             * Define container
             * @type {*|jQuery}
             */
            var style = (activeContent ? [index, activeContent.name].join('') : index).toDash(),
                id = element.base.lib.generator.UUID() + '-combobox',
                $combo = $([
                    '<ul class="nav"><li role="presentation" class="dropdown">',
                    '<a class="dropdown-toggle', disabled ? ' disabled' : '', '" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">',
                    '<span class="caret pull-right"></span></a>',
                    '<ul class="dropdown-menu"></ul>',
                    '</li></ul>'
                ].join('')).addClass(style).attr({id: id}).append($input);

            /**
             * Update placeholder
             * @param value
             * @private
             */
            function _updatePlaceholder(value) {
                $('.dropdown-toggle', $combo).html(value + '<span class="caret pull-right"></span>');
            }

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
                _updatePlaceholder(value);
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
                        element.renderTextField({
                            name: field.name,
                            text: field.text.trim(),
                            placeholder: field.placeholder,
                            value: field.value,
                            disabled: field.disabled,
                            visible: field.visible,
                            validate: field.validate,
                            monitor: field.monitor
                        })
                    );
                }

                if (selected === field.value) {
                    _store($li, true);
                }

                $li.on('click.comboBoxInternal', _store);

                if (_.isFunction(event.callback)) {

                    $li.on(
                        event.type,

                        /**
                         * Define event callback
                         * @param {Event} e
                         * @private
                         */
                        function _comboBoxEvent(e) {

                            // Execute callback with value as parameter
                            event.callback(
                                $(e.target).parent().attr('rel')
                            );
                        }
                    );
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
                    element.renderTooltip({
                        title: field.value,
                        description: tooltip,
                        selector: $li
                    });
                }
            }

            if (_.isUndefined(selected)) {

                _updatePlaceholder(
                    placeholder ?
                        element.i18n.t('combobox.placeholder', [name]) :
                        $('li:first', $ul).text()
                );
            }

            var labelPattern = new RegExp(element.view.scope.name.toLowerCase());

            // Define label
            var $label = $([
                '<div class="input-group">',
                '<span class="input-group-addon">', (index.replace(labelPattern, '').humanize()), '</span>',
                '</div>'
            ].join(''));

            if (disabled) {
                element.disableComboBox($combo);
            }

            return label ?
                $label.append($combo) : $combo;
        },

        /**
         * Check if combo box disabled
         * @memberOf ComboBoxRenderer
         * @param $combo
         * @returns {boolean}
         */
        isDisabledComboBox: function isDisabledComboBox($combo) {
            return $('li.dropdown', $combo).hasClass('disabled');
        },

        /**
         * Define enable combo box
         * @memberOf ComboBoxRenderer
         * @param $combo
         */
        enableComboBox: function enableComboBox($combo) {
            $('li.dropdown', $combo).removeClass('disabled');
            $('li.dropdown > a.dropdown-toggle', $combo).removeClass('disabled');
        },

        /**
         * Define disable combo box
         * @memberOf ComboBoxRenderer
         * @param $combo
         */
        disableComboBox: function disableComboBox($combo) {
            $('li.dropdown', $combo).addClass('disabled');
            $('li.dropdown > a.dropdown-toggle', $combo).addClass('disabled');
        }
    });
});