define([
    'services/google.analytics',
    'services/snap.engage',
    'services/raygun.io',
    'services/github.gist',
    'services/inject.script',
    'services/bigmir.net',
    'services/yahoo.flurry',
    'services/rollbar.notifier',
    'services/rapid.engage'
], function defineWorkspaceSEO(GoogleAnalyticsPreferences, SnapEngagePreferences, RaygunIOPreferences, GithubGistPreferences, InjectScriptPreferences, BigmirNetPreferences, YahooFlurryPreferences, RollbarNotifierPreferences, RapidEngagePreferences) {

    /**
     * Define WorkspaceServices
     * @class WorkspaceServices
     * @extends {BaseController} BaseController
     * @extends {GoogleAnalyticsPreferences} GoogleAnalyticsPreferences
     * @extends {SnapEngagePreferences} SnapEngagePreferences
     * @extends {RaygunIOPreferences} RaygunIOPreferences
     * @extends {GithubGistPreferences} GithubGistPreferences
     * @extends {InjectScriptPreferences} InjectScriptPreferences
     * @extends {BigmirNetPreferences} BigmirNetPreferences
     * @extends {YahooFlurryPreferences} YahooFlurryPreferences
     * @extends {RollbarNotifierPreferences} RollbarNotifierPreferences
     * @extends {RapidEngagePreferences} RapidEngagePreferences
     * @constructor
     */
    var WorkspaceServices = function WorkspaceServices() {
    };

    return WorkspaceServices.extend(
        'WorkspaceServices', {

            /**
             * Check if service should be loaded
             * @memberOf WorkspaceController
             */
            isServiceActivated: function isServiceActivated(code, activate) {

                if (!(typeof code === 'string' && code.length)) {
                    this.scope.logger.debug('Unable to fetch Code', code);
                    return false;
                }

                if (!activate) {
                    this.scope.logger.debug('Code does not activated', code);
                    return false;
                }

                return true;
            }
        },
        GoogleAnalyticsPreferences.prototype,
        SnapEngagePreferences.prototype,
        RaygunIOPreferences.prototype,
        GithubGistPreferences.prototype,
        InjectScriptPreferences.prototype,
        BigmirNetPreferences.prototype,
        YahooFlurryPreferences.prototype,
        RollbarNotifierPreferences.prototype,
        RapidEngagePreferences.prototype
    );
});
