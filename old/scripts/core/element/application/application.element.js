/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:12 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/element'
], function defineAppElement(BaseElement) {

    /**
     * Define App element
     * @extends BaseElement
     * @class AppElement
     * @param view
     * @param opts
     * @returns {*}
     * @constructor
     */
    var AppElement = function AppElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        $(opts.$container).addClass(opts.mode);

        return this;
    };

    return AppElement.extend('AppElement', {

        /**
         * Update uuid after loading
         * @member AppElement
         */
        updateUUID: function updateUUID() {
            this.$.attr({
                id: this.view.createUUID()
            })
        }

    }, BaseElement.prototype);
});