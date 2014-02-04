/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/6/13
 * Time: 9:38 PM
 */
define([], function defineDebuggerComponent() {

    /**
     * Define Debugger Component
     * @param {*} debug
     * @class DebuggerComponent
     * @constructor
     */
    var DebuggerComponent = function DebuggerComponent(debug) {

        /**
         * Define debugger
         * @type {Debugger}
         */
        this.debugger = debug;
    };

    return DebuggerComponent.extend({

        /**
         * Render block of elements
         * @param {String} text
         * @param {Array} content
         * @param {Boolean} show
         * @returns {string}
         */
        renderBlock: function renderBlock(text, content, show) {
            return [
                this.renderHeader(text, show),
                content.join(''),
                this.renderFooter()
            ].join('');
        },

        /**
         * Render combo box
         * @param {String} text
         * @param {String} selected
         * @param {Array} arr
         * @returns {string}
         */
        renderCombo: function renderCombo(text, selected, arr) {

            function _comboList() {
                return $.map(arr,function map(n, i) {
                    return [
                        '<option', (n === selected ? ' selected' : ''),
                        ' value="', n, '">', n, '</option>'
                    ].join('');
                }).join('');
            }

            return [
                '<li><span>', text, ': </span><select id="',
                text.replace(/ /gi, '-').toLowerCase(), '">',
                _comboList(), '</select></li>'
            ].join('');
        },

        /**
         * Render Header
         * @param {String} text
         * @param {Boolean} show
         * @returns {string}
         */
        renderHeader: function renderHeader(text, show) {
            return [
                '<fieldset class="', (text.toLowerCase() + '-info'), '"><legend>',
                text, '</legend><ul', (show ? '' : ' class="hide"'), '>'
            ].join('');
        },

        /**
         * Render inline element
         * @param {String} text
         * @param {String} value
         * @returns {string}
         */
        renderInline: function renderInline(text, value) {
            return ['<li><span>', text, ':</span> ', value, '</li>'].join('');
        },

        /**
         * Render inline action element
         * @param {{rel: String, [style]: String, title: String}} opts
         * @returns {string}
         */
        renderInlineAction: function renderInlineAction(opts) {
            return [
                '<li rel="', opts.rel,
                '" class="', [opts.title.toClassName(), opts.style || ''].join(' '),
                '" title="', opts.title, '">', opts.title, '</li>'
            ].join('');
        },
        /**
         * Render inline element: count of elements
         * @param {String} text
         * @param {*} item
         * @returns {string}
         */
        renderInlineOf: function renderInlineOf(text, item) {
            var config = item.config[item.model.getItemNameSpace()];
            return [
                '<li class="items-count"><span>', text, ':</span> ',
                anthill.base.lib.hash.hashLength(item.items), ' of ',
                (config ? config.limit : 'Undefined') ||
                    'Unlimited', '</li>'
            ].join('');
        },

        /**
         * Render input element
         * @param {String} text
         * @param {Boolean} condition
         * @returns {string}
         */
        renderInput: function renderInput(text, condition) {
            var uuid = anthill.base.lib.generator.UUID();
            return [
                '<li><input name="', (text.toLowerCase().replace(/ /g, '-')),
                '" id="', uuid, '" type="checkbox"',
                condition ? ' checked="checked"' : '', ' />',
                '<label for="', uuid, '">', text, '</label></li>'
            ].join('');
        },

        /**
         * Render footer
         * @returns {string}
         */
        renderFooter: function renderFooter() {
            return '</ul></fieldset>';
        },

        /**
         * Render table row
         * @param {String} text
         * @param {String|Number} top
         * @param {String|Number} left
         * @param {Boolean} head
         * @returns {string}
         */
        renderTableRow: function renderTableRow(text, top, left, head) {
            var h = head ? 'h' : 'd';
            return [
                '<tr><t', h, '>', text, '</t', h, '>',
                '<t', h, '>', top, '</t', h, '>',
                '<t', h, '>', left, '</t', h, '></tr>'
            ].join('');
        },

        /**
         * Collapse/expand group
         */
        bindCollapse: function bindCollapse() {

            /**
             * Toggle legend
             * @private
             */
            function _clickToggle() {

                var $ul = $(this).parent().find('ul');
                $ul['slide' + ($ul.is(':visible') ? 'Up' : 'Down')]();

            }

            $('legend', this.debugger.info).on('click.toggle', _clickToggle);
        },

        /**
         * Hide/Show info window
         */
        bindDebugClose: function bindDebugClose() {

            var scope = this,
                $close = $('.debug-close', scope.debugger.info);

            /**
             * Toggle hide/show
             * @private
             */
            function _hideDebug() {

                var visible = $('fieldset:visible:first', scope.debugger.info);

                if (visible.length > 0) {

                    visible.slideUp();
                    $close.text($close.text().replace(/Hide/, 'Show'));

                    scope.visible = visible;

                } else {

                    scope.visible.slideDown();
                    $close.text($close.text().replace(/Show/, 'Hide'));
                }
            }

            $close.on('click.hideDebug', _hideDebug);
        }

    });

});
