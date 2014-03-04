/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:13 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/view',
    'element/header.element',
    'element/footer.element',
    'plugins/panel/element/panel.container.element',
    'plugins/panel/element/panel.content.element',
    'plugins/panel/element/panel.content.container.element',
    'plugins/panel/element/panel.tab.element',
    'plugins/panel/element/panel.element'
], function definePanelView(BaseView, Header, Footer, PanelContainer, PanelContent, PanelContentContainer, PanelTab, Panel) {

    /**
     * Define view
     * @class View
     * @constructor
     */
    var View = function View() {
    };

    return View.extend({

        /**
         * Render container
         */
        renderPanelContainer: function renderPanelContainer() {

            /**
             * Define container
             * @type {plugins.panel.element.panel.container.element}
             */
            this.elements.$container = new PanelContainer(this, {
                $container: 'body',
                style: [
                    'panel-container',
                    this.controller.getRenderAt()
                ].join(' ')
            });
        },

        /**
         * Render tab to open/close panel
         */
        renderTab: function renderTab() {

            /**
             * Define container
             * @type {plugins.panel.element.panel.container.element}
             */
            this.elements.$tab = new PanelTab(this, {
                $container: this.elements.$container.$,
                style: 'panel-tab'
            });
        },

        /**
         * Render Panel
         */
        renderPanel: function renderPanel() {

            if (this.isCached('$panel', Panel)) {
                return false;
            }

            this.renderPanelContainer();
            this.renderTab();

            this.header(Header, this.elements.$container);

            /**
             * Define local width
             */
            var width = this.getConfigHTML().width;

            /**
             * Define Panel element
             * @type {element.page.page.element}
             */
            this.elements.$panel = new Panel(this, {
                id: this.createUUID(),
                $container: this.elements.$container.$,
                maxWidth: width.max,
                minWidth: width.min
            });

            this.renderContentContainer();

            this.footer(Footer, this.elements.$container);

            this.controller.renderPackages();

        },

        /**
         * Render content container
         */
        renderContentContainer: function renderContentContainer() {
            /**
             * Define Panel element
             * @type {element.page.page.element}
             */
            this.elements.$content = new PanelContentContainer(this, {
                $container: this.elements.$panel.$,
                style: 'panel-content'
            });
        },

        /**
         * Render panel content
         * @param module
         * @param {Boolean} force
         * @returns {boolean}
         */
        renderContent: function renderContent(module, force) {

            /**
             * Define style
             * @type {string}
             */
            var style = [
                    module.constructor.name.toLowerCase(),
                    'content'
                ].join('-'),
                sname = '$' + style;

            /**
             * Define content
             * @type {{}}
             */
            this.elements.items = this.elements.items || {};

            if (this.isCachedItems(force) || this.elements.items.hasOwnProperty(sname)) {
                return false;
            }

            /**
             * Render item
             * @type {plugins.panel.element.panel.content.element}
             */
            var $item = new PanelContent(this, {
                style: style,
                $container: this.elements.$content.$
            });

            module.view.defineContainer($item);

            this.elements.items[sname] = $item;
        },

        /**
         * Render panel
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderPanel.bind(this)
            );
        }

    }, BaseView.prototype)

});