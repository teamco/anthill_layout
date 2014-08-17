/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:12 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'config/anthill',
    'modules/Renderer'
], function defineBaseElement(AntHill, Renderer) {

    /**
     * Define Base element
     * @class BaseElement
     * @constructor
     * @extends AntHill
     */
    var BaseElement = function BaseElement() {
    };

    return BaseElement.extend('BaseElement', {

        /**
         * Define plugin path
         * @member BaseElement
         */
        pluginPath: '../../assets/scripts/plugins',

        /**
         * Element config before build
         * @member BaseElement
         * @param {BaseView} view
         * @param {{[style]: string, [id]: string, [css], [events], [opacity]}} opts
         * @param $html
         * @returns {*}
         * @private
         */
        _config: function _config(view, opts, $html) {

            opts = opts || {};

            /**
             * Define view
             * @member BaseElement
             * @type {BaseView}
             */
            this.view = view;

            /**
             * Define style
             * @member BaseElement
             * @type {String}
             */
            this.style = opts.style || view.createStyle();

            /**
             * Define id
             * @member BaseElement
             * @type {String}
             */
            this.id = view.renderUUID(opts.id);

            /**
             * Define events
             * @member BaseElement
             * @type {*}
             */
            this.events = opts.events;

            /**
             * Define opacity
             * @member BaseElement
             * @type {*|number}
             */
            this.opacity = opts.opacity || 1.0;

            /**
             * Define CSS
             * @member BaseElement
             * @type {*}
             */
            this.css = this.base.define(opts.css, {}, true);

            /**
             * Define jQuery element
             * @member BaseElement
             */
            this.$ = $html.attr({
                id: this.id
            }).addClass(this.style).css(this.css);

            return this;
        },

        /**
         * Bind element events
         * @member BaseElement
         */
        bindEvents: function bindEvents() {

            var scope = this.view.scope,
                $element = this.$;

            $.each(
                this.base.define(this.events, [], true),
                function each(index, event) {
                    scope.eventmanager.onEvent.bind({
                        scope: scope,
                        $: $element
                    })(event, index);
                }
            );
        },

        /**
         * Get text metrics
         * @member BaseElement
         * @param $element
         * @return {Object}
         */
        textMetrics: function textMetrics($element) {

            // Define new div
            var $div = $('<div />').appendTo('body');

            $div.css({
                position: 'absolute',
                left: -1000,
                top: -1000,
                display: 'none'
            });

            $div.html($element.html());

            var styles = [
                'font-size',
                'font-style',
                'font-weight',
                'font-family',
                'line-height',
                'text-transform',
                'letter-spacing'
            ];

            $(styles).each(function textMetricsLoop() {
                var s = this.toString();
                $div.css({
                    s: $element.css(s)
                });
            });

            /**
             * Set metrics
             * @type {{height: (*|jQuery), width: (*|jQuery)}}
             */
            var metrics = {
                height: $div.outerHeight(true),
                width: $div.outerWidth(true)
            };

            $div.remove();

            return metrics;
        },

        /**
         * Centralize element into container
         * @member BaseElement
         * @param {{$container, $item, css, position: String}} opts
         * Position options:
         *      ['tl' 'tc' 'tr']
         *      ['cl' 'cc' 'cr']
         *      ['bl' 'bc' 'br']
         * @returns {opts.$item}
         */
        setPosition: function setPosition(opts) {

            var rectC = opts.$container[0].getBoundingClientRect(),
                cWidth = rectC.width,
                cHeight = rectC.height,

                $item = opts.$item,
                rectI = $item[0].getBoundingClientRect(),
                eWidth = rectI.width,
                eHeight = rectI.height;

            var offsetLeft = 0,
                offsetTop = 0;

            if ($item.css('position') === 'fixed') {
                offsetLeft = rectC.left;
                offsetTop = rectC.top;
            }

            var top = 'auto',
                left = 'auto',
                mw = cWidth - eWidth,
                cw = offsetLeft + (mw / 2),
                mh = cHeight - eHeight,
                ch = offsetTop + (mh / 2);

            if (opts.position == 'tl') {
            } else if (opts.position == 'tc') {
                left = cw;
            } else if (opts.position == 'tr') {
                left = mw;
            } else if (opts.position == 'cl') {
                top = ch;
            } else if (opts.position == 'cc') {
                top = ch;
                left = cw;
            } else if (opts.position == 'cr') {
                top = ch;
                left = mw;
            } else if (opts.position == 'bl') {
                top = mh;
            } else if (opts.position == 'bc') {
                top = mh;
                left = cw;
            } else if (opts.position == 'br') {
                top = mh;
                left = mw;
            }

            /**
             * Define css
             */
            var css = $.extend({
                left: left,
                top: top
            }, opts.css || {});

            return $item.css(css);
        },

        /**
         * Destroy element before create
         * @member BaseElement
         * @param {Boolean} destroy
         */
        destroyB4Create: function destroyB4Create(destroy) {

            /**
             * Define $container
             * @type {$container|*}
             */
            var $container = this.$container;

            /**
             * Destroy element
             * @param $element
             */
            function destroyElement($element) {
                if ($element.length > 0) {
                    this.view.scope.logger.debug(
                        this.i18n.t('element.overwritten').
                            replace(/\{0\}/, this.constructor.name)
                    );
                    $element.remove();
                }
            }

            destroyElement.bind(this)(
                $('#' + this.id, $container)
            );

            if (this.base.defineBoolean(destroy, false, true)) {

                destroyElement.bind(this)(
                    $('.' + this.style, $container)
                );
            }
        },

        /**
         * Build element
         * @member BaseElement
         * @param {{$container, [append], destroy, [callback]}} opts
         * @returns {*}
         */
        build: function build(opts) {

            opts = this.base.define(opts, {}, true);

            /**
             * Define append/prepend
             */
            var append = this.base.defineBoolean(opts.append, true, true);

            if (this.$) {

                /**
                 * Define $container
                 * @member BaseElement
                 * @type {*|jQuery|HTMLElement}
                 */
                this.$container = $(opts.$container);

                this.destroyB4Create(opts.destroy);

                this.$[append ? 'appendTo' : 'prependTo'](opts.$container);

                if (this.base.isFunction(opts.callback)) {
                    opts.callback();
                }
            }

            this.bindEvents();

            return this;
        },

        /**
         * Dynamic CSS
         * @member BaseElement
         * @param {String} type
         * @param {{
         *      [type]: string,
         *      [rel]: string,
         *      [media]: string,
         *      [resource]: string
         * }} [opts]
         */
        addCSS: function addCSS(type, opts) {

            /**
             * Create url
             * @type {string}
             */
            var url = ('/' + type).repeat(2) + '.css';

            /**
             * Generate uuid
             * @type {string}
             */
            var uuid = this.$.attr('id') + '-css';

            opts = this.base.define(opts, {}, true);

            this.createLinkCss({
                href: this.pluginPath + (opts.resource || '') + url,
                type: opts.type,
                rel: opts.rel,
                media: opts.media,
                id: uuid
            });

            /**
             * Define css link instance
             * @type {*|jQuery|HTMLElement}
             */
            this.linkCSS = $('#' + uuid);
        },

        /**
         * Create link css
         * @member BaseElement
         * @param opts
         */
        createLinkCss: function createLinkCss(opts) {

            /**
             * Define defaults
             * @type {{type: string, rel: string, media: string}}
             */
            var defaults = {
                type: 'text/css',
                rel: 'stylesheet',
                media: 'all'
            };

            /**
             * Init Link
             * @type {HTMLElement|{
             *      type: string,
             *      rel: string,
             *      media: string,
             *      href: string,
             *      id: string
             * }}
             */
            var link = document.createElement("link");

            link.type = opts.type || defaults.type;
            link.rel = opts.rel || defaults.rel;
            link.media = opts.media || defaults.media;
            link.href = opts.href;
            link.id = opts.id;

            document.getElementsByTagName("head")[0].appendChild(link);
        },

        /**
         * Destroy element
         * @member BaseElement
         * @returns {*}
         */
        destroy: function destroy() {

            if (this.$) {
                this.view.scope.logger.debug('Destroy element', this);
                this.$.unbind().remove();
            }

            if (this.linkCSS) {
                this.linkCSS.remove();
            }

            return this;
        },

        /**
         * Hide element
         * @member BaseElement
         * @returns {*}
         */
        hide: function hide() {
            this.view.scope.logger.debug('Hide element');
            return this.$.hide();
        },

        /**
         * Clear element internal HTML
         * @member BaseElement
         * @returns {*|Boolean}
         */
        empty: function empty() {
            this.view.scope.logger.debug('Clear inner html of the element');
            return this.$.empty();
        },

        /**
         * Fade in effect
         * @member BaseElement
         * @returns {*}
         */
        fadeIn: function fadeIn() {
            return this.$.stop(true, true).fadeIn();
        },

        /**
         * Fade out effect
         * @member BaseElement
         * @returns {*}
         */
        fadeOut: function fadeOut() {
            return this.$.stop(true, true).fadeOut();
        },

        /**
         * Show element
         * @member BaseElement
         * @returns {*}
         */
        show: function show() {
            return this.$.show();
        },

        /**
         * Remove element inline style
         * @member BaseElement
         */
        removeStyle: function removeStyle() {
            this.$.attr({
                style: ''
            });
        },

        /**
         * Stretch element in parent container
         * @member BaseElement
         * @returns {*}
         */
        stretch: function stretch() {

            var scope = this.view.scope,
                containment = scope.controller.getContainment(),
                items = containment.model.getItems();

            var index, $item, item, stretch,
                itemsLength = this.base.lib.hash.hashLength(items),
                counter = 0;

            for (index in items) {

                if (items.hasOwnProperty(index)) {

                    item = items[index];

                    /**
                     * Define page
                     * @type {Page}
                     */
                    $item = item.view.get$item();

                    stretch = containment &&
                        item.model.getConfig('html/stretch');

                    if (stretch) {
                        $item.$.css({
                            left: counter * (100 / itemsLength) + '%'
                        });
                    }

                    counter += 1;
                }
            }

            return this;
        },

        /**
         * Get root container
         * @member BaseElement
         * @returns {*|HTMLElement}
         */
        getRootContainer: function getRootContainer() {
            return $(this.view.scope.controller.root().config.html.container);
        },

        /**
         * Set element opacity
         * @member BaseElement
         * @param {Number} opacity
         */
        setOpacity: function setOpacity(opacity) {
            this.$.css({
                opacity: opacity
            });
        },

        /**
         * Get position
         * @member BaseElement
         * @returns {{top, left}}
         */
        getPosition: function getPosition() {
            return this.$.position();
        },
        /**
         * Get offset
         * @member BaseElement
         * @returns {{top, left}}
         */
        getOffset: function getOffset() {
            return this.$.offset();
        },

        /**
         * Get element width
         * @member BaseElement
         * @returns {*}
         */
        getWidth: function getWidth() {
            return this.$.outerWidth(true);
        },

        /**
         * Set element width
         * @member BaseElement
         * @param {String|Number} width
         * @returns {Number}
         */
        setWidth: function setWidth(width) {
            this.$.css({
                width: width
            });

            return this.getWidth();
        },

        /**
         * Get element height
         * @member BaseElement
         * @returns {*}
         */
        getHeight: function getHeight() {
            return this.$.outerHeight(true);
        },

        /**
         * Set element height
         * @member BaseElement
         * @param {String|Number} height
         * @returns {Number}
         */
        setHeight: function setHeight(height) {
            this.$.css({
                height: height
            });

            return this.getHeight();
        },

        /**
         * Get CSS attribute
         * @member BaseElement
         * @param {String} value
         * @returns {Number}
         */
        getCSS: function getCSS(value) {
            return this.base.lib.number.str2float(
                this.$.css(value)
            );
        },

        /**
         * Get z-index
         * @member BaseElement
         * @returns {Number}
         */
        getZIndex: function getZIndex() {
            return this.getCSS('z-index') || 0;
        },

        /**
         * Get padding right
         * @member BaseElement
         * @returns {Number}
         */
        getPaddingRight: function getPaddingRight() {
            return this.getCSS('paddingRight');
        },

        /**
         * Get padding left
         * @member BaseElement
         * @returns {Number}
         */
        getPaddingLeft: function getPaddingLeft() {
            return this.getCSS('paddingLeft');
        },

        /**
         * Get pudding top
         * @member BaseElement
         * @returns {Number}
         */
        getPaddingTop: function getPaddingTop() {
            return this.getCSS('paddingTop');
        },

        /**
         * Get padding bottom
         * @member BaseElement
         * @returns {Number}
         */
        getPaddingBottom: function getPaddingBottom() {
            return this.getCSS('paddingBottom');
        },

        /**
         * Get margin right
         * @member BaseElement
         * @returns {Number}
         */
        getMarginRight: function getMarginRight() {
            return this.getCSS('marginRight');
        },

        /**
         * Get margin left
         * @member BaseElement
         * @returns {Number}
         */
        getMarginLeft: function getMarginLeft() {
            return this.getCSS('marginLeft');
        },

        /**
         * Get margin top
         * @member BaseElement
         * @returns {Number}
         */
        getMarginTop: function getMarginTop() {
            return this.getCSS('marginTop');
        },

        /**
         * Get margin bottom
         * @member BaseElement
         * @returns {Number}
         */
        getMarginBottom: function getMarginBottom() {
            return this.getCSS('marginBottom');
        },

        /**
         * Get left delta
         * @member BaseElement
         * @returns {Number}
         */
        getLeftDelta: function getLeftDelta() {
            return this.getPaddingLeft() + this.getMarginLeft();
        },

        /**
         * Get top delta
         * @member BaseElement
         * @returns {Number}
         */
        getTopDelta: function getTopDelta() {
            return this.getPaddingTop() + this.getMarginTop();
        },

        /**
         * Locate element
         * @member BaseElement
         */
        locate: function locate() {

            this.$.hasClass('shadow') ?
                this.$.removeClass('shadow') :
                this.$.addClass('shadow');
        },

        /**
         * Get $items
         * @member BaseElement
         * @returns {*|jQuery|HTMLElement}
         */
        get$items: function get$items() {

            /**
             * Define scope;
             */
            var scope = this.view.scope;

            /**
             * Get item
             * @type {*}
             */
            var item = scope.controller.getCurrentItem();

            /**
             * Get item constructor name
             * @type {string}
             */
            var cname = item.constructor.name.toLowerCase();

            return $('.' + cname, this.$);
        },

        /**
         * Set html
         * @member BaseElement
         * @param html
         * @param [$container]
         * @returns {boolean}
         */
        setHtml: function setHtml(html, $container) {

            if (!this.$) {
                return false;
            }

            $container ? $container.html(html) : this.$.html(html);
        },

        /**
         * Set text
         * @member BaseElement
         * @param {string} text
         * @param [$container]
         * @returns {boolean}
         */
        setText: function setText(text, $container) {

            if (!this.$) {
                return false;
            }

            $container ? $container.text(text) : this.$.text(text);
        },

        /**
         * Set title
         * @member BaseElement
         * @param {string} title
         */
        setTitle: function setTitle(title) {

            if (!this.$) {
                return false;
            }

            this.$.attr({
                title: title
            });
        },

        /**
         * Unbind element
         * @member BaseElement
         * @returns {BaseElement}
         */
        unbindElement: function unbindElement() {

            if (this.$) {
                this.$.find('*').off();
                this.$.off();
            }

            return this;
        },

        /**
         * Add scroll cover
         * @member BaseElement
         * @param $container
         */
        scrollCover: function scrollCover($container) {

            if ($('.scroll-cover', $container).length === 0) {

                $('<div class="scroll-cover" />').
                    appendTo($container).append(
                    this.$,
                    '<div class="clear" />'
                );
            }
        },

        /**
         * Adopt modal dialog position on content config
         * @member BaseElement
         */
        adoptModalDialogPosition: function adoptModalDialogPosition() {

            var scope = this.view.scope,
                referrer = scope.referrer,
                $modal;

            /**
             * Get modal dialog
             * @type {ModalElement}
             */
            $modal = referrer ?
                referrer.view.elements.$modal :
                scope.view.elements.$modal;

            if ($modal) {

                $modal.setPosition({
                    $container: $modal.$container,
                    $item: $modal.$,
                    position: $modal.position
                });
            }
        }

    }, AntHill.prototype, Renderer.prototype);
});