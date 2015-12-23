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
            return [
                '<ul class="nav"><li><a href="#"><i class="glyphicon {icon}"></i>',
                '<span class="nav-label">{titlebare}</span>',
                '<span class="fa arrow"></span></a>',
                '<ul class="nav nav-second-level collapse"></ul></li></ul>'
            ].join('');
        },

        /**
         * Define content container
         * @memberOf BarElement
         * @returns {*}
         */
        getContentContainer: function getContentContainer() {
            return this.$.find('.nav-second-level');
        }

    }, BaseElement.prototype);
});