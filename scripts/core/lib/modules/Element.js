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
        create: function create($, $container, append, callback) {
            var base = this.base;
            if ($ !== false) {
                append = base.defineBoolean(append, true, true);
                this.$container = jQuery($container);
                if (append) {
                    $.appendTo($container);
                } else {
                    $.prependTo($container);
                }
                if (base.isFunction(callback)) {
                    callback();
                }
            }
            return this;
        },

        iFrameFix: function iFrameFix() {
            // Firefox destroy iframe workaround
            if (jQuery.browser.mozilla) {
                var iframes = this.$.find('iframe'),
                    l = iframes.length, i = 0;
                for (i; i < l; i+=1) {
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
});