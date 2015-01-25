/**
 * Created by i061485 on 3/19/14.
 */

define(['jquery'], function defineBasePreferences($) {

    /**
     * Define base prefs
     * @class BasePreferences
     * @constructor
     */
    var BasePreferences = function BasePreferences() {

    };

    return BasePreferences.extend({

        /**
         * Toggle fieldset
         * @member BasePreferences
         * @param e
         */
        toggleFieldset: function toggleFieldset(e) {

            /**
             * Define $el
             * @type {*|jQuery|HTMLElement}
             */
            var $el = $(e.target);

            $el.parents('div.html').
                find('.open').
                removeClass('open');

            $el.addClass('open');

            this.adoptModalDialogPosition();
        },

        /**
         * Open preferences
         * @member BasePreferences
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
                    events: {
                        click: 'locate' + this.scope.constructor.name
                    }
                },
                approve: {
                    text: 'OK',
                    events: {
                        click: 'approveUpdatePreferences'
                    }
                },
                reject: {
                    text: 'Cancel',
                    events: {
                        click: ['rejectModalEvent']
                    }
                }
            }, opts.buttons || {});

            /**
             * Define current page
             * @type {Page}
             */
            var current = this.controller.getPage();

            /**
             * Define page
             * @type {Page}
             */
            var page = opts.current ? current : this.scope.base.define(
                this.controller.getPage(opts.config.uuid),
                current
            );

            this.modalDialog({
                style: opts.style,
                $container: page.view.get$item().$,
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
         * @member BasePreferences
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
                    visible: node.visible
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
                    validate: node.validate
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
                    validate: node.validate
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
                    validate: node.validate
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
                    visible: node.visible
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
                    visible: node.visible
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
                    (selected.length === 0 ? node.list[0].value : selected),
                    text.trim(),
                    index,
                    undefined,
                    node.visible
                );
            }

            return $element;
        }
    });
});