/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element'
], function defineBarElement(BaseElement) {

    /**
     * Define Bar Element
     * @param view
     * @param opts
     * @returns {BarElement}
     * @constructor
     * @class BarElement
     * @extends BaseElement
     */
    var BarElement = function BarElement(view, opts) {

        this._config(view, opts, $(this.getTemplate())).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('bar');

        return this;
    };

    return BarElement.extend('BarElement', {

        /**
         * Define template
         * @memberOf BarElement
         * @returns {string}
         */
        getTemplate: function getTemplate() {
            return '<ul class="nav" />';
        },

        /**
         * Define content container
         * @memberOf BarElement
         * @returns {*}
         */
        getContentContainer: function getContentContainer() {
            return this.$.find('.nav');
        }

    }, BaseElement.prototype);
});