/**
 * Created with RubyMine.
 * User: teamco
 * Date: 5/2/15
 * Time: 8:57 AM
 */
define([
    'plugins/site.config/element/site.config.preferences.element'
], function defineSiteConfigPreferencesView(SiteConfigPreferencesElement) {

    /**
     * Define SiteConfigPreferencesView
     * @class SiteConfigPreferencesView
     * @extends BaseView
     * @constructor
     */
    var SiteConfigPreferencesView = function SiteConfigPreferencesView() {
    };

    return SiteConfigPreferencesView.extend(
        'SiteConfigPreferencesView', {

            /**
             * Render Prefs
             * @memberOf SiteConfigPreferencesView
             * @param map
             * @returns {SiteConfigPreferencesElement}
             */
            renderPreferences: function renderPreferences(map) {

                /**
                 * Define SiteConfig Preferences Element
                 * @type {SiteConfigPreferencesElement}
                 */
                this.elements.$preferences = new SiteConfigPreferencesElement(this, {
                    map: map
                });

                return this.get$preferences();
            },

            /**
             * Show preferences
             * @memberOf SiteConfigPreferencesView
             * @param opts
             * @param map
             */
            showPreferences: function showPreferences(opts, map) {

                /**
                 * Define $html
                 * @type {SiteConfigPreferencesElement}
                 */
                var $html = this.renderPreferences(map);

                /**
                 * Define buttons
                 * @type {*}
                 */
                var buttons = {
                    approve: {
                        text: this.i18n.t('site.data.save'),
                        type: 'success',
                        events: {
                            click: 'approveUpdatePreferences'
                        }
                    },
                    reject: {
                        text: this.i18n.t('site.data.cancel'),
                        events: {
                            click: ['revertSitePreferences', 'rejectModalEvent']
                        }
                    }
                };

                /**
                 * Get Workspace
                 * @type {Workspace}
                 */
                var workspace = this.controller.getWorkspace();

                this.modalDialog({
                    style: [
                        opts.title.toDash(), 'site-config'
                    ].join(' '),
                    type: 'info',
                    title: opts.title,
                    text: workspace.model.getUUID(),
                    html: $html.$,
                    cover: true,
                    buttons: buttons
                });
            }
        }
    );
});