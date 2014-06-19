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
         * Render tooltip
         * @param {string} title
         * @param {string} [description]
         * @param {string} [imageUrl]
         * @param {string} [imageFloat]
         * @param {string} [linkUrl]
         * @param {string} [linkTitle]
         * @returns {*|jQuery}
         */
        renderTooltip: function renderTooltip(title, description, imageUrl, imageFloat, linkUrl, linkTitle) {

            var $title = $('<h2 />').text(title),
                $description = $('<p />').text(description),
                $image, $link;

            if (imageUrl) {

                $image = $('<img />').attr({
                    src: image,
                    alt: title
                }).css({
                    cssFloat: imageFloat || 'none'
                });
            }

            if (linkUrl) {

                $link = $('<a />').attr({
                    href: linkUrl,
                    title: linkTitle || linkUrl
                });
            }

            return $('<div />').append([

                $title,
                $image,
                $description,
                $link

            ]).addClass('tooltip');
        },

        /**
         * Render label
         * @member Renderer
         * @param {*|string} uuid
         * @param {string} text
         * @param {*|string} [type]
         * @param {boolean} [visible]
         * @returns {*|jQuery}
         */
        renderLabel: function renderLabel(uuid, text, type, visible) {

            /**
             * Parse Html
             * @type {Array}
             */
            var parse = $.parseHTML(text) || [''],
                title = parse[parse.length - 1].data || '';

            var $label = $('<label />').attr({
                'for': uuid,
                title: title.toUpperCase()
            }).addClass(type).html(text);

            if (!visible) {
                $label.hide();
            }

            return $label;
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

                    // Reset to default value
                    $('input:radio[name="' + e.target.name + '"]').val('on');

                    // Set new value
                    $('input', $(e.target)).prop({
                        checked: true
                    }).val(opts.name);

                    content.observer.publish(
                        content.eventmanager.eventList.executeOnWidgetEvent,
                        opts.name
                    );

                }.bind(this)
            );

            if (!opts.visible) {
                $link.hide();
            }

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

            if (!opts.visible) {
                $input.hide();
            }

            return [
                this.renderLabel(uuid, opts.text, 'text', opts.visible),
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
            var uuid = this.base.lib.generator.UUID() + '-checkbox',
                checked = this.base.defineBoolean(opts.checked, false, true);

            /**
             * Define $input
             * @type {*|jQuery}
             */
            var $input = $('<input />').attr({
                name: opts.name,
                type: 'checkbox',
                id: uuid,
                title: opts.value,
                checked: checked,
                disabled: this.base.defineBoolean(opts.disabled, false, true)
            }).val(opts.value);

            $input.prop(
                'checked',
                checked
            );

            if (opts.monitor) {

                $input.on(
                    opts.monitor.events.join(','),
                    opts.monitor.callback
                );
            }

            if (!opts.visible) {
                $input.hide();
            }

            return [
                $input,
                this.renderLabel(uuid, opts.text, 'text', opts.visible)
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

            if (!opts.visible) {
                $input.hide();
            }

            return [
                this.renderLabel(uuid, opts.text, 'textarea', opts.visible),
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

                $li.attr({rel: field.value}).appendTo($ul);
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

    }, AntHill.prototype);
});