/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:12 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Element'
], function defineApplicationElement(BaseElement) {

    /**
     * Define Application element
     * @extends BaseElement
     * @class ApplicationElement
     * @param view
     * @param opts
     * @returns {*}
     * @constructor
     */
    var ApplicationElement = function ApplicationElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        $(opts.$container).addClass(opts.mode);

        return this;
    };

    return ApplicationElement.extend('ApplicationElement', {

        /**
         * Update uuid after loading
         * @memberOf ApplicationElement
         */
        updateUUID: function updateUUID() {
            this.$.attr({
                id: this.view.createUUID()
            })
        },

        /**
         * Hide/Show scroll
         * @memberOf ApplicationElement
         * @param {boolean} hide
         */
        hideScroll: function hideScroll(hide) {
            this.$[(hide ? 'add' : 'remove') + 'Class']('overflow-scroll');
        }

    }, BaseElement.prototype);
});