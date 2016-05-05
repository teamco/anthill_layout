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
    'services/rapid.engage',
    'services/doorbell',
    'services/woopra',
    'services/virtual.spirits',
    'services/loggly'
], function defineSitePreferences(BasePreferencesElement, SiteConfigMetaDataPreferences, SiteConfigWidthPreferences, GoogleAnalyticsPreferences, SnapEngagePreferences, RaygunIOPreferences, GithubGistPreferences, InjectScriptPreferences, BigmirNetPreferences, YahooFlurryPreferences, RollbarNotifierPreferences, RapidEngagePreferences, DoorbellPreferences, WoopraPreferences, VirtualSpiritsPreferences, LogglyPreferences) {

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
     * @extends DoorbellPreferences
     * @extends WoopraPreferences
     * @extends VirtualSpiritsPreferences
     * @extends LogglyPreferences
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
                        tooltip: 'Get the data you need to make intelligent marketing and business decisions with Google Analytics. Available for websites, apps, and enterprise businesses.',
                        renderer: this.renderGoogleAnalytics()
                    },
                    {
                        type: 'text',
                        value: 'RaygunIO',
                        tooltip: 'Raygun gives developers meaningful insights into problems affecting their applications. Discover issues - Understand the problem - Fix things faster.',
                        renderer: this.renderRaygunIO()
                    },
                    {
                        type: 'text',
                        value: 'SnapEngage',
                        tooltip: 'Highly customizable live chat software for sales and support teams. SnapEngage Live Chat converts passive website visitors to loyal customers.',
                        renderer: this.renderSnapEngage()
                    },
                    {
                        type: 'text',
                        value: 'GitHub Gist',
                        tooltip: 'Gists are a great way to share your work. You can share single files, parts of files, or full applications.',
                        renderer: this.renderGithubGist()
                    },
                    {
                        type: 'text',
                        value: 'Inject Script',
                        tooltip: 'Javascript Code Injection',
                        renderer: this.renderInjectScript()
                    },
                    {
                        type: 'text',
                        value: 'Bigmir.net',
                        tooltip: 'Новости и поиск в Интернете, почта, переводчик, спорт, работа, знакомства, погода, авто, евро 2012, игры, шоу-бизнес и другое на портале bigmir)net.',
                        renderer: this.renderBigmirNet()
                    },
                    {
                        type: 'text',
                        value: 'Yahoo Flurry',
                        tooltip: 'Flurry\'s mission is to optimize the mobile experience through better apps and more personal ads.',
                        renderer: this.renderYahooFlurry()
                    },
                    {
                        type: 'text',
                        value: 'Rollbar Notifier',
                        tooltip: 'Rollbar has helped us prevent production issues before they begin. It is an integral and reliable part of our application monitoring.',
                        renderer: this.renderRollbarNotifier()
                    },
                    {
                        type: 'text',
                        value: 'RapidEngage',
                        tooltip: 'RapidEngage Layers can help you increase website engagement, pageviews, and conversion.',
                        renderer: this.renderRapidEngage()
                    },
                    {
                        type: 'text',
                        value: 'Doorbell.io',
                        tooltip: 'Easily gather in-app user feedback, on websites, iOS apps, and Android apps.',
                        renderer: this.renderDoorbell()
                    },
                    {
                        type: 'text',
                        value: 'Woopra',
                        tooltip: 'Track your customers\' web and mobile activity, forms, emails, support tickets and more, all in one place with customer analytics.',
                        renderer: this.renderWoopra()
                    },
                    {
                        type: 'text',
                        value: 'Virtual Spirits',
                        tooltip: 'Automatic chat & Live chat software helps you to simply convert visitors into leads and customers. reach out to visitors 24/7 and find new customers.',
                        renderer: this.renderVirtualSpirits()
                    },
                    {
                        type: 'text',
                        value: 'Loggly',
                        tooltip: 'The world\'s most popular cloud log management service delivers application intelligence. No Software. No Downloads. No Sweat. Free Trial!',
                        renderer: this.renderVirtualSpirits()
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
        RapidEngagePreferences.prototype,
        RapidEngagePreferences.prototype,
        DoorbellPreferences.prototype,
        WoopraPreferences.prototype,
        VirtualSpiritsPreferences.prototype,
        LogglyPreferences.prototype
    );
});