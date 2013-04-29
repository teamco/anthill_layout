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
            return this;
        }

        return this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });
    };

    return Header.extend({

    }, Base, BaseElement.prototype);
});