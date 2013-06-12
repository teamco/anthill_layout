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

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.setContent();

        return this;
    };

    return Content.extend({
        setContent: function setContent() {
            this.$.text(this.view.scope.model.getUUID());
        }


    }, Base, BaseElement.prototype);
});