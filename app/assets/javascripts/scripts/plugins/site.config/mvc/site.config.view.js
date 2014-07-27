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
        'plugins/site.config/element/site.config.element'
    ],

    /**
     * Define SiteConfigView
     * @param {BaseView} BaseView
     * @param {BasePreferences} BasePreferences
     * @param {BaseView} Header
     * @param {BaseView} Footer
     * @param {SiteConfigContentElement} SiteConfigContentElement
     * @param {SiteConfigPreferencesElement} SiteConfigPreferencesElement
     * @param {SiteConfigElement} SiteConfigElement
     * @returns {*}
     */
        function defineSiteConfigView(BaseView, BasePreferences, Header, Footer, SiteConfigContentElement, SiteConfigPreferencesElement, SiteConfigElement) {

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
                    'Site Config'
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

                var index, counter = 1;

                for (index in data) {

                    if (data.hasOwnProperty(index)) {

                        /**
                         * Render item
                         * @type {SiteConfigContentElement}
                         */
                        var $item = new SiteConfigContentElement(this, {
                            style: [
                                'content',
                                data[index].title.toDash()
                            ].join(' '),
                            $container: this.elements.$siteconfig.$,
                            counter: counter,
                            data: data[index]
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
             * Show preferences
             * @member SiteConfigView
             * @param opts
             * @param map
             */
            showPreferences: function showPreferences(opts, map) {

                /**
                 * Define $html
                 * @type {SiteConfigPreferencesElement}
                 */
                var $html = this.renderPreferences(map);

                /**
                 * Define buttons
                 * @type {*}
                 */
                var buttons = {
                    approve: {
                        text: 'OK',
                        events: {
                            click: 'approveUpdatePreferences'
                        }
                    },
                    reject: {
                        text: 'Cancel',
                        events: {
                            click: ['revertSitePreferences', 'rejectModalEvent']
                        }
                    }
                };

                /**
                 * Define page
                 * @type {Page}
                 */
                var page = this.controller.getPage();

                /**
                 * Get Workspace
                 * @type {Workspace}
                 */
                var workspace = this.controller.getWorkspace();

                this.modalDialog({
                    style: [
                        opts.title.toDash(), 'config'
                    ].join(' '),
                    $container: page.view.get$item().$,
                    type: 'info',
                    title: opts.title,
                    text: workspace.model.getUUID(),
                    html: $html.$,
                    cover: true,
                    buttons: buttons
                });
            },

            /**
             * Render Prefs
             * @member SiteConfigView
             * @param map
             * @returns {SiteConfigPreferencesElement}
             */
            renderPreferences: function renderPreferences(map) {

                /**
                 * Define SiteConfig Preferences Element
                 * @type {SiteConfigPreferencesElement}
                 */
                this.elements.$preferences = new SiteConfigPreferencesElement(this, {
                    map: map
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