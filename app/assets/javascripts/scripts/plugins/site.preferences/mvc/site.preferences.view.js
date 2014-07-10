/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:13 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'config/anthill',
    'modules/View',
    'plugins/rules/rules',
    'element/header.element',
    'element/footer.element',
    'plugins/site.preferences/element/site.preferences.content.element',
    'plugins/site.preferences/element/site.preferences.element'
], function defineSitePreferencesView(AntHill, BaseView, BaseRules, Header, Footer, SitePreferencesContentElement, SitePreferencesElement) {

    /**
     * Define view
     * @class SitePreferencesView
     * @constructor
     * @extends BaseView
     * @extends BaseRules
     */
    var SitePreferencesView = function SitePreferencesView() {
    };

    return SitePreferencesView.extend('SitePreferencesView', {

        /**
         * Render SitePreferences
         * @member SitePreferencesView
         * @returns {boolean}
         */
        renderSitePreferences: function renderSitePreferences() {

            this.header(Header, this.elements.$container).setText(
                'Site Preferences'
            );

            /**
             * Define SitePreferences element
             * @type {SitePreferencesElement}
             */
            this.elements.$site = new SitePreferencesElement(this, {
                id: this.createUUID(),
                $container: this.elements.$container.$
            });

            this.footer(Footer, this.elements.$container).setHtml(
                this.elements.$site.getFooter()
            );
        },

        /**
         * Render site.preferences content
         * @member SitePreferencesView
         * @param data
         * @returns {boolean}
         */
        renderContent: function renderContent(data) {

            /**
             * Define content
             * @type {{}}
             */
            this.elements.items = {};
            this.elements.$site.empty();

            for (var index in data) {

                if (data.hasOwnProperty(index)) {

                    /**
                     * Render item
                     * @type {SitePreferencesContentElement}
                     */
                    var $item = new SitePreferencesContentElement(this, {
                        style: [
                            'content',
                            data[index].title.toDash()
                        ].join(' '),
                        $container: this.elements.$site.$,
                        data: data[index]
                    });

                    this.elements.items[$item.id] = $item;
                }
            }

            this.elements.$site.scrollCover(
                this.elements.$container.$
            );

            this.footer(Footer, this.elements.$container).setHtml(
                this.elements.$site.getFooter()
            );
        },

        /**
         * Show Preferences
         * @member SitePreferencesView
         * @param opts
         */
        showPreferences: function showPreferences(opts) {

            /**
             * Define $html
             * @type {BaseElement}
             */
            var $html = this.elements.$site.getPreferencesHtml(opts);

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
                        click: ['rejectModalEvent']
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
                    opts.title.toDash(), 'preferences'
                ].join(' '),
                $container: page.view.get$item().$,
                type: 'info',
                title: opts.title,
                text: workspace.model.getUUID(),
                html: $html,
                cover: true,
                buttons: buttons
            });
        },

        /**
         * Render site.preferences
         * @member SitePreferencesView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderSitePreferences.bind(this)
            );
        }

    }, AntHill.prototype, BaseView.prototype, BaseRules.prototype)

});