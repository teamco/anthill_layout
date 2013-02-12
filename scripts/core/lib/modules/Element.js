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
], function defineBaseElement(jQuery, Base) {

    var BaseElement = function BaseElement() {

    };

    return BaseElement.extend({
        renderUUID: function renderUUID(id) {
            return id || (this.base.lib.generator.UUID() +
                this.constructor.getConstructorName().toDash());
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
                this.$container = jQuery($container);
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
                items = 1, index, item, $element;
            if (config.parent && config.html.stretch) {
                items = this.base.lib.hash.hashLength(config.parent.items);
                if (items > 1) {
                    this.$.parent().css({
                        width: items * 100 + '%'
                    });
                    for (index in config.parent.items) {
                        if (config.parent.items.hasOwnProperty(index)) {
                            item = config.parent.items[index];
                            $element = '$' + item.constructor.getConstructorName().toLowerCase();
                            if (item.view.elements.hasOwnProperty($element)) {
                                item.view.elements[$element].$.css({
                                    width: 100 / items + '%'
                                });
                            }
                        }
                    }
                }
            }

            return this;
        }

    }, Base);
})
;