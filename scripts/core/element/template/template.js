/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 2/3/13
 * Time: 12:04 AM
 */

define([
    'modules/base',
    'modules/element'
], function defineTemplate(Base, BaseElement) {

    var Template = function Template(view, opts) {

        return this.config(view, opts).build({
            $container: opts.$container,
            destroy: false
        });
    };

    return Template.extend({
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