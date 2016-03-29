define(function defineWorkspaceSEO() {

    /**
     * Define WorkspaceServices
     * @class WorkspaceServices
     * @extends BaseController
     * @constructor
     */
    var WorkspaceServices = function WorkspaceServices() {
    };

    return WorkspaceServices.extend(
        'WorkspaceServices', {

            /**
             * Load SnapEngage Code
             * @memberOf WorkspaceController
             */
            loadSnapEngageCode: function loadSnapEngageCode() {

                this.logger.debug('Load SnapEngage Code', arguments);

                /**
                 * Get prefs
                 * @type {{snapEngageCode, activateSnapEngage}}
                 */
                var preferences = this.model.getConfig('preferences');

                /**
                 * Get SnapEngage Code
                 * @type {string}
                 */
                var snapEngageCode = preferences.snapEngageCode,
                    activate = preferences.activateSnapEngage;

                if (!(typeof(snapEngageCode) === 'string' && snapEngageCode.length)) {
                    this.logger.debug('Unable to fetch SnapEngage Code', snapEngageCode);
                    return false;
                }

                if (!activate) {
                    this.logger.debug('SnapEngage Code not activated', snapEngageCode);
                    $('[id^=SnapABug]').remove();
                    return false;
                }

                // Get uuid key
                var code = snapEngageCode.match(/[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}/);

                if (!code) {
                    this.logger.debug('Unable to fetch SnapEngage Code UUID', snapEngageCode);
                    return false;
                }

                (function () {
                    var se = document.createElement('script');
                    se.type = 'text/javascript';
                    se.async = true;
                    se.src = '//storage.googleapis.com/code.snapengage.com/js/' + code[0] + '.js';
                    var done = false;
                    se.onload = se.onreadystatechange = function () {
                        if (!done && (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete')) {
                            done = true;
                            /* Place your SnapEngage JS API code below */
                            /* SnapEngage.allowChatSound(true); Example JS API: Enable sounds for Visitors. */
                        }
                    };
                    var s = document.getElementsByTagName('script')[0];
                    s.parentNode.insertBefore(se, s);
                })();
            },

            /**
             * Load Google Analytics Tracking Id
             * @memberOf WorkspaceController
             */
            loadGoogleAnalyticsTrackingId: function loadGoogleAnalyticsTrackingId() {

                this.logger.debug('Load Google Analytics Tracking Id', arguments);

                /**
                 * Get prefs
                 * @type {{googleAnalyticsTrackingId}}
                 */
                var preferences = this.model.getConfig('preferences');

                /**
                 * Get tracking id
                 * @type {string}
                 */
                var trackingId = preferences.googleAnalyticsTrackingId;

                if (typeof(trackingId) === 'string' && trackingId.length) {

                    window._gaq = window._gaq || [];
                    window._gaq.push(['_setAccount', trackingId]);
                    window._gaq.push(['_trackPageview']);

                    (function () {
                        var ga = document.createElement('script');
                        ga.type = 'text/javascript';
                        ga.async = true;
                        ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
                        var s = document.getElementsByTagName('script')[0];
                        s.parentNode.insertBefore(ga, s);
                    })();
                }
            },

            /**
             * Load Raygun.IO Api Key
             * @memberOf WorkspaceController
             */
            loadRaygunIOApiKey: function loadRaygunIOApiKey() {

                /**
                 * Define CDN library path
                 * @type {string}
                 */
                var path = '//cdn.raygun.io/raygun4js/raygun.min.js';

                /**
                 * Get prefs
                 * @type {{googleAnalyticsTrackingId}}
                 */
                var preferences = this.model.getConfig('preferences');

                /**
                 * Define API Key
                 * @type {string}
                 */
                var apiKey = preferences.raygunIOApiKey || '';

                require([path], function _loadRaygun() {
                    Raygun.init(apiKey).attach();
                });
            }
        }
    );
});
