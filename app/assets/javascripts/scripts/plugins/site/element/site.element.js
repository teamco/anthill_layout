/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element'
], function defineSiteElement(BaseElement) {

    /**
     * Define Site Element
     * @param view
     * @param opts
     * @returns {SiteElement}
     * @constructor
     * @class SiteElement
     * @extends BaseElement
     */
    var SiteElement = function SiteElement(view, opts) {

        this._config(view, opts, $('<ul />')).build({
            $container: opts.$container,
            destroy: false
        });

        this.addCSS('widget.rules');
        this.addCSS('rules');

        return this;
    };

    return SiteElement.extend('SiteElement', {

        /**
         * Get footer html
         * @member SiteElement
         * @returns {*|jQuery}
         */
        getFooter: function getFooter() {
            return $('<div />').text([
                this.base.lib.hash.hashLength({}),
                'items'
            ].join(' '));
        }

    }, BaseElement.prototype);

});