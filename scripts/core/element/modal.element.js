/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:12 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/base',
    'modules/element'
], function defineModal(Base, BaseElement) {

    require(['jqueryui']);

    var Modal = function Modal(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        }).$.addClass('modal-dialog');

        this.setup(opts);
        this.renderInnerContent();

        return this;
    };

    return Modal.extend({

        setup: function setup(opts) {
            this.style = opts.style || '';
            this.css = this.base.define(opts.css, {}, true);
            this.opacityOff = opts.opacityOff || 0.8;
            this.opacityOn = opts.opacityOn || 0.9;
            this.title = opts.title || '';
            this.type = opts.type || '';
            this.html = opts.html || '';
            this.draggable = this.base.defineBoolean(opts.draggable, false, true);
            this.item = opts.item;
            this.$container = opts.$container || $('body');
            this.position = opts.position || '11';

            this.$buttons = {};
        },

        renderInnerContent: function renderInnerContent() {
            this.$.append(
                    [
                        '<h2 class="', this.type, '">', this.title, '</h2>',
                        '<div class="html"></div>',
                        '<p class="text"></p>',
                        '<ul class="buttons"></ul>'
                    ].join('')
                ).
                addClass(this.style).
                css(this.css);

            this.renderHTML();

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
        },

        renderHTML: function renderHTML() {
            this._getHTML().html(this.html);
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