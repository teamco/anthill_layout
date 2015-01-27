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
], function defineWidgetRulesView(AntHill, BaseView, BaseRules, Header, Footer, WidgetRulesContent, WidgetRules) {

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

            this.header(Header, this.elements.$container).setText(
                'Widget Rules'
            );

            if (!this.isCached('$widgetrules', WidgetRules)) {

                /**
                 * Define WidgetRules element
                 * @type {WidgetRulesElement}
                 */
                this.elements.$widgetrules = new WidgetRules(this, {
                    id: this.createUUID(),
                    $container: this.elements.$container.$
                });
            }

            this.footer(Footer, this.elements.$container).setHtml(
                this.elements.$widgetrules.getFooter()
            );
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

            for (var index in data) {

                if (data.hasOwnProperty(index)) {

                    /**
                     * Render item
                     * @type {*}
                     */
                    var $item = new WidgetRulesContent(this, {
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

            this.footer(Footer, this.elements.$container).setHtml(
                this.elements.$widgetrules.getFooter()
            );
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