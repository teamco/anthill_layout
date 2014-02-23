/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/18/12
 * Time: 8:22 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'element/modal.element'
], function defineBaseView(Modal) {

    var BaseView = function BaseView() {

    };

    return BaseView.extend({
        getConfigHTML: function getConfigHTML(key) {
            var html = this.scope.model.getConfig('html');
            if (anthill.base.isDefined(key)) {
                return html[key];
            }
            return html;
        },
        createStyle: function createStyle() {
            return [
                this.getContainerClassName(),
                this.getConfigHTML('style')
            ].join(' ');
        },
        createUUID: function createUUID() {
            return [
                this.scope.model.getUUID(),
                this.getContainerClassName()
            ].join('-');
        },
        renderUUID: function renderUUID(id) {
            return id || (anthill.base.lib.generator.UUID() +
                this.constructor.name.toDash());
        },
        getContainerClassName: function getContainerClassName() {
            return this.getConfigHTML().selector.replace(/\./, '');
        },
        getContainerSelector: function getContainerSelector() {
            var html = this.getConfigHTML();
            return $(html.container).children([
                '.', this.getContainerClassName(), 's'
            ].join(''));
        },
        header: function header(Header, $container) {
            this.elements.$header = new Header(this, {
                style: this.scope.constructor.name.toLowerCase() + '-header',
                $container: $container.$
            });
        },
        footer: function footer(Footer, $container) {
            this.elements.$footer = new Footer(this, {
                style: this.scope.constructor.name.toLowerCase() + '-footer',
                $container: $container.$
            });
        },

        /**
         * Generic modal dialog window
         * @param {{
         *      [style]: String,
         *      [cover]: Boolean,
         *      [opacityOff]: Number,
         *      [opacityOn]: Number,
         *      [title]: String,
         *      [type]: String ('info', 'success', 'warning', 'error'),
         *      [position]: String ('tl/tc/tr', 'cl/cc/cr'. 'bl/bc/br'),
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
        modalDialog: function modalDialog(opts) {
            this.elements.$modal = new Modal(this, {
                style: opts.style,
                $container: opts.$container,
                cover: opts.cover,
                coverOpacity: opts.coverOpacity,
                autoclose: opts.autoclose,
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
         * Generic button
         * @param {*} Button
         * @param {*} opts
         * @param {*} store
         */
        button: function button(Button, opts, store) {
            $.each(anthill.base.define(opts, {}, true), function each(i, button) {
                store[i] = new Button(this, {
                    $container: button.$container,
                    style: i.toDash(),
                    text: button.text,
                    events: button.events
                });
            }.bind(this));
        },

        /**
         * Define cover
         * @param Cover
         * @param opts
         * @returns {Cover}
         */
        cover: function cover(Cover, opts) {
            return new Cover(this, {
                $container: opts.$container,
                style: opts.style,
                opacity: opts.opacity,
                events: opts.events
            });
        }
    });
});