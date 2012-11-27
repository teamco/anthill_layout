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
], function definePageContainer(Base, BaseElement) {

    var PageContainer = function PageContainer(view, opts) {

        this.config(view, opts);

        return this.create({
            $container: opts.$container,
            destroy: true
        });
    };

    return PageContainer.extend({
        config: function config(view, opts) {
            this.view = view;
            this.style = opts.style;
            this.id = this.renderUUID(opts.id);
            this.$ = $('<ul />').attr({
                id: opts.id
            }).addClass(this.style);
        }

    }, Base, BaseElement.prototype);
});