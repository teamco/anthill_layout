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

            /**
             * Parse Html
             * @type {Array}
             */
            var parse = $.parseHTML(text) || [''],
                title = parse[parse.length - 1].data || '';

            return $('<label />').attr({
                'for': uuid,
                title: title.toUpperCase()
            }).addClass(type).html(text);
        },

        /**
         * Render link event
         * @param opts
         * @returns {*|jQuery}
         */
        renderEventLink: function renderEventLink(opts) {

            /**
             * Create UUID
             * @type {String}
             */
            var uuid = this.base.lib.generator.UUID() + '-event';

            /**
             * Define $link
             * @type {*|jQuery}
             */
            var $link = $('<div />').attr({
                rel: opts.name,
                id: uuid,
                title: opts.title
            }).text(opts.title).
                addClass(opts.name.toLowerCase()).append(

                $('<input />').attr({
                    name: opts.group,
                    type: 'radio'
                })
            );

            $link.on(
                opts.events.join(' '),

                /**
                 * On event
                 * @private
                 */
                function _onEvent(e) {

                    e.preventDefault();
                    e.stopPropagation();

                    /**
                     * Define widget content
                     * @type {WidgetContent}
                     */
                    var content = this.view.scope;

                    $('input', $(e.target)).prop({
                        checked: true
                    }).val(opts.name);

                    content.observer.publish(
                        content.eventmanager.eventList.executeOnWidgetEvent,
                        opts.name
                    );

                }.bind(this)
            );

            return $link;
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
         * @param {{text: string, name: string, value, [checked]: boolean, [disabled]: boolean, [monitor]}} opts
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
                checked: this.base.defineBoolean(opts.checked, false, true),
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
         * @param {string} name
         * @param {string} index
         * @param {{type: string, callback: function}} [event]
         */
        renderCombobox: function renderCombobox(data, selected, name, index, event) {

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

                $li.attr({rel: field.value}).appendTo($ul);
            }

            // fix to define modal dialog height
            setTimeout(function () {
                $div.show();
            }, 500);

            return [
                this.renderLabel(undefined, name),
                $div.append([
                    $ul,
                    $('<div />').addClass('combo-box-arrow')
                ])
            ];
        }

    }, AntHill.prototype);
});