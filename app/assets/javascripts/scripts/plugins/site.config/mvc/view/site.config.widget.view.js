/**
 * Created with RubyMine.
 * User: teamco
 * Date: 5/2/15
 * Time: 8:59 AM
 */
define([
    'plugins/site.config/element/site.config.widgets.list.element'
], function defineSiteConfigWidgetView(SiteConfigWidgetsListElement) {

    /**
     * Define SiteConfigWidgetView
     * @class SiteConfigWidgetView
     * @extends SiteConfigView
     * @constructor
     */
    var SiteConfigWidgetView = function SiteConfigWidgetView() {
    };

    return SiteConfigWidgetView.extend(
        'SiteConfigWidgetView', {

            /**
             * Render widgets manager
             * @memberOf SiteConfigWidgetView
             */
            renderWidgetsManager: function renderWidgetsManager() {

                /**
                 * Define SiteConfig Widgets list Element
                 * @type {SiteConfigWidgetsListElement}
                 */
                this.elements.$widgetgenerator = new SiteConfigWidgetsListElement(this, {});

                return this.elements.$widgetgenerator;
            },

            /**
             * Define show widgets list
             * @memberOf SiteConfigWidgetView
             * @param {Array} widgets
             * @param {Array} show
             */
            showWidgetsList: function showWidgetsList(widgets, show) {

                if (this.elements.$modal) {

                    // Clear modal
                    this.elements.$modal.selfDestroy();
                }

                this.modalDialog({
                    style: 'widget-list',
                    type: 'info',
                    title: this.i18n.t('widget.manager.list').replace(/\{1}/, widgets.length + ''),
                    html: this.renderWidgetsManager().renderWidgetsList(widgets, show),
                    cover: true,
                    autoclose: false,
                    buttons: {
                        external: {
                            text: this.i18n.t('widget.manager.external'),
                            events: {
                                click: 'nextWidgetExternal'
                            }
                        },
                        approve: {
                            text: this.i18n.t('widget.manager.generate'),
                            events: {
                                click: 'nextWidgetGenerator'
                            }
                        },
                        reject: {
                            text: this.i18n.t('site.data.cancel'),
                            events: {
                                click: 'rejectModalEvent'
                            }
                        }
                    }
                });
            },
            
            /**
             * Define show widgets generator
             * @memberOf SiteConfigWidgetView
             * @param {Array} widgets
             * @param {Array} types
             * @param {object} defaults
             */
            showWidgetGenerator: function showWidgetGenerator(widgets, types, defaults) {

                if (this.elements.$modal) {

                    // Clear modal
                    this.elements.$modal.selfDestroy();
                }

                this.modalDialog({
                    style: 'widget-generator-new',
                    type: 'info',
                    title: this.i18n.t('widget.manager.generate.new'),
                    html: this.elements.$widgetgenerator.renderWidgetGeneratorForm(
                        widgets,
                        types,
                        defaults,
                        true
                    ),
                    cover: true,
                    closeX: false,
                    autoclose: false,
                    buttons: {
                        approve: {
                            text: this.i18n.t('site.data.save'),
                            events: {
                                click: 'generateNewWidget'
                            }
                        },
                        reject: {
                            text: this.i18n.t('site.data.back'),
                            events: {
                                click: 'loadWidgetsList'
                            }
                        }
                    }
                });
            },

            /**
             * Define show widgets external
             * @memberOf SiteConfigWidgetView
             * @param {Array} widgets
             * @param {Array} types
             * @param {object} defaults
             */
            showWidgetExternal: function showWidgetExternal(widgets, types, defaults) {

                if (this.elements.$modal) {

                    // Clear modal
                    this.elements.$modal.selfDestroy();
                }

                this.modalDialog({
                    style: 'widget-generator-new',
                    type: 'info',
                    title: this.i18n.t('widget.manager.generate.external'),
                    html: this.elements.$widgetgenerator.renderWidgetExternalForm(
                        widgets,
                        types,
                        defaults
                    ),
                    cover: true,
                    closeX: false,
                    autoclose: false,
                    buttons: {
                        approve: {
                            text: this.i18n.t('site.data.save'),
                            events: {
                                click: 'generateExternalWidget'
                            }
                        },
                        reject: {
                            text: this.i18n.t('site.data.back'),
                            events: {
                                click: 'loadWidgetsList'
                            }
                        }
                    }
                });
            },

            /**
             * Define update widget generator
             * @memberOf SiteConfigWidgetView
             * @param {object} widget
             * @param {Array} types
             */
            updateWidgetGenerator: function updateWidgetGenerator(widget, types) {

                if (this.elements.$modal) {

                    // Clear modal
                    this.elements.$modal.selfDestroy();
                }

                this.modalDialog({
                    style: 'widget-generator-new widget-generator-edit',
                    type: 'info',
                    title: this.i18n.t('widget.manager.generate.update') + ': ' + widget.name,
                    html: this.elements.$widgetgenerator.renderWidgetGeneratorForm(
                        widget,
                        types,
                        widget,
                        false
                    ),
                    cover: true,
                    closeX: false,
                    autoclose: false,
                    items: widget,
                    buttons: {
                        approve: {
                            text: this.i18n.t('site.data.save'),
                            events: {
                                click: 'updateWidget'
                            }
                        },
                        reject: {
                            text: this.i18n.t('site.data.back'),
                            events: {
                                click: 'loadWidgetsList'
                            }
                        }
                    }
                });
            }
        }
    );
});