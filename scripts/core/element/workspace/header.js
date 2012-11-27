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
], function defineHeader(Base, BaseElement) {

    var Header = function Header(view, opts) {

        if (!view.scope.config.html.header) {
            return false;
        }

        this.config(view, opts);

        return this.create({
            $container: opts.$container,
            destroy: true
        });
    };

    return Header.extend({
        config: function config(view, opts) {
            this.view = view;
            this.style = opts.style;
            this.id = opts.id;
            this.$ = $('<div />').attr({
                id: this.id
            }).addClass(this.style);
        }

    }, Base, BaseElement.prototype);
});