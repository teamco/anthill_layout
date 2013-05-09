/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:12 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/base',
    'modules/element',
    'element/button.element'
], function defineModal(Base, BaseElement, Button) {

    require(['jqueryui']);

    var Modal = function Modal(view, opts) {

        this.buttons = {};
        this.setup(opts);

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        }).$.addClass('modal-dialog');

        this.renderInnerContent();

        return this;
    };

    return Modal.extend({

        setup: function setup(opts) {
            this.title = opts.title;
            this.type = opts.type;
            this.html = opts.html;
            this.text = opts.text;
            this.item = opts.item;
            this.style = opts.style || '';
            this.css = opts.css || {};
            this.opacityOff = opts.opacityOff || 0.8;
            this.opacityOn = opts.opacityOn || 0.9;
            this.$container = opts.$container || $('body');
            this.position = opts.position || 'cc';
            this.draggable = this.base.defineBoolean(opts.draggable, true, true);
            this.closeX = this.base.defineBoolean(opts.draggable, true, true);

            this.buttons = opts.buttons || {};
        },

        /**
         * Render inner content
         */
        renderInnerContent: function renderInnerContent() {
            this.$.append(
                    [
                        '<h2 class="header"></h2>',
                        '<ul class="actions"></ul>',
                        '<div class="html"></div>',
                        '<p class="text"></p>',
                        '<ul class="buttons"></ul>'
                    ].join('')
                ).
                addClass([this.style, this.type].join(' ')).
                css(this.css);

            this.setHeader();
            this.setHTML();
            this.setText();

            this.setPosition({
                $container: this.$container,
                $item: this.$,
                position: this.position
            });

            if (this.draggable) {
                this.$.draggable({
                    handle: this._getHeader()
                });
            }

            this.setCloseX();
        },

        setCloseX: function setCloseX() {
            var $actions = this._getActions();
            if (!this.closeX) {
                $actions.hide();
                return false;
            }

            this.view.button(Button, {
                closeX: {
                    $container: this._getActions(),
                    text: 'Close',
                    style: 'close-x',
                    events: {
                        click: 'rejectWidgetDestroy'
                    }
                }
            }, this.buttons);
        },

        setButtons: function setButtons() {

        },

        setHeader: function setHeader() {
            var $header = this._getHeader();
            this.base.isDefined(this.title) ?
                $header.text(this.title) :
                $header.hide();
        },

        setHTML: function setHTML() {
            var $html = this._getHTML();
            this.base.isDefined(this.html) ?
                $html.html(this.html) :
                $html.hide();
        },

        setText: function setText() {
            var $text = this._getText();
            this.base.isDefined(this.text) ?
                $text.text(this.text) :
                $text.hide();
        },

        _getActions: function _getActions() {
            return this.$.find('ul.actions');
        },

        _getHTML: function _getHTML() {
            return this.$.find('div.html');
        },

        _getText: function _getText() {
            return this.$.find('p.text');
        },

        _getButtons: function _getButtons() {
            return this.$.find('ul.buttons');
        },

        _getHeader: function _getHeader() {
            return this.$.find('h2');
        }

    }, Base, BaseElement.prototype);
});