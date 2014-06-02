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
], function definePanelView(BaseView, Header, Footer, PanelContainer, PanelContentElement, PanelContentContainer, PanelTab, Panel) {

    /**
     * Define view
     * @class PanelView
     * @constructor
     * @extends BaseView
     */
    var PanelView = function PanelView() {
    };

    return PanelView.extend({

        /**
         * Render container
         * @member PanelView
         */
        renderPanelContainer: function renderPanelContainer() {

            /**
             * Define container
             * @type {PanelContainerElement}
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
         * @member PanelView
         */
        renderTab: function renderTab() {

            /**
             * Define container
             * @type {PanelTabElement}
             */
            this.elements.$tab = new PanelTab(this, {
                $container: this.elements.$container.$,
                style: 'panel-tab'
            });
        },

        /**
         * Render Panel
         * @member PanelView
         */
        renderPanel: function renderPanel() {

            if (this.isCached('$panel', Panel)) {
                return false;
            }

            this.renderPanelContainer();
            this.renderTab();

            this.header(Header, this.elements.$container).setText(
                'Configuration'
            );

            /**
             * Define local width
             */
            var width = this.getConfigHTML().width;

            /**
             * Define Panel element
             * @type {PanelElement}
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
         * @member PanelView
         */
        renderContentContainer: function renderContentContainer() {
            /**
             * Define Panel element
             * @type {PanelContentContainerElement}
             */
            this.elements.$content = new PanelContentContainer(this, {
                $container: this.elements.$panel.$,
                style: 'panel-content'
            });
        },

        /**
         * Render panel content
         * @member PanelView
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
             * @type {PanelContentElement}
             */
            var $item = new PanelContentElement(this, {
                style: style,
                $container: this.elements.$content.$
            });

            module.view.defineContainer($item);

            this.elements.items[sname] = $item;
        },

        /**
         * Render panel
         * @member PanelView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderPanel.bind(this)
            );
        }

    }, BaseView.prototype)

});