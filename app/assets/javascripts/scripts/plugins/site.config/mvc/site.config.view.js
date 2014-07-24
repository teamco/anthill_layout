/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:13 PM
 * To change this template use File | Settings | File Templates.
 */

define(
    [
        'modules/View',
        'plugins/preferences/preferences',
        'element/header.element',
        'element/footer.element',
        'plugins/site.config/element/site.config.content.element',
        'plugins/site.config/element/site.config.preferences.element',
        'plugins/site.config/element/site.config.add.page.element',
        'plugins/site.config/element/site.config.element'
    ],

    /**
     * Define SiteConfigView
     * @param {BaseView} BaseView
     * @param {BasePreferences} BasePreferences
     * @param {BaseView} Header
     * @param {BaseView} Footer
     * @param {SiteConfigContentElement} SiteConfigContent
     * @param {SiteConfigPreferencesElement} SiteConfigPreferencesElement
     * @param {SiteConfigAddPageElement} SiteConfigAddPageElement
     * @param {SiteConfigElement} SiteConfigElement
     * @returns {*}
     */
        function defineSiteConfigView(BaseView, BasePreferences, Header, Footer, SiteConfigContentElement, SiteConfigPreferencesElement, SiteConfigAddPageElement, SiteConfigElement) {

        /**
         * Define view
         * @class SiteConfigView
         * @extends BaseView
         * @constructor
         */
        var SiteConfigView = function SiteConfigView() {
        };

        return SiteConfigView.extend('SiteConfigView', {

            /**
             * Render SiteConfig
             * @member SiteConfigView
             * @returns {boolean}
             */
            renderSiteConfig: function renderSiteConfig() {

                if (this.isCached('$siteconfig', SiteConfigElement)) {
                    return false;
                }

                this.header(Header, this.elements.$container).setText(
                    'Workspace Pages'
                );

                /**
                 * Define SiteConfig element
                 * @type {SiteConfigElement}
                 */
                this.elements.$siteconfig = new SiteConfigElement(this, {
                    id: this.createUUID(),
                    $container: this.elements.$container.$
                });

                this.footer(Footer, this.elements.$container).setHtml(
                    this.elements.$siteconfig.getFooter()
                );
            },

            /**
             * Render site.config content
             * @member SiteConfigView
             * @param data
             * @returns {boolean}
             */
            renderContent: function renderContent(data) {

                /**
                 * Define content
                 * @type {{}}
                 */
                this.elements.items = {};

                this.elements.$siteconfig.empty();
                this.renderCreatePage();

                var index, counter = 1;

                for (index in data) {

                    if (data.hasOwnProperty(index)) {

                        /**
                         * Render item
                         * @type {SiteConfigContentElement}
                         */
                        var $item = new SiteConfigContentElement(this, {
                            style: 'content',
                            id: [
                                data[index].model.getConfig('uuid'),
                                'site-config-view'
                            ].join('-'),
                            $container: this.elements.$siteconfig.$,
                            data: data[index],
                            counter: counter
                        });

                        counter += 1;

                        this.elements.items[$item.id] = $item;
                    }
                }

                this.elements.$siteconfig.scrollCover(
                    this.elements.$container.$
                );

                this.footer(Footer, this.elements.$container).setHtml(
                    this.elements.$siteconfig.getFooter()
                );
            },

            /**
             * Render create new page
             * @member SiteConfigView
             */
            renderCreatePage: function renderCreatePage() {

                /**
                 * Render add new pages
                 * @type {SiteConfigAddPageElement}
                 */
                this.$addPage = new SiteConfigAddPageElement(this, {
                    style: 'add-page',
                    $container: this.elements.$siteconfig.$,
                    events: {
                        click: ['createPage']
                    }
                });
            },

            /**
             * Show preferences
             * @member SiteConfigView
             * @param config
             */
            showPreferences: function showPreferences(config) {

                /**
                 * Define scope
                 * @type {SiteConfig}
                 */
                var scope = this.scope;

                scope.observer.publish(
                    scope.eventmanager.eventList.setActiveContent,
                    config.uuid
                );

                this.openPreferences({
                    config: config,
                    $html: this.controller.definePreferences(config.uuid).$,
                    style: 'site-config-prefs preferences',
                    title: 'Page preferences',
                    buttons: {
                        destroyPageWidgets: {
                            text: 'Destroy widgets',
                            events: {
                                click: 'destroyPageWidgets'
                            }
                        }
                    }
                });
            },

            /**
             * Render Prefs
             * @member SiteConfigView
             * @param {Page} page
             * @returns {SiteConfigPreferencesElement}
             */
            renderPreferences: function renderPreferences(page) {

                /**
                 * Define SiteConfig Preferences Element
                 * @type {SiteConfigPreferencesElement}
                 */
                this.elements.$preferences = new SiteConfigPreferencesElement(this, {
                    data: page.model.getConfig('preferences'),
                    page: page
                });

                return this.elements.$preferences;
            },

            /**
             * Render site.config
             * @member SiteConfigView
             */
            render: function render() {

                this.scope.observer.publish(
                    this.scope.eventmanager.eventList.successRendered,
                    this.renderSiteConfig.bind(this)
                );
            }

        }, BaseView.prototype, BasePreferences.prototype)
    }
);