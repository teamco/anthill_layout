/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element'
], function defineSitePreferencesElement(BaseElement) {

    /**
     * Define SitePreferences Element
     * @param view
     * @param opts
     * @returns {SitePreferencesElement}
     * @constructor
     * @class SitePreferencesElement
     * @extends BaseElement
     */
    var SitePreferencesElement = function SitePreferencesElement(view, opts) {

        this._config(view, opts, $('<ul />')).build({
            $container: opts.$container,
            destroy: false
        });

        this.addCSS('site.preferences');

        return this;
    };

    return SitePreferencesElement.extend('SitePreferencesElement', {

        /**
         * Get footer html
         * @member SitePreferencesElement
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