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
    'plugins/site/element/site.content.element',
    'plugins/site/element/site.element'
], function defineSiteView(AntHill, BaseView, BaseRules, Header, Footer, SiteContent, Site) {

    /**
     * Define view
     * @class SiteView
     * @constructor
     * @extends BaseView
     * @extends BaseRules
     */
    var SiteView = function SiteView() {
    };

    return SiteView.extend('SiteView', {

        /**
         * Render Site
         * @member SiteView
         * @returns {boolean}
         */
        renderSite: function renderSite() {

            if (this.isCached('$site', Site)) {
                return false;
            }

            this.header(Header, this.elements.$container).setText(
                'Site Preferences'
            );

            /**
             * Define Site element
             * @type {SiteElement}
             */
            this.elements.$site = new Site(this, {
                id: this.createUUID(),
                $container: this.elements.$container.$
            });

            this.footer(Footer, this.elements.$container).setHtml(
                this.elements.$site.getFooter()
            );
        },

        /**
         * Render site content
         * @member SiteView
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
                     * @type {*}
                     */
                    var $item = new SiteContent(this, {
                        style: 'content',
                        id: [
                            data[index].model.getConfig('uuid'),
                            this.scope.constructor.name.toDash()
                        ].join('-'),
                        $container: this.elements.$site.$,
                        data: data[index]
                    });

                    this.scope.observer.publish(
                        this.scope.eventmanager.eventList.storeItem,
                        data[index]
                    );

                    this.controller.defineContentReferrer(data[index]);

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
         * Render site
         * @member SiteView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderSite.bind(this)
            );
        }

    }, AntHill.prototype, BaseView.prototype, BaseRules.prototype)

});