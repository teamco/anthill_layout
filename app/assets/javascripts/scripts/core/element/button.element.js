/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'jquery',
    'modules/Element'
], function defineButtonElement($, BaseElement) {

    /**
     * Define Button Element
     * @extends BaseElement
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

        this.disabled ?
            this.disable() :
            this.enable();

        return this;
    };

    return ButtonElement.extend('ButtonElement', {

        /**
         * Define setup
         * @member ButtonElement
         * @param opts
         */
        setup: function setup(opts) {
            this.text = opts.text;
        },

        /**
         * Set content
         * @member ButtonElement
         */
        setContent: function setContent() {
            this.setText(this.text);
        },

        /**
         * Define disable
         * @member ButtonElement
         */
        disable: function disable() {
            this.$.addClass('disabled');
            this.$.disabled = true;
        },

        /**
         * Define enable
         * @member ButtonElement
         */
        enable: function enable() {
            this.$.removeClass('disabled');
            this.$.disabled = false;
        }

    }, BaseElement.prototype);

});