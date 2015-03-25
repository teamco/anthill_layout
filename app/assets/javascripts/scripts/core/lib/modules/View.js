/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/18/12
 * Time: 8:22 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'jquery',
    'config/anthill',
    'element/modal.element',
    'element/header.element',
    'element/footer.element',
    'element/filter.element'
], function defineBaseView($, AntHill, ModalElement, Header, Footer, Filter) {

    /**
     * Define base view
     * @class BaseView
     * @extends AntHill
     * @constructor
     */
    var BaseView = function BaseView() {
    };

    return BaseView.extend('BaseView', {

        /**
         * Get config HTML
         * @member BaseView
         * @param {string} [key]
         * @returns {*}
         */
        getConfigHTML: function getConfigHTML(key) {

            /**
             * Define model
             * @type {{}}
             */
            var model = this.scope.model;

            return key ? model.getConfig('html/' + key) :
                model.getConfig('html');
        },

        /**
         * Get item.$
         * @member BaseView
         * @returns {BaseElement}
         */
        get$item: function get$item() {
            return this.elements['$' + this.scope.name.toLowerCase()];
        },

        /**
         * Get item DOM Element
         * @member BaseView
         * @returns {BaseElement}
         */
        getDomElement: function getDomElement() {
            return this.get$item().$[0];
        },

        /**
         * Get item DOM info
         * @member BaseView
         * @returns {BaseElement}
         */
        getDomData: function getDomData() {
            return this.getDomElement().getBoundingClientRect();
        },

        /**
         * Create style
         * @member BaseView
         * @returns {string}
         */
        createStyle: function createStyle() {
            return [
                this.getContainerClassName(),
                this.getConfigHTML('style')
            ].join(' ');
        },

        /**
         * Create UUID
         * @member BaseView
         * @returns {string}
         */
        createUUID: function createUUID() {
            return [
                this.scope.model.getUUID(),
                this.getContainerClassName()
            ].join('-');
        },

        /**
         * Render UUID
         * @member BaseView
         * @param id
         * @returns {*|string}
         */
        renderUUID: function renderUUID(id) {
            return id || [
                    this.base.lib.generator.UUID(),
                    this.constructor.prototype.name.toDash()
                ].join('-');
        },

        /**
         * Define $container
         * @member BaseView
         * @param $container
         */
        defineContainer: function defineContainer($container) {
            this.elements.$container = $container;
        },

        /**
         * Get container class name
         * @member BaseView
         * @returns {string}
         */
        getContainerClassName: function getContainerClassName() {
            return this.getConfigHTML().selector;
        },

        /**
         * Get container selector
         * @member BaseView
         * @returns {*|jQuery}
         */
        getContainerSelector: function getContainerSelector() {
            var html = this.getConfigHTML();
            return $(html.container).children([
                '.', this.getContainerClassName(), 's'
            ].join(''));
        },

        /**
         * Check if element cached
         * @member BaseView
         * @param $element
         * @param Constructor
         * @returns {boolean}
         */
        isCached: function isCached($element, Constructor) {

            if (this.elements[$element] instanceof Constructor) {

                this.scope.logger.debug(
                    this.i18n.t('element.already.rendered').
                        replace(/\{0\}/, Constructor.name)
                );

                return true;
            }

            return false;
        },

        /**
         * Check if render force
         * @member BaseView
         * @returns {boolean}
         */
        isCachedItems: function isCachedItems() {

            return this.base.lib.hash.hashLength(
                    this.elements.items || {}
                ) > 0;
        },

        /**
         * Render Header
         * @member BaseView
         * @param {HeaderElement} HeaderElement
         * @param $container
         * @returns {HeaderElement}
         */
        header: function header(HeaderElement, $container) {

            /**
             * Define $header
             * @type {HeaderElement}
             */
            this.elements.$header = new HeaderElement(this, {
                style: [
                    this.scope.constructor.prototype.name.toDash(),
                    'header'
                ].join('-'),
                $container: $container.$,
                append: false
            });

            /**
             * Define scope
             * @type {{}}
             */
            var scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.successRenderHeader, [
                    this.elements.$header,
                    this.getConfigHTML('header')
                ]
            );

            return this.elements.$header;
        },

        /**
         * Render Footer
         * @member BaseView
         * @param {FooterElement} FooterElement
         * @param $container
         * @returns {FooterElement}
         */
        footer: function footer(FooterElement, $container) {

            /**
             * Define $footer
             * @type {FooterElement}
             */
            this.elements.$footer = new FooterElement(this, {
                style: [
                    this.scope.constructor.prototype.name.toDash(),
                    'footer'
                ].join('-'),
                $container: $container.$
            });

            /**
             * Define scope
             * @type {{}}
             */
            var scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.successRenderFooter, [
                    this.elements.$footer,
                    this.getConfigHTML('footer')
                ]
            );

            return this.elements.$footer;
        },

        /**
         * Render Header
         * @member BaseView
         * @param {HeaderElement} Header
         * @param {string} title
         */
        renderHeader: function renderHeader(Header, title) {
            this.header(Header, this.elements.$container).setText(title);
        },

        /**
         * Render Footer
         * @member BaseView
         * @param {FooterElement} Footer
         * @param {object} $element
         */
        renderFooter: function renderFooter(Footer, $element) {
            this.footer(Footer, this.elements.$container).setHtml(
                $element.getFooter()
            );
        },

        /**
         * Render filter
         * @member BaseView
         * @param {function} [callback]
         * @param {boolean} [enter]
         */
        renderFilter: function renderFilter(callback, enter) {

            /**
             * Define Search element
             * @type {FilterElement}
             */
            this.elements.$filter = new Filter(this, {
                $container: this.elements.$container.$,
                style: [this.scope.name.toDash(), 'filter'].join(' '),
                callback: callback,
                enter: enter
            });
        },

        /**
         * Generic modal dialog window
         * @member BaseView
         * @param {{
         *      [style]: String,
         *      $container,
         *      [cover]: Boolean,
         *      [coverOpacity]: Number,
         *      [autoclose]: Boolean,
         *      [closeX]: Boolean,
         *      [css],
         *      [opacityOff]: Number,
         *      [opacityOn]: Number,
         *      [title]: String,
         *      [type]: String ('info', 'success', 'warning', 'error'),
         *      [html]: *,
         *      [text]: String,
         *      [draggable]: Boolean,
         *      [items],
         *      [position]: String ('tl/tc/tr', 'cl/cc/cr'. 'bl/bc/br'),
         *      [buttons]
         * }} opts
         */
        modalDialog: function modalDialog(opts) {

            /**
             * Define $modal
             * @type {ModalElement}
             */
            this.elements.$modal = new ModalElement(this, {
                style: opts.style,
                $container: opts.$container,
                cover: opts.cover,
                coverOpacity: opts.coverOpacity,
                autoclose: opts.autoclose,
                closeX: opts.closeX,
                css: opts.css,
                opacityOff: opts.opacityOff,
                opacityOn: opts.opacityOn,
                title: opts.title,
                type: opts.type,
                html: opts.html,
                text: opts.text,
                draggable: opts.draggable,
                items: opts.items,
                position: opts.position,
                buttons: opts.buttons
            });
        },

        /**
         * Get $modal element
         * @member BaseView
         * @returns {ModalElement}
         */
        get$modal: function get$modal() {
            return this.elements.$modal;
        },

        /**
         * Generic button
         * @member BaseView
         * @param {ButtonElement} ButtonElement
         * @param {*} opts
         * @param {*} store
         */
        button: function button(ButtonElement, opts, store) {

            $.each(
                this.base.define(opts, {}, true),
                function each(i, button) {

                    /**
                     * Define button
                     * @type {ButtonElement}
                     */
                    store[i] = new ButtonElement(this, {
                        $container: button.$container,
                        style: i.toDash(),
                        text: button.text,
                        disabled: button.disabled,
                        events: button.events
                    });

                }.bind(this)
            );
        },

        /**
         * Define cover
         * @member BaseView
         * @param CoverElement
         * @param opts
         * @returns {CoverElement}
         */
        cover: function cover(CoverElement, opts) {
            return new CoverElement(this, {
                $container: opts.$container,
                style: opts.style,
                opacity: opts.opacity,
                events: opts.events
            });
        },

        /**
         * Locate DOM element in array
         * @member BaseView
         * @param {Array} source
         * @param {string} type
         * @returns {*}
         */
        locateElement: function locateElement(source, type) {
            for (var i = 0, l = source.length; i < l; i++) {
                if ((source[i].tagName + '').toLowerCase() === type) {
                    return source[i];
                }
            }
            return {};
        }

    }, AntHill.prototype);
});