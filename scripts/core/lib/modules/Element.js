/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:12 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'config/anthill',
    'modules/renderer'
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
         * @memberOf BaseElement
         */
        pluginPath: '../../scripts/plugins',

        /**
         * Element config before build
         * @memberOf BaseElement
         * @param {{createStyle: Function, renderUUID: Function}} view
         * @param {{style: String, id: String, [css], [events], [opacity]}} opts
         * @param $html
         * @returns {*}
         * @private
         */
        _config: function _config(view, opts, $html) {

            /**
             * Define view
             * @memberOf BaseElement
             * @type {{createStyle: Function, renderUUID: Function}}
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
         * Centralize element into container
         * @memberOf BaseElement
         * @param {{$container, $item, css, position: String}} opts
         * Position options:
         *      ['tl' 'tc' 'tr']
         *      ['cl' 'cc' 'cr']
         *      ['bl' 'bc' 'br']
         * @returns {opts.$item}
         */
        setPosition: function setPosition(opts) {

            var cWidth = opts.$container.outerWidth(),
                cHeight = opts.$container.outerHeight(),
                $item = opts.$item,
                eWidth = $item.outerWidth(),
                eHeight = $item.outerHeight();

            var top = 'auto',
                left = 'auto',
                mw = cWidth - eWidth,
                cw = mw / 2,
                mh = cHeight - eHeight,
                ch = mh / 2;

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
         * @memberOf BaseElement
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

            destroyElement.bind(this)($('#' + this.id, $container));

            if (this.base.defineBoolean(destroy, false, true)) {

                destroyElement.bind(this)(
                    $('.' + this.style, $container)
                );
            }
        },

        /**
         * Build element
         * @memberOf BaseElement
         * @param {{$container, [append], destroy, [callback]}} opts
         * @returns {*}
         */
        build: function build(opts) {

            /**
             * Define base instance
             * @type {Base}
             */
            var base = this.base;

            opts = base.define(opts, {}, true);

            /**
             * Define append/prepend
             */
            var append = base.defineBoolean(opts.append, true, true);

            if (this.$) {

                this.$container = $(opts.$container);
                this.destroyB4Create(opts.destroy);

                this.$[append ? 'appendTo' : 'prependTo'](opts.$container);

                if (base.isFunction(opts.callback)) {
                    opts.callback();
                }
            }

            this.bindEvents();

            return this;
        },

        /**
         * Dynamic CSS
         * @memberOf BaseElement
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

            /**
             * Define defaults
             * @type {{type: string, rel: string, media: string}}
             */
            var defaults = {
                type: 'text/css',
                rel: 'stylesheet',
                media: 'all'
            };

            opts = this.base.define(opts, {}, true);

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
            link.href = this.pluginPath + (opts.resource || '') + url;
            link.id = uuid;

            document.getElementsByTagName("head")[0].appendChild(link);

            /**
             * Define css link instance
             * @type {*|jQuery|HTMLElement}
             */
            this.linkCSS = $('#' + uuid);
        },

        /**
         * Destroy element
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
         * @returns {*}
         */
        hide: function hide() {
            this.view.scope.logger.debug('Hide element');
            return this.$.hide();
        },

        /**
         * Clear element internal HTML
         * @returns {*|Boolean}
         */
        empty: function empty() {
            this.view.scope.logger.debug('Clear inner html of the element');
            return this.$.empty();
        },

        /**
         * Fade in effect
         * @returns {*}
         */
        fadeIn: function fadeIn() {
            return this.$.stop(true, true).fadeIn();
        },

        /**
         * Fade out effect
         * @returns {*}
         */
        fadeOut: function fadeOut() {
            return this.$.stop(true, true).fadeOut();
        },

        /**
         * Show element
         * @returns {*}
         */
        show: function show() {
            return this.$.show();
        },

        /**
         * Remove element inline style
         */
        removeStyle: function removeStyle() {
            this.$.attr({
                style: ''
            });
        },

        /**
         * Stretch element in parent container
         * @returns {*}
         */
        stretch: function stretch() {
            var scope = this.view.scope,
                items = 1;
            if (scope.controller.getContainment() && scope.config.html.stretch) {
                items = this.base.lib.hash.hashLength(
                    scope.controller.getContainment().items
                );

                if (items > 1) {
                    this.$.css({
                        left: (items - 1) * 100 + '%'
                    });
                }
            }

            return this;
        },

        /**
         * Get root container
         * @returns {*|HTMLElement}
         */
        getRootContainer: function getRootContainer() {
            return $(this.view.scope.controller.root().config.html.container);
        },

        /**
         * Set element opacity
         * @param {Number} opacity
         */
        setOpacity: function setOpacity(opacity) {
            this.$.css({
                opacity: opacity
            });
        },

        /**
         * Get position
         * @returns {{top, left}}
         */
        getPosition: function getPosition() {
            return this.$.position();
        },
        /**
         * Get offset
         * @returns {{top, left}}
         */
        getOffset: function getOffset() {
            return this.$.offset();
        },

        /**
         * Get element width
         * @returns {*}
         */
        getWidth: function getWidth() {
            return this.$.width();
        },

        /**
         * Set element width
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
         * @returns {*}
         */
        getHeight: function getHeight() {
            return this.$.height();
        },

        /**
         * Set element height
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
         * @param {String} value
         * @returns {Number}
         */
        getCSS: function getCSS(value) {
            return this.base.lib.number.str2float(this.$.css(value));
        },

        /**
         * Get padding right
         * @returns {Number}
         */
        getPaddingRight: function getPaddingRight() {
            return this.getCSS('paddingRight');
        },

        /**
         * Get padding left
         * @returns {Number}
         */
        getPaddingLeft: function getPaddingLeft() {
            return this.getCSS('paddingLeft');
        },

        /**
         * Get pudding top
         * @returns {Number}
         */
        getPaddingTop: function getPaddingTop() {
            return this.getCSS('paddingTop');
        },

        /**
         * Get padding bottom
         * @returns {Number}
         */
        getPaddingBottom: function getPaddingBottom() {
            return this.getCSS('paddingBottom');
        },

        /**
         * Get margin right
         * @returns {Number}
         */
        getMarginRight: function getMarginRight() {
            return this.getCSS('marginRight');
        },

        /**
         * Get margin left
         * @returns {Number}
         */
        getMarginLeft: function getMarginLeft() {
            return this.getCSS('marginLeft');
        },

        /**
         * Get margin top
         * @returns {Number}
         */
        getMarginTop: function getMarginTop() {
            return this.getCSS('marginTop');
        },

        /**
         * Get margin bottom
         * @returns {Number}
         */
        getMarginBottom: function getMarginBottom() {
            return this.getCSS('marginBottom');
        },

        /**
         * Get left delta
         * @returns {Number}
         */
        getLeftDelta: function getLeftDelta() {
            return this.getPaddingLeft() + this.getMarginLeft();
        },

        /**
         * Get top delta
         * @returns {Number}
         */
        getTopDelta: function getTopDelta() {
            return this.getPaddingTop() + this.getMarginTop();
        },

        locate: function locate() {

            this.$.hasClass('shadow') ?
                this.$.removeClass('shadow') :
                this.$.addClass('shadow');
        },

        /**
         * Get $items
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

            return $('.' + cname + ' > .content > div', this.$);
        },

        /**
         * Show items content
         */
        showItemsContent: function showItemsContent() {
            this.get$items().show();
        },

        /**
         * Hide items content
         * @param [item]
         */
        hideItemsContent: function hideItemsContent(item) {

            /**
             * Get $items
             * @type {*|jQuery|HTMLElement}
             */
            var $items = this.get$items();

            if (this.base.isDefined(item)) {

                /**
                 * Filter all items except itself
                 */
                $items = $items.filter(function filter(index){
                    return this.parentNode.parentNode.id !== item.id;
                });
            }

            $items.hide();
        }

    }, AntHill.prototype, Renderer.prototype);
});