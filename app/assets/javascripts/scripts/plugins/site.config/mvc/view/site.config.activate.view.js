/**
 * Created with RubyMine.
 * User: teamco
 * Date: 5/2/15
 * Time: 8:55 AM
 */
define([
    'plugins/site.config/element/site.config.activate.element'
], function defineSiteConfigActivateView(SiteConfigActivateElement) {

    /**
     * Define SiteConfigActivateView
     * @class SiteConfigActivateView
     * @constructor
     */
    var SiteConfigActivateView = function SiteConfigActivateView() {
    };

    return SiteConfigActivateView.extend(
        'SiteConfigActivateView', {

            /**
             * Render activate element
             * @memberOf SiteConfigView
             * @returns {SiteConfigActivateElement}
             */
            renderActivate: function renderActivate() {

                /**
                 * Define SiteConfig Activate Element
                 * @type {SiteConfigActivateElement}
                 */
                this.elements.$activate = new SiteConfigActivateElement(this, {});

                return this.elements.$activate;
            },

            /**
             * Render activate confirmation modal dialog
             * @memberOf SiteConfigView
             */
            activateConfirmation: function activateConfirmation() {

                /**
                 * Get root
                 * @type {Application}
                 */
                var root = this.controller.root();

                this.modalDialog({
                    style: 'activate',
                    type: 'warning',
                    title: 'Activate',
                    text: [
                        'Are you sure want to activate current version: ',
                        root.model.getConfig('version'), '?'
                    ].join(''),
                    html: this.renderActivate().$,
                    cover: true,
                    autoclose: true,
                    buttons: {
                        approve: {
                            text: this.i18n.t('site.data.confirm'),
                            events: {
                                click: 'approveActivate'
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
            }
        }
    );
});