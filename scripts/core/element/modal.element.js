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
    'element/button.element',
    'element/cover.element'
], function defineModal(Base, BaseElement, Button, Cover) {

    require(['jqueryui']);

    var Modal = function Modal(view, opts) {

        this.$buttons = {};
        this.setup(opts);

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        }).$.addClass('modal-dialog');

        this.renderInnerContent();
        this.setCover();

        return this;
    };

    return Modal.extend({

        /**
         * Setup modal dialog
         * @param {{
         *      [style]: String,
         *      [cover]: Boolean,
         *      [opacityOff]: Number,
         *      [opacityOn]: Number,
         *      [title]: String,
         *      [type]: String ('info', 'success', 'warning', 'error'),
         *      [position]: String ('0/00/000', '1/11/111'. '2/22/222'),
         *      [html]: String,
         *      [text]: String,
         *      [draggable]: Boolean,
         *      [autoclose]: Boolean,
         *      [coverOpacity]: Number
         *      $container,
         *      [css],
         *      [item],
         *      [buttons]
         * }} opts
         */
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

            this.cover = this.base.defineBoolean(opts.cover, true, true);
            this.autoclose = this.base.defineBoolean(opts.autoclose, false, true);
            this.coverOpacity = opts.coverOpacity;

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

            this.setButtons();
        },

        _setCloseX: function _setCloseX() {
            var $actions = this._getActions();
            if (!this.closeX) {
                $actions.hide();
                return false;
            }

            this.buttons['closeX'] = {
                $container: this._getActions(),
                text: 'Close',
                events: {
                    click: 'rejectWidgetDestroy'
                }
            };
        },

        setButtons: function setButtons() {
            var $container = this._getButtons();
            $.each(this.buttons, function each(i, button) {
                button.$container = $container;
            });

            this._setCloseX();

            this.view.button(Button, this.buttons, this.$buttons);
        },

        unsetButtons: function unsetButtons() {
            $.each(this.$buttons, function each(i, $button) {
                $button.destroy();
            });
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
        },

        setCover: function setCover() {
            if (this.cover) {
                this.$cover = this.view.cover(Cover, {
                    $container: this.$container,
                    opacity: this.coverOpacity,
                    style: 'cover-' + this.style,
                    events: this.autoclose ? { click: 'rejectItemDestroy' } : {}
                });
            }
        },

        unsetCover: function unsetCover() {
            if (this.$cover) {
                this.$cover.destroy();
            }
        },

        selfDestroy: function selfDestroy() {
            this.unsetButtons();
            this.unsetCover();
            this.destroy();
        }

    }, Base, BaseElement.prototype);
});