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
], function defineWrapper(Base, BaseElement) {

    var Wrapper = function Wrapper(opts) {
        return this.initElement(opts);
    };

    return Wrapper.extend({
        initElement: function initElement(opts) {
            this.style = opts.style;
            this.id = opts.id;
            this.$ = $('<div />').attr({
                id: this.id
            }).addClass(this.style);
            return this.create(this.$, opts.$container);
        }

    }, Base, BaseElement.prototype);
});