/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/element'
], function defineButtonElement(BaseElement) {

    /**
     * Define Button Element
     * @param view
     * @param opts
     * @returns {ButtonElement}
     * @constructor
     * @class ButtonElement
     */
    var ButtonElement = function ButtonElement(view, opts) {

        this.setup(opts);

        this._config(view, opts, $('<li />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.setContent();

        return this;

    };

    return ButtonElement.extend({

        /**
         * Define setup
         * @param opts
         */
        setup: function setup(opts) {
            this.text = opts.text;
        },

        setContent: function setContent() {
            this.setText();
        },

        setText: function setText() {
            this.$.text(this.text);
        }

    }, BaseElement.prototype);

});