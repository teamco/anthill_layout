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
    'services/google.analytics',
    'services/snap.engage',
    'services/raygun.io',
    'services/github.gist',
    'services/inject.script',
    'services/bigmir.net',
    'services/yahoo.flurry',
    'services/rollbar.notifier',
    'services/rapid.engage'
], function defineSitePreferences(BasePreferencesElement, SiteConfigMetaDataPreferences, SiteConfigWidthPreferences, GoogleAnalyticsPreferences, SnapEngagePreferences, RaygunIOPreferences, GithubGistPreferences, InjectScriptPreferences, BigmirNetPreferences, YahooFlurryPreferences, RollbarNotifierPreferences, RapidEngagePreferences) {

    /**
     * Define prefs
     * @class SitePreferences
     * @extends Renderer
     * @extends BasePreferencesElement
     * @extends SiteConfigMetaDataPreferences
     * @extends SiteConfigWidthPreferences
     * @extends GoogleAnalyticsPreferences
     * @extends SnapEngagePreferences
     * @extends RaygunIOPreferences
     * @extends GithubGistPreferences
     * @extends InjectScriptPreferences
     * @extends BigmirNetPreferences
     * @extends YahooFlurryPreferences
     * @extends RollbarNotifierPreferences
     * @extends RapidEngagePreferences
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

                /**
                 * Get scope
                 * @type {SiteConfig}
                 */
                var scope = this.view.scope;

                /**
                 * Define toggle plugin
                 * @param index
                 * @private
                 */
                function _showPluginConfig(index) {

                    var $container = $('.plugin-wrapper'),
                        plugin = plugins.find(function _findPlugin(o) {
                            return o.value === index;
                        });

                    if (!plugin) {
                        scope.logger.warn('Unable to detect plugin renderer', plugin, index);
                        return false;
                    }

                    $container.fadeOut(function _fadeOutPlugin() {
                        $container.html('').fadeIn().append(
                            plugin.renderer
                        );
                    });
                }

                /**
                 * Define plugins array
                 * @type {*[]}
                 */
                var plugins = [
                    {
                        type: 'text',
                        value: 'Google Analytics',
                        renderer: this.renderGoogleAnalytics()
                    },
                    {
                        type: 'text',
                        value: 'RaygunIO',
                        renderer: this.renderRaygunIO()
                    },
                    {
                        type: 'text',
                        value: 'SnapEngage',
                        renderer: this.renderSnapEngage()
                    },
                    {
                        type: 'text',
                        value: 'GitHub Gist',
                        renderer: this.renderGithubGist()
                    },
                    {
                        type: 'text',
                        value: 'Inject Script',
                        renderer: this.renderInjectScript()
                    },
                    {
                        type: 'text',
                        value: 'Bigmir.net',
                        renderer: this.renderBigmirNet()
                    },
                    {
                        type: 'text',
                        value: 'Yahoo Flurry',
                        renderer: this.renderYahooFlurry()
                    },
                    {
                        type: 'text',
                        value: 'Rollbar Notifier',
                        renderer: this.renderRollbarNotifier()
                    },
                    {
                        type: 'text',
                        value: 'RapidEngage',
                        renderer: this.renderRapidEngage()
                    }
                ];

                var defaultValue = plugins[0].value;

                var text = 'Plugins';
                var $combo = this.renderCombobox(
                    plugins.sortByValue('value', 'string'),
                    defaultValue,
                    text,
                    'workspaceServices', {
                        type: 'click.showPluginConfig',
                        callback: _showPluginConfig
                    },
                    true, false, false, false
                );

                var $template = $([
                    '<div class="input-group">',
                    '<span class="input-group-addon">', text, '</span>',
                    '</div>'
                ].join(''));

                return [
                    $template.append($combo),
                    $('<div class="plugin-wrapper" />').append(
                        defaultValue.renderer
                    )
                ];
            }
        },
        BasePreferencesElement.prototype,
        SiteConfigMetaDataPreferences.prototype,
        SiteConfigWidthPreferences.prototype,
        GoogleAnalyticsPreferences.prototype,
        SnapEngagePreferences.prototype,
        RaygunIOPreferences.prototype,
        GithubGistPreferences.prototype,
        InjectScriptPreferences.prototype,
        BigmirNetPreferences.prototype,
        YahooFlurryPreferences.prototype,
        RollbarNotifierPreferences.prototype,
        RapidEngagePreferences.prototype
    );
});