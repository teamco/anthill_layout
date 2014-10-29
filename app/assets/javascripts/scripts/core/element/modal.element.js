/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:12 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'jquery',
    'config/anthill',
    'modules/Element',
    'element/button.element',
    'element/cover.element'
], function defineModalElement($, AntHill, BaseElement, Button, Cover) {

    /**
     * Define Modal Element
     * @param view
     * @param opts
     * @returns {ModalElement}
     * @constructor
     * @class ModalElement
     * @extends AntHill
     * @extends BaseElement
     */
    var ModalElement = function ModalElement(view, opts) {

        /**
         * Set button elements
         * @member ModalElement
         * @type {$modal.$buttons}
         */
        this.$buttons = {};

        this.setup(opts);

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container || $('body'),
            destroy: true
        }).$.addClass('modal-dialog');

        this.renderInnerContent();
        this.setCover();

        return this;
    };

    return ModalElement.extend('ModalElement', {

        /**
         * Setup modal dialog
         * @member   ModalElement
         * @param {{
         *      [style]: String,
         *      [cover]: Boolean,
         *      [title]: String,
         *      [type]: String ('info', 'success', 'warning', 'error'),
         *      [position]: String ('t(l-c-r), c(l-c-r), b(l-c-r)'),
         *      [adoptOnResize]: boolean,
         *      [html]: String,
         *      [text]: String,
         *      [draggable]: Boolean,
         *      [autoclose]: Boolean,
         *      [coverOpacity]: Number
         *      $container,
         *      [css],
         *      [items],
         *      [buttons]
         * }} opts
         */
        setup: function setup(opts) {

            /**
             * Set modal title
             * @member ModalElement
             * @type {String|*}
             */
            this.title = opts.title;

            /**
             * Set modal type ['error', 'warning', 'success', 'info']
             * @member ModalElement
             * @type {String|*}
             */
            this.type = opts.type;

            /**
             * Set modal html
             * @member ModalElement
             * @type {String|*}
             */
            this.html = opts.html;

            /**
             * Set modal text
             * @member ModalElement
             * @type {String|*}
             */
            this.text = opts.text;

            /**
             * Set modal item dependency (called from)
             * @member ModalElement
             */
            this.items = opts.items;

            /**
             * Set modal style
             * @member ModalElement
             * @type {String|*|string}
             */
            this.style = opts.style || '';

            /**
             * Set modal css
             * @member ModalElement
             * @type {$modal.css}
             */
            this.css = opts.css || {};

            /**
             * Set hover opacity
             * @member ModalElement
             * @type {*}
             */
            this.hover = this.base.defineBoolean(opts.hover, true, true);

            /**
             * Set modal parent container
             * @member ModalElement
             * @type {*|jQuery|HTMLElement}
             */
            this.$container = opts.$container || $('body');

            /**
             * Set modal position:
             *      ['tl' 'tc' 'tr']
             *      ['cl' 'cc' 'cr']
             *      ['bl' 'bc' 'br']
             * @member ModalElement
             * @type {$modal}
             */
            this.position = opts.position || 'cc';

            /**
             * Adopt position on resize
             * @member ModalElement
             * @type {boolean}
             */
            this.adoptOnResize = this.base.defineBoolean(opts.adoptOnResize, true, true);

            /**
             * Set modal is draggable condition
             * @member ModalElement
             * @type {*}
             */
            this.draggable = this.base.defineBoolean(opts.draggable, true, true);

            /**
             * Set close X button
             * @member ModalElement
             * @type {*}
             */
            this.closeX = this.base.defineBoolean(opts.closeX, true, true);

            /**
             * Set cover config
             * @member ModalElement
             * @type {*}
             */
            this.cover = this.base.defineBoolean(opts.cover, true, true);

            /**
             * Set close modal on click cover
             * @member ModalElement
             * @type {*}
             */
            this.autoclose = this.base.defineBoolean(opts.autoclose, false, true);

            /**
             * Set cover opacity
             * @member ModalElement
             * @type {Number|*}
             */
            this.coverOpacity = opts.coverOpacity;

            /**
             * Set buttons config
             * @member ModalElement
             * @type {*|{}}
             */
            this.buttons = opts.buttons || {};
        },

        /**
         * Render inner content
         * @member ModalElement
         */
        renderInnerContent: function renderInnerContent() {
            this.$.append(
                [
                    '<h2 class="header"></h2>',
                    '<ul class="actions"></ul>',
                    '<div class="content">',
                    '<p class="notification"></p>',
                    '<p class="text"></p>',
                    '<div class="html"></div>',
                    '</div>',
                    '<ul class="buttons"></ul>'
                ].join('')
            ).
                addClass([this.style, this.type].join(' ')).
                css(this.css);

            this.setHeader();
            this.setHtml(this.html, this._get$HTML());
            this.setText(this.text, this._get$Text());

            this.fixContent();

            this.setPosition({
                $container: this.$container,
                $item: this.$,
                position: this.position
            });

            this.adoptPositionOnResize();

            if (this.draggable) {
                this.$.draggable({
                    handle: this._get$Header()
                });
            }

            this.setButtons();

            this.setFocus();
        },

        /**
         * Set focus
         * @member ModalElement
         */
        setFocus: function setFocus() {

            if (this.html) {
                $('input:first', this.$).focus();
            }
        },

        /**
         * Adopt position on resize
         * @member ModalElement
         */
        adoptPositionOnResize: function adoptPositionOnResize() {

            if (this.adoptOnResize) {

                /**
                 * Get app event manager
                 * @type {AppEventManager}
                 */
                var appEventManager = this.view.controller.root().eventmanager;

                appEventManager.subscribe({
                    event: {
                        eventName: appEventManager.eventList.resizeWindow
                    },
                    callback: function resizeCallback() {
                        this.setPosition({
                            $container: this.$container,
                            $item: this.$,
                            position: this.position
                        });
                    }.bind(this)
                }, false)
            }
        },

        /**
         * Set close X button
         * @member ModalElement
         * @returns {boolean|undefined}
         * @private
         */
        _setCloseX: function _setCloseX() {

            /**
             * Get actions
             * @type {*}
             */
            var $actions = this._get$Actions();

            if (!this.closeX) {
                $actions.hide();
                return false;
            }

            this.buttons['closeX'] = {
                $container: this._get$Actions(),
                text: 'Close',
                events: {
                    click: 'rejectModalEvent'
                }
            };
        },

        /**
         * Set buttons
         * @member ModalElement
         */
        setButtons: function setButtons() {

            var $container = this._get$Buttons();

            $.each(this.buttons, function each(i, button) {
                button.$container = $container;
            });

            this._setCloseX();

            this.view.button(Button, this.buttons, this.$buttons);
        },

        /**
         * Unset buttons
         * @member ModalElement
         */
        unsetButtons: function unsetButtons() {

            $.each(this.$buttons, function each(i, $button) {
                $button.destroy();
            });
        },

        /**
         * Set header
         * @member ModalElement
         */
        setHeader: function setHeader() {
            var $header = this._get$Header();
            this.base.isDefined(this.title) ?
                $header.text(this.title) :
                $header.hide();
        },

        /**
         * Fix content
         * @member ModalElement
         */
        fixContent: function fixContent() {

            if (!this.base.isDefined(this.html)) {
                this._get$HTML().hide();
            }

            if (!this.base.isDefined(this.text)) {
                this._get$Text().hide();
            }
        },

        /**
         * Get action buttons container
         * @member ModalElement
         * @returns {*}
         * @private
         */
        _get$Actions: function _get$Actions() {
            return this.$.find('ul.actions');
        },

        /**
         * Get HTML container
         * @member ModalElement
         * @returns {*}
         * @private
         */
        _get$HTML: function _get$HTML() {
            return this.$.find('div.html');
        },

        /**
         * Get text container
         * @member ModalElement
         * @returns {*}
         * @public
         */
        _get$Text: function _get$Text() {
            return this.$.find('p.text');
        },

        /**
         * Get notification container
         * @member ModalElement
         * @returns {*}
         * @public
         */
        _get$Notification: function _get$Notification() {
            return this.$.find('p.notification');
        },

        /**
         * Get buttons container
         * @member ModalElement
         * @returns {*}
         * @private
         */
        _get$Buttons: function _get$Buttons() {
            return this.$.find('ul.buttons');
        },

        /**
         * Get header container
         * @member ModalElement
         * @returns {*}
         * @private
         */
        _get$Header: function _get$Header() {
            return this.$.find('h2');
        },

        /**
         * Set cover
         * @member ModalElement
         */
        setCover: function setCover() {
            if (this.cover) {
                this.$cover = this.view.cover(Cover, {
                    $container: this.$container,
                    opacity: this.coverOpacity,
                    style: 'cover-' + this.style,
                    events: this.autoclose ? { click: 'rejectModalEvent' } : {}
                });
            }
        },

        /**
         * Unset cover
         * @member ModalElement
         */
        unsetCover: function unsetCover() {
            if (this.$cover) {
                this.$cover.destroy();
            }
        },

        /**
         * Self destroy functionality
         * @member ModalElement
         */
        selfDestroy: function selfDestroy() {
            this.unsetButtons();
            this.unsetCover();
            this.destroy();
        },

        /**
         * Collect input fields (input/textarea)
         * @member ModalElement
         * @returns {*|jQuery|HTMLElement}
         */
        collectInputFields: function collectInputFields() {
            return $('input:not(:disabled), textarea, div.combo-box > input', this.$);
        },

        /**
         * Define handle notifications
         * @member ModalElement
         * @param {string} msg
         * @param {string} type
         */
        handleNotification: function handleNotification(msg, type) {

            // Add successful message
            this.setText(msg, this._get$Notification().stop().show());

            // Handle modal type
            this.$.removeClass(this.type);
            this.$.addClass(type);

            setTimeout(function () {
                this._get$Notification().stop().slideUp();
                this.$.removeClass(type);
                this.$.addClass(this.type);
            }.bind(this), 4000);
        }

    }, AntHill.prototype, BaseElement.prototype);
});