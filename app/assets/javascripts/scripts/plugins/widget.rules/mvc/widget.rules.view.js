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

    return WidgetRulesView.extend(
        'WidgetRulesView', {

            /**
             * Render WidgetRules
             * @memberOf WidgetRulesView
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
                        $container: this.get$container()
                    });
                }
            },

            /**
             * Render widget.rules content
             * @memberOf WidgetRulesView
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
                            uuid: [
                                data[index].model.getConfig('uuid'),
                                this.scope.name.toDash()
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
                    this.get$container()
                );

                this.elements.$filter.updateData({
                    items: this.elements.items,
                    focusOn: 'input'
                });

                this.updateFooterContent();
            },

            /**
             * Update footer content
             * @memberOf WidgetRulesView
             */
            updateFooterContent: function updateFooterContent() {
                this.renderFooter(Footer, this.elements.$widgetrules);
            },

            /**
             * Show rules
             * @memberOf WidgetRulesView
             * @param config
             * @param load
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

                    if (!$html) {

                        scope.logger.warn('Wait for loading rules');
                        return false;
                    }

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
                                type: 'info',
                                events: {
                                    click: 'preferences' + this.scope.name
                                }
                            }
                        }
                    });
                }
            },

            /**
             * Render widget.rules
             * @memberOf WidgetRulesView
             */
            render: function render() {

                this.scope.observer.publish(
                    this.scope.eventmanager.eventList.successRendered,
                    this.renderWidgetRules.bind(this)
                );
            }

        },
        AntHill.prototype,
        BaseView.prototype,
        BaseRules.prototype
    )
});