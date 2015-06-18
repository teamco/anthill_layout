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
        'plugins/site.config/mvc/view/site.config.activate.view',
        'plugins/site.config/mvc/view/site.config.cleanup.view',
        'plugins/site.config/mvc/view/site.config.import.view',
        'plugins/site.config/mvc/view/site.config.preferences.view',
        'plugins/site.config/mvc/view/site.config.publish.view',
        'plugins/site.config/mvc/view/site.config.widget.view',
        'plugins/site.config/element/site.config.content.element',
        'plugins/site.config/element/site.config.element'
    ],

    /**
     * Define SiteConfigView
     * @param {BaseView} BaseView
     * @param {BasePreferences} BasePreferencesElement
     * @param {BaseView} Header
     * @param {BaseView} Footer
     * @param {SiteConfigActivateView} SiteConfigActivateView
     * @param {SiteConfigCleanupView} SiteConfigCleanupView
     * @param {SiteConfigImportView} SiteConfigImportView
     * @param {SiteConfigPreferencesView} SiteConfigPreferencesView
     * @param {SiteConfigPublishView} SiteConfigPublishView
     * @param {SiteConfigWidgetView} SiteConfigWidgetView
     * @param {SiteConfigContentElement} SiteConfigContentElement
     * @param {SiteConfigElement} SiteConfigElement
     * @returns {*}
     */
    function defineSiteConfigView(BaseView, BasePreferencesElement, Header, Footer, SiteConfigActivateView, SiteConfigCleanupView, SiteConfigImportView, SiteConfigPreferencesView, SiteConfigPublishView, SiteConfigWidgetView, SiteConfigContentElement, SiteConfigElement) {

        /**
         * Define view
         * @class SiteConfigView
         * @extends BaseView
         * @extends BasePreferencesElement
         * @extends SiteConfigActivateView,
         * @extends SiteConfigCleanupView,
         * @extends SiteConfigImportView,
         * @extends SiteConfigPreferencesView,
         * @extends SiteConfigPublishView,
         * @constructor
         */
        var SiteConfigView = function SiteConfigView() {
        };

        return SiteConfigView.extend(
            'SiteConfigView', {

                /**
                 * Render SiteConfig
                 * @memberOf SiteConfigView
                 * @returns {boolean}
                 */
                renderSiteConfig: function renderSiteConfig() {

                    this.renderHeader(Header, this.i18n.t('site.data.config'));

                    this.renderFilter(
                        this.updateFooterContent.bind(this)
                    );

                    if (!this.isCached('$siteconfig', SiteConfigElement)) {

                        /**
                         * Define SiteConfig element
                         * @type {SiteConfigElement}
                         */
                        this.elements.$siteconfig = new SiteConfigElement(this, {
                            id: this.createUUID(),
                            $container: this.elements.$container.$
                        });
                    }

                    this.updateFooterContent();
                },

                /**
                 * Render site.config content
                 * @memberOf SiteConfigView
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
                                    data[index].title.toClassName()
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

                    this.elements.$filter.updateData({
                        items: this.elements.items,
                        focusOn: 'input'
                    });

                    this.updateFooterContent();
                },

                /**
                 * Update footer content
                 * @memberOf SiteConfigView
                 */
                updateFooterContent: function updateFooterContent() {
                    this.renderFooter(Footer, this.elements.$siteconfig);
                },

                /**
                 * Render site.config
                 * @memberOf SiteConfigView
                 */
                render: function render() {

                    this.scope.observer.publish(
                        this.scope.eventmanager.eventList.successRendered,
                        this.renderSiteConfig.bind(this)
                    );
                }

            },
            BaseView.prototype,
            BasePreferencesElement.prototype,
            SiteConfigActivateView.prototype,
            SiteConfigCleanupView.prototype,
            SiteConfigImportView.prototype,
            SiteConfigPreferencesView.prototype,
            SiteConfigPublishView.prototype,
            SiteConfigWidgetView.prototype
        )
    }
);