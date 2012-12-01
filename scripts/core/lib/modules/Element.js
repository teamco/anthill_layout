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
        create: function create(opts) {
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

        iFrameFix: function iFrameFix() {
            // Firefox destroy iframe workaround
            if (jQuery.browser.mozilla) {
                var iframes = this.$.find('iframe'),
                    l = iframes.length, i = 0;
                for (i; i < l; i += 1) {
                    try {
                        delete window.frames[jQuery(iframes[i]).attr('id')];
                    } catch (e) {
                        this.scope.logger.error(e);
                    }
                }
            }
        },

        destroy: function destroy() {
            if (this.$) {
                this.iFrameFix();
                this.$.unbind().remove();
            }
            return this;
        },

        hide: function hide() {
            this.$.hide();
            return this;
        },

        empty: function empty() {
            this.$.empty();
            return this;
        },

        fadeIn: function fadeIn() {
            this.$.stop(true, true).fadeIn();
        },

        fadeOut: function fadeOut() {
            this.$.stop(true, true).fadeOut();
        },

        show: function show(opts) {
            var base = this.base;
            opts = App.base.define(opts, {});
            if (this.$[opts.effect] instanceof Function) {
                this.$[opts.effect](
                    base.define(opts.speed, 'slow'),
                    function effectCallback() {
                        // TODO Callback
                    }
                );
            } else {
                this.$.show();
            }
            return this;
        },

        removeStyle: function removeStyle() {
            this.$.attr({
                style: ''
            });
        }

    }, Base);
})
;