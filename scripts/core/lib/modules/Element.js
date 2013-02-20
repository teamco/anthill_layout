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
        renderUUID: function renderUUID(id) {
            return id || (this.base.lib.generator.UUID() +
                this.constructor.getConstructorName().toDash());
        },
        bindEvents: function bindEvents() {
            var scope = this.view.scope,
                controller = scope.controller,
                method;
            this.events = this.base.define(this.events, [], true);
            $.each(this.events, function each(index, event) {
                method = event.toCamel();
                if (!this.base.isDefined(controller[method])) {
                    scope.logger.warn('Undefined method', method);
                    return false;
                }
                this.$.on(event, controller[method].bind(controller));
            }.bind(this));
        },
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

        build: function build(opts) {
            var base = this.base;
            opts = base.define(opts, {}, true);

            var $container = opts.$container,
                append = base.defineBoolean(opts.append, true, true);
            if (this.$ !== false) {
                this.$container = $($container);
                this.destroyB4Create(opts.destroy);
                if (append) {
                    this.$.appendTo($container);
                } else {
                    this.$.prependTo($container);
                }
                if (base.isFunction(opts.callback)) {
                    opts.callback();
                }
            }

            return this;
        },

        destroy: function destroy() {
            if (this.$) {
                this.$.unbind().remove();
            }
            return this;
        },

        hide: function hide() {
            return this.$.hide();
        },

        empty: function empty() {
            return this.$.empty();
        },

        fadeIn: function fadeIn() {
            return this.$.stop(true, true).fadeIn();
        },

        fadeOut: function fadeOut() {
            return this.$.stop(true, true).fadeOut();
        },

        show: function show() {
            return this.$.show();
        },

        removeStyle: function removeStyle() {
            this.$.attr({
                style: ''
            });
        },

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

        getRootContainer: function getRootContainer() {
            return $(this.view.scope.model.root().config.html.container);
        },

        getWidth: function getWidth() {
            return this.$.width();
        },

        setWidth: function setWidth(width) {
            this.$.css({
                width: width
            });

            return this.getWidth();
        },

        getHeight: function getHeight() {
            return this.$.height();
        },

        setHeight: function setHeight(height) {
            this.$.css({
                height: height
            });

            return this.getHeight();
        },

        getCSS: function getCSS(value) {
            return this.base.lib.number.str2int(this.$.css(value));
        },
        getPaddingRight: function getPaddingRight() {
            return this.getCSS('paddingRight');
        },

        getPaddingLeft: function getPaddingLeft() {
            return this.getCSS('paddingLeft');
        },

        getPaddingTop: function getPaddingTop() {
            return this.getCSS('paddingTop');
        },

        getPaddingBottom: function getPaddingBottom() {
            return this.getCSS('paddingBottom');
        },

        getMarginRight: function getMarginRight() {
            return this.getCSS('marginRight');
        },

        getMarginLeft: function getMarginLeft() {
            return this.getCSS('marginLeft');
        },

        getMarginTop: function getMarginTop() {
            return this.getCSS('marginTop');
        },

        getMarginBottom: function getMarginBottom() {
            return this.getCSS('marginBottom');
        }

    }, Base);
})
;