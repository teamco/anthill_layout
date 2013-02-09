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

        if (!view.getConfigHTML().header) {
            return false;
        }

        return this.config(view, opts).build({
            $container: opts.$container,
            destroy: true
        });
    };

    return Header.extend({
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