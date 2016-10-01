/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:12 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'config/anthill',
    'modules/Element',
    'element/button.element'
], function defineModalElement(AntHill, BaseElement, Button) {

    /**
     * Define Modal Element
     * @param view
     * @param opts
     * @returns {ModalElement}
     * @constructor
     * @class ModalElement
     * @extends AntHill
     * @extends BaseElement
     * @extends TabsRenderer
     */
    var ModalElement = function ModalElement(view, opts) {

        /**
         * Set button elements
         * @property ModalElement
         * @type {$modal.$buttons}
         */
        this.$buttons = {};

        this.setup(opts);

        this._config(view, opts, this.getTemplate()).build({
            $container: opts.$container || $('body'),
            destroy: true
        });

        this.initBootstrapModal();

        return this;
    };

    return ModalElement.extend('ModalElement', {

        /**
         * Setup modal dialog
         * @memberOf   ModalElement
         * @param {{
         *      [style]: String,
         *      [cover]: Boolean,
         *      [title]: String,
         *      [type]: String ('info', 'success', 'warning', 'danger'),
         *      [position]: String ('t(l-c-r), c(l-c-r), b(l-c-r)'),
         *      [adoptOnResize]: boolean,
         *      [html]: String,
         *      [text]: String,
         *      [hover]: Boolean,
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

            // Define default container
            var $defaultContainer = $('body');

            /**
             * Set modal title
             * @property ModalElement
             * @type {String|*}
             */
            this.title = opts.title;

            /**
             * Set modal type ['danger', 'warning', 'success', 'info']
             * @property ModalElement
             * @type {String|*}
             */
            this.type = opts.type;

            /**
             * Set modal html
             * @property ModalElement
             * @type {String|*}
             */
            this.html = opts.html;

            /**
             * Set modal text
             * @property ModalElement
             * @type {String|*}
             */
            this.text = opts.text;

            /**
             * Set modal item dependency (called from)
             * @property ModalElement
             */
            this.items = opts.items;

            /**
             * Set modal style
             * @property ModalElement
             * @type {String|*|string}
             */
            this.style = opts.style || '';

            /**
             * Set modal css
             * @property ModalElement
             * @type {$modal.css}
             */
            this.css = opts.css || {};

            /**
             * Set hover opacity
             * @property ModalElement
             * @type {*}
             */
            this.hover = this.base.defineBoolean(opts.hover, true, true);

            /**
             * Set modal parent container
             * @property ModalElement
             * @type {*|jQuery|HTMLElement}
             */
            this.$container = opts.$container || $defaultContainer;

            /**
             * Set modal position:
             *      ['tl' 'tc' 'tr']
             *      ['cl' 'cc' 'cr']
             *      ['bl' 'bc' 'br']
             * @property ModalElement
             * @type {$modal}
             */
            this.position = opts.position || 'cc';

            /**
             * Adopt position on resize
             * @property ModalElement
             * @type {boolean}
             */
            this.adoptOnResize = this.base.defineBoolean(opts.adoptOnResize, true, true);

            /**
             * Set modal is draggable condition
             * @property ModalElement
             * @type {*}
             */
            this.draggable = this.base.defineBoolean(opts.draggable, true, true);

            /**
             * Set close X button
             * @property ModalElement
             * @type {*}
             */
            this.closeX = this.base.defineBoolean(opts.closeX, true, true);

            /**
             * Set cover config
             * @property ModalElement
             * @type {*}
             */
            this.cover = this.base.defineBoolean(opts.cover, true, true);

            /**
             * Set close modal on click cover
             * @property ModalElement
             * @type {*}
             */
            this.autoclose = this.base.defineBoolean(opts.autoclose, false, true);

            /**
             * Set cover opacity
             * @property ModalElement
             * @type {Number|*}
             */
            this.coverOpacity = opts.coverOpacity;

            /**
             * Set buttons config
             * @property ModalElement
             * @type {*|{}}
             */
            this.buttons = opts.buttons || {};
        },

        /**
         * Get template
         * @memberOf ModalElement
         * @returns {*|jQuery|HTMLElement}
         */
        getTemplate: function getTemplate() {
            return $([
                '<div class="modal modal-notification" tabindex="-1" role="dialog" aria-labelledby="modalLabel">',
                '<div class="modal-dialog" role="document">',
                '<div class="modal-content">',
                '<div class="modal-header alert">',
                '<h4 class="modal-title" id="modalLabel"></h4></div>',
                '<div class="modal-body"></div>',
                '<div class="modal-footer separator">',
                '</div></div></div></div>'
            ].join(''));
        },

        /**
         * Render inner content
         * @memberOf ModalElement
         */
        initBootstrapModal: function initBootstrapModal() {

            /**
             * Get view
             * @type {BaseView}
             */
            var view = this.view;

            if (!this.$['modal']) {
                view.scope.logger.warn('Undefined modal');
                return false;
            }

            this.$['modal']();
            this.$.css(this.css);

            this.setModalType(this.type);
            this.setHeader();
            this.setText(this.text, this.get$Body());
            this.setHtml(this.html, this.get$Body());

            this.setPosition({
                $container: this.$container,
                $item: this.$,
                position: this.position
            });

            this.adoptPositionOnResize();

            if (this.draggable) {

                if (typeof this.$.draggable !== 'function') {

                    if (view.controller.isConsumptionMode()) {
                        return false;
                    }

                    view.scope.logger.warn('Unable to define draggable', this);
                    return false;
                }

                this.$.draggable({
                    handle: this._get$Header()
                });
            }

            if (this.autoclose) {

                $('.modal-backdrop.in').on(
                    'click.autoclose',
                    view.controller.rejectModalEvent.bind(view)
                );
            }

            this.setButtons();
            this.setFocus();
            this.bindTabsScroll(this.$);
        },

        /**
         * Set focus
         * @memberOf ModalElement
         */
        setFocus: function setFocus() {
            if (this.html) {
                $('input:first', this.$).focus();
            }
        },

        /**
         * Adopt position on resize
         * @memberOf ModalElement
         */
        adoptPositionOnResize: function adoptPositionOnResize() {

            if (this.adoptOnResize) {

                /**
                 * Get app event manager
                 * @type {ApplicationEventManager}
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
         * @memberOf ModalElement
         * @returns {boolean|undefined}
         * @private
         */
        _setCloseX: function _setCloseX() {

            if (!this.closeX) {
                return false;
            }

            this.buttons['closeX'] = {
                $container: this._get$Header(),
                $htmlElement: $('<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'),
                events: {
                    click: 'rejectModalEvent'
                }
            };
        },

        /**
         * Set buttons
         * @memberOf ModalElement
         */
        setButtons: function setButtons() {

            var $container = this._get$Buttons();

            $.each(this.buttons, function each(i, button) {

                // Define container
                button.$container = $container;
            });

            this._setCloseX();

            this.view.button(Button, this.buttons, this.$buttons);
        },

        /**
         * Unset buttons
         * @memberOf ModalElement
         */
        unsetButtons: function unsetButtons() {
            $.each(this.$buttons, function each(i, $button) {
                $button.destroy();
            });
        },

        /**
         * Set header
         * @memberOf ModalElement
         */
        setHeader: function setHeader() {
            var $header = this._get$Header();
            if (this.base.isDefined(this.title)) {
                $header.text(this.title).attr({
                    title: this.title
                });
            } else {
                $header.hide();
            }
        },

        /**
         * Get HTML container
         * @memberOf ModalElement
         * @returns {*}
         */
        get$Body: function get$Body() {
            return this.$.find('div.modal-body');
        },

        /**
         * Get notification container
         * @memberOf ModalElement
         * @returns {*}
         * @public
         */
        _get$Notification: function _get$Notification() {
            return this.$.find('p.notification');
        },

        /**
         * Get buttons container
         * @memberOf ModalElement
         * @returns {*}
         * @private
         */
        _get$Buttons: function _get$Buttons() {
            return this.$.find('.modal-footer');
        },

        /**
         * Get header container
         * @memberOf ModalElement
         * @returns {*}
         * @private
         */
        _get$Header: function _get$Header() {
            return this.$.find('h4');
        },

        /**
         * Self destroy functionality
         * @memberOf ModalElement
         * @param {boolean} [backdrop]
         */
        selfDestroy: function selfDestroy(backdrop) {
            this.unsetButtons();
            this.destroy();

            if (this.base.defineBoolean(backdrop, true, true)) {
                $('body').removeClass('modal-open');
                this.removeBackdrop();
            }
        },

        /**
         * Remove Bootstrap backdrop
         * @memberOf ModalElement
         */
        removeBackdrop: function removeBackdrop() {
            $('.modal-backdrop').remove();
        },

        /**
         * Define modal type
         * @memberOf ModalElement
         * @param {string} type
         */
        setModalType: function setModalType(type) {
            this.$.find('.modal-header').addClass([this.style, 'alert-' + type].join(' '));
        },

        /**
         * Collect input fields (input/textarea)
         * @memberOf ModalElement
         * @param {{method: string, value: string}} [filter]
         * @returns {*|jQuery|HTMLElement}
         */
        collectInputFields: function collectInputFields(filter) {

            /**
             * Get inputs
             * @type {*|jQuery|HTMLElement}
             */
            var $inputs = $('input:not(:disabled), textarea, .dropdown + input.store', this.$);

            /**
             * Get tinyMCE instance
             * @type {Window.tinymce|*}
             */
            var editorInstance = window.tinymce;

            if (editorInstance) {

                $inputs.filter('.editor').each(function () {

                    /**
                     * Get tinyMCE object data
                     * @type {*}
                     */
                    var editor = editorInstance.get(this.id);

                    if (editor) {
                        $(this).val(editor.getContent());
                    }
                });
            }

            if (filter) {
                return $inputs[filter.method](filter.value);
            }

            return $inputs;
        },

        /**
         * Define handle notifications
         * @memberOf ModalElement
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
                this._get$Notification().stop().slideUp(function () {
                    $(this).text('').show();
                });
                this.$.removeClass(type);
                this.$.addClass(this.type);
            }.bind(this), 4000);
        }

    }, AntHill.prototype, BaseElement.prototype);
});