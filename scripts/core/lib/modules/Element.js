/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:12 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'jquery',
    'modules/base'
], function defineBaseElement($, Base) {

    var BaseElement = function BaseElement() {

    };

    return BaseElement.extend({
        /**
         * Generate element UUID
         * @param {String} id
         * @returns {*|String}
         */
        renderUUID: function renderUUID(id) {
            return id || (this.base.lib.generator.UUID() +
                this.constructor.getConstructorName().toDash());
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
                    scope.eventmanager.onEvent($element, event, index);
                }
            );
        },
        /**
         * Destroy element before create
         * @param {Boolean} destroy
         */
        destroyB4Create: function destroyB4Create(destroy) {
            var $container = this.$container;

            function destroyElement($element) {
                if ($element.length > 0) {
                    this.view.scope.logger.warn(
                        this.constructor.getConstructorName(),
                        'Element will overwritten'
                    );
                    $element.remove();
                }
            }

            destroyElement.bind(this)($container.find('#' + this.id));

            if (this.base.defineBoolean(destroy, false, true)) {
                destroyElement.bind(this)($container.find('.' + this.style));
            }
        },
        /**
         * Build element
         * @param {{$container, [append], destroy, [callback]}} opts
         * @returns {*}
         */
        build: function build(opts) {
            var base = this.base;
            opts = base.define(opts, {}, true);

            var append = base.defineBoolean(opts.append, true, true);
            if (this.$ !== false) {
                this.$container = $(opts.$container);
                this.destroyB4Create(opts.destroy);
                if (append) {
                    this.$.appendTo(opts.$container);
                } else {
                    this.$.prependTo(opts.$container);
                }
                if (base.isFunction(opts.callback)) {
                    opts.callback();
                }
            }

            this.bindEvents();

            return this;
        },
        /**
         * Destroy element
         * @returns {*}
         */
        destroy: function destroy() {
            if (this.$) {
                this.$.unbind().remove();
            }
            return this;
        },
        /**
         * Hide element
         * @returns {*}
         */
        hide: function hide() {
            return this.$.hide();
        },
        /**
         * Clear element internal HTML
         * @returns {*|Boolean}
         */
        empty: function empty() {
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
            var config = this.view.scope.config,
                items = 1;
            if (config.parent && config.html.stretch) {
                items = this.base.lib.hash.hashLength(config.parent.items);
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
            return this.base.lib.number.str2int(this.$.css(value));
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
        }

    }, Base);
})
;