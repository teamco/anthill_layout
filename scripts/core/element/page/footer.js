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
], function defineFooter(Base, BaseElement) {

    var Footer = function Footer(view, opts) {

        if (!view.scope.config.html.footer) {
            return false;
        }

        return this.config(view, opts).create({
            $container: opts.$container,
            destroy: true
        });
    };

    return Footer.extend({
        config: function config(view, opts) {
            this.view = view;
            this.style = opts.style;
            this.id = this.renderUUID(opts.id);
            this.$ = $('<div />').attr({
                id: opts.id
            }).addClass(this.style);

            return this;
        }

    }, Base, BaseElement.prototype);
});