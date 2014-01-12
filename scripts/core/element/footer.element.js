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

        if (!view.getConfigHTML('footer')) {
            return this;
        }

        return this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });
    };

    return Footer.extend({

    }, Base, BaseElement.prototype);
});