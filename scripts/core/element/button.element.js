/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/base',
    'modules/element'
], function defineButton(Base, BaseElement) {

    var Button = function Button(view, opts) {

        this.setup(opts);

        this._config(view, opts, $('<li />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.setContent();

        return this;

    };

    return Button.extend({

        setup: function setup(opts) {
            this.text = opts.text;
        },

        setContent: function setContent() {
            this.setText();
        },

        setText: function setText() {
            this.$.text(this.text);
        }

    }, Base, BaseElement.prototype);

});