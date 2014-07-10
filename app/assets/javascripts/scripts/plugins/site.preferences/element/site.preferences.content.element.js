/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element'
], function defineSitePreferencesContentElement(BaseElement) {

    /**
     * Define SitePreferences Content Element
     * @constructor
     * @class SitePreferencesContentElement
     * @extends BaseElement
     * @param view
     * @param opts
     * @returns {SitePreferencesContentElement}
     */
    var SitePreferencesContentElement = function SitePreferencesContentElement(view, opts) {

        this._config(view, opts, $('<li />')).build({
            $container: opts.$container,
            destroy: false
        });

        this.setAttributes(opts.data);
        this.showContentPreferences(opts.data);

        return this;
    };

    return SitePreferencesContentElement.extend('SitePreferencesContentElement', {

        /**
         * Set item attributes
         * @member SitePreferencesContentElement
         * @param data
         */
        setAttributes: function setAttributes(data) {

            this.renderTooltip({
                title: data.title,
                description: data.description,
                $container: this
            });
        },

        /**
         * Show content preferences
         * @member SitePreferencesContentElement
         * @param data
         */
        showContentPreferences: function showContentPreferences(data) {

            /**
             * Define scope
             * @type {SitePreferences}
             */
            var scope = this.view.scope;

            /**
             * Click prefs
             * @private
             * @param e
             */
            function _clickPreferences(e) {
                scope.observer.publish(
                    scope.eventmanager.eventList.loadPreferences,
                    data
                );
            }

            this.$.off('click.preferences').on(
                'click.preferences',
                _clickPreferences.bind(this)
            );
        }

    }, BaseElement.prototype);

});