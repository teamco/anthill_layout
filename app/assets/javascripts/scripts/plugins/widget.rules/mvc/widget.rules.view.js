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
    'plugins/widget.rules/element/widget.rules.content.element',
    'plugins/widget.rules/element/widget.rules.element'
], function defineWidgetRulesView(AntHill, BaseView, BaseRules, Header, Footer, WidgetRulesContentElement, WidgetRulesElement) {

    /**
     * Define view
     * @class WidgetRulesView
     * @constructor
     * @extends BaseView
     * @extends BaseRules
     */
    var WidgetRulesView = function WidgetRulesView() {
    };

    return WidgetRulesView.extend('WidgetRulesView', {

        /**
         * Render WidgetRules
         * @member WidgetRulesView
         * @returns {boolean}
         */
        renderWidgetRules: function renderWidgetRules() {

            if (!this.isCached('$widgetrules', WidgetRulesElement)) {

                /**
                 * Define WidgetRules element
                 * @type {WidgetRulesElement}
                 */
                this.elements.$widgetrules = new WidgetRulesElement(this, {
                    id: this.createUUID(),
                    $container: this.elements.$container.$
                });
            }
        },

        /**
         * Render widget.rules content
         * @member WidgetRulesView
         * @param data
         * @returns {boolean}
         */
        renderContent: function renderContent(data) {

            /**
             * Define content
             * @type {{}}
             */
            this.elements.items = {};
            this.elements.$widgetrules.empty();

            this.renderHeader(Header, 'Widget Rules');

            this.renderFilter(
                this.updateFooterContent.bind(this)
            );

            for (var index in data) {

                if (data.hasOwnProperty(index)) {

                    /**
                     * Render item
                     * @type {WidgetRulesContentElement}
                     */
                    var $item = new WidgetRulesContentElement(this, {
                        style: 'content',
                        id: [
                            data[index].model.getConfig('uuid'),
                            this.scope.constructor.prototype.name.toDash()
                        ].join('-'),
                        $container: this.elements.$widgetrules.$,
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

            this.elements.$widgetrules.scrollCover(
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
         * @member WidgetRulesView
         */
        updateFooterContent: function updateFooterContent() {
            this.renderFooter(Footer, this.elements.$widgetrules);
        },

        /**
         * Show rules
         * @member WidgetRulesView
         * @param config
         * @returns {boolean|*}
         */
        showRules: function showRules(config, load) {

            /**
             * Define scope
             * @type {PageData}
             */
            var scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.setActiveContent,
                config.uuid
            );

            if (load) {

                /**
                 * Define $html
                 * @type {BaseElement}
                 */
                var $html = this.controller.getRulesHtml(config.uuid, load);

                this.openRules({
                    config: config,
                    $html: $html.$,
                    style: [
                        config.preferences.resource,
                        'widget-rules rules'
                    ].join(' '),
                    title: 'Widget rules',
                    buttons: {
                        preferences: {
                            text: 'Preferences',
                            events: {
                                click: 'preferences' + this.scope.constructor.prototype.name
                            }
                        }
                    }
                });
            }
        },

        /**
         * Render widget.rules
         * @member WidgetRulesView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderWidgetRules.bind(this)
            );
        }

    }, AntHill.prototype, BaseView.prototype, BaseRules.prototype)

});