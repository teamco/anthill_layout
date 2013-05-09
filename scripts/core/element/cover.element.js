/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/base',
    'modules/element'
], function defineCover(Base, BaseElement) {

    var Cover = function Cover(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        }).$.css({
                opacity: opts.opacity || 0.6
            }).addClass('cover');

        return this;
    };

    return Cover.extend({

    }, Base, BaseElement.prototype);

});