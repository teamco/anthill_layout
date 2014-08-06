/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element'
], function defineButtonElement(BaseElement) {

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
        }

    }, BaseElement.prototype);

});