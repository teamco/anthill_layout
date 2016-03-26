/**
 * Created with RubyMine.
 * User: teamco
 * Date: 7/23/14
 * Time: 8:50 PM
 */

define([
    'plugins/preferences/preferences',
    'plugins/preferences/site.preferences/meta.data',
    'plugins/preferences/site.preferences/site.width',
    'plugins/preferences/site.preferences/google.analytics',
    'plugins/preferences/site.preferences/snap.engage'
], function defineSitePreferences(BasePreferencesElement, SiteConfigMetaDataPreferences, SiteConfigWidthPreferences, SiteConfigGoogleAnalyticsPreferences, SiteConfigSnapEngagePreferences) {

    /**
     * Define prefs
     * @class SitePreferences
     * @extends Renderer
     * @extends BasePreferencesElement
     * @extends SiteConfigMetaDataPreferences
     * @extends SiteConfigWidthPreferences
     * @extends SiteConfigGoogleAnalyticsPreferences
     * @extends SiteConfigSnapEngagePreferences
     * @constructor
     */
    var SitePreferences = function SitePreferences() {
    };

    return SitePreferences.extend(
        'SitePreferences', {

            /**
             * Get preferences HTML
             * @memberOf SitePreferences
             * @param {Array} map
             * @return Array
             */
            getPreferencesHtml: function getPreferencesHtml(map) {

                var $tabs = this.renderTabs(),
                    $container = this.renderTabItemsContent(),
                    text = 'Meta Data';

                this.$.append($tabs, $container);

                this.addTabItem($tabs, {
                    uuid: 'meta_data',
                    text: text,
                    $container: $container,
                    content: $('<ul class="default" />').append(
                        this.setSiteTitle(),
                        this.setSiteMetaAuthor(),
                        this.setSiteMetaDescription(),
                        this.setSiteMetaKeywords()
                    )
                }, true);

                text = 'Site Width';
                this.addTabItem($tabs, {
                    uuid: 'width_slider',
                    text: text,
                    $container: $container,
                    content: this.siteWidthSlider(map)
                }, false);

                text = 'Plugins';
                this.addTabItem($tabs, {
                    uuid: 'plugins',
                    text: text,
                    $container: $container,
                    content: this.thirdPartyPlugins()
                }, false);
            },

            /**
             * Render third party plugins
             * @memberOf SitePreferences
             * @returns {*|jQuery}
             */
            thirdPartyPlugins: function thirdPartyPlugins() {

                function _showPluginConfig(e) {

                }

                /**
                 * Define plugins array
                 * @type {{googleAnalytics, snapEngage}}
                 */
                var plugins = {
                    googleAnalytics: {
                        name: 'Google Analytics',
                        renderer: this.googleAnalytics()
                    },
                    snapEngage: {
                        name: 'SnapEngage',
                        renderer: this.snapEngage()
                    }
                };

                // Define list
                var pluginList = [];

                for (var index in plugins) {
                    if (plugins.hasOwnProperty(index)) {
                        pluginList.push({
                            type: 'text',
                            value: plugins[index].name
                        });
                    }
                }

                var $combo = this.renderCombobox(
                    pluginList,
                    pluginList[0].value,
                    'Plugins',
                    'pluginConfig', {
                        type: 'click.showPluginConfig',
                        callback: _showPluginConfig
                    },
                    true
                );

                return [
                    $combo,
                    plugins.googleAnalytics.renderer
                ];
            }
        },
        BasePreferencesElement.prototype,
        SiteConfigMetaDataPreferences.prototype,
        SiteConfigWidthPreferences.prototype,
        SiteConfigGoogleAnalyticsPreferences.prototype,
        SiteConfigSnapEngagePreferences.prototype
    );
});