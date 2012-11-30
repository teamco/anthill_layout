/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:12 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/base',
    'modules/element'
], function defineContent(Base, BaseElement) {

    var Content = function Content(view, opts) {

        return this.config(view, opts).create({
            $container: opts.$container,
            destroy: true
        });
    };

    return Content.extend({
        config: function config(view, opts) {
            this.view = view;
            this.style = opts.style;
            this.id = this.renderUUID(opts.id);
            this.$ = $('<div />').attr({
                id: opts.id
            }).addClass(this.getStyle());

            return this;
        }

    }, Base, BaseElement.prototype);
});