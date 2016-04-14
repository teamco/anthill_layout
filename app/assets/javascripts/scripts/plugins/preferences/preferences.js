/**
 * Created by teamco on 3/19/14.
 */

define(['jquery'], function defineBasePreferencesElement($) {

    /**
     * Define BasePreferencesElement
     * @class BasePreferencesElement
     * @extends BaseView
     * @extends TextAreaRenderer
     * @extends TextFieldRenderer
     * @extends TextEditorRenderer
     * @extends CheckBoxRenderer
     * @extends ComboBoxRenderer
     * @extends NumberFieldRenderer
     * @extends RangeRenderer
     * @extends ModalElement
     * @extends EventLinkRenderer
     * @constructor
     */
    var BasePreferencesElement = function BasePreferencesElement() {
    };

    return BasePreferencesElement.extend('BasePreferencesElement', {
        
        /**
         * Open preferences
         * @memberOf BasePreferencesElement
         * @param opts
         */
        openPreferences: function openPreferences(opts) {

            /**
             * Define buttons
             * @type {*}
             */
            var buttons = $.extend(true, {}, {
                locate: {
                    text: 'Locate',
                    type: 'default',
                    events: {
                        click: 'locateElementItem'
                    }
                },
                approve: {
                    text: 'OK',
                    type: 'success',
                    events: {
                        click: 'approveUpdatePreferences'
                    }
                },
                reject: {
                    text: 'Cancel',
                    type: 'default',
                    events: {
                        click: ['rejectModalEvent']
                    }
                }
            }, opts.buttons || {});

            this.modalDialog({
                style: opts.style,
                type: opts.type || 'info',
                title: opts.title,
                text: opts.config.uuid,
                html: opts.$html,
                cover: true,
                buttons: buttons
            });
        },

        /**
         * Get node renderer
         * @memberOf BasePreferencesElement
         * @param node
         * @param {string} text
         * @param {string} index
         * @returns {*}
         */
        getNodeRenderer: function getNodeRenderer(node, text, index) {

            /**
             * Define placeholder text
             * @type {string}
             */
            var placeholder = node.placeholder || 'Enter ' + text,
                $element;

            if (node.type === 'event') {

                /**
                 * Get text field
                 * @type {*[]}
                 */
                $element = this.renderEventLink({
                    name: index,
                    title: text.trim(),
                    group: node.group || index,
                    disabled: node.disabled,
                    events: node.events,
                    visible: node.visible,
                    checked: node.checked,
                    monitor: node.monitor
                });
            }

            if (node.type === 'texteditor') {

                /**
                 * Get text field
                 * @type {*[]}
                 */
                $element = this.renderTextEditor({
                    name: index,
                    text: text.trim(),
                    placeholder: placeholder,
                    value: node.value,
                    disabled: node.disabled,
                    visible: node.visible,
                    validate: node.validate,
                    monitor: node.monitor
                });
            }

            if (node.type === 'text') {

                /**
                 * Get text field
                 * @type {*[]}
                 */
                $element = this.renderTextField({
                    name: index,
                    text: text.trim(),
                    placeholder: placeholder,
                    value: node.value,
                    disabled: node.disabled,
                    visible: node.visible,
                    validate: node.validate,
                    monitor: node.monitor
                });
            }

            if (node.type === 'number') {

                /**
                 * Get number field
                 * @type {*[]}
                 */
                $element = this.renderNumberField({
                    name: index,
                    text: text.trim(),
                    placeholder: placeholder,
                    value: node.value,
                    disabled: node.disabled,
                    visible: node.visible,
                    validate: node.validate,
                    monitor: node.monitor
                });
            }

            if (node.type === 'range') {

                /**
                 * Get number field
                 * @type {*[]}
                 */
                $element = this.renderRange({
                    name: index,
                    text: text.trim(),
                    value: node.value,
                    min: node.min,
                    max: node.max,
                    step: node.step,
                    unit: node.unit,
                    disabled: node.disabled,
                    visible: node.visible,
                    validate: node.validate,
                    monitor: node.monitor
                });
            }

            if (node.type === 'checkbox') {

                /**
                 * Get checkbox
                 * @type {*[]}
                 */
                $element = this.renderCheckbox({
                    name: index,
                    text: text.trim(),
                    checked: node.value,
                    value: node.value,
                    disabled: node.disabled,
                    visible: node.visible,
                    monitor: node.monitor
                });
            }

            if (node.type === 'textarea') {

                /**
                 * Get text field
                 * @type {*[]}
                 */
                $element = this.renderTextArea({
                    name: index,
                    text: text.trim(),
                    placeholder: placeholder,
                    value: node.value,
                    disabled: node.disabled,
                    visible: node.visible,
                    monitor: node.monitor
                });
            }

            if (node.type === 'combobox') {

                /**
                 * Define selected item
                 * @type {string}
                 */
                var selected = node.value;

                /**
                 * Get text field
                 * @type {*[]}
                 */
                $element = this.renderCombobox(
                    node.list,
                    selected,
                    text.trim(),
                    index,
                    undefined,
                    node.visible,
                    node.disabled,
                    node.placeholder,
                    node.store,
                    node.label
                );
            }

            return $element;
        }
    });
});