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

        return this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: false
        });
    };

    return Template.extend({

    }, Base, BaseElement.prototype);
});