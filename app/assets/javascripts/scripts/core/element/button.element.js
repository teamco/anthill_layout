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
     * @type {Function}
     */
    var ButtonElement = function ButtonElement(view, opts) {

        this.setup(opts);

        this._config(view, opts, this.base.define(opts.$htmlElement, $('<li />'), true)).build({
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
         * @memberOf ButtonElement
         * @param opts
         */
        setup: function setup(opts) {

            /**
             * Define text
             * @property ButtonElement
             */
            this.text = opts.text;
        },

        /**
         * Set content
         * @memberOf ButtonElement
         */
        setContent: function setContent() {
            this.setText(this.text);
        },

        /**
         * Define disable
         * @memberOf ButtonElement
         */
        disable: function disable() {

            this.$.addClass('disabled');

            /**
             * Define disabled
             * @property ButtonElement
             */
            this.disabled = true;
        },

        /**
         * Define enable
         * @memberOf ButtonElement
         */
        enable: function enable() {

            this.$.removeClass('disabled');

            /**
             * Define disabled
             * @property ButtonElement
             */
            this.disabled = false;
        },

        /**
         * Define after events callback
         * @memberOf ButtonElement
         * @param {n.Event} e
         */
        afterEventsCallback: function afterEventsCallback(e) {
            this.view.scope.logger.debug('After events callback', e);
        }

    }, BaseElement.prototype);
});