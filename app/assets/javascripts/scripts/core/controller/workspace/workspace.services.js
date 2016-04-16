define([
    'services/google.analytics',
    'services/snap.engage',
    'services/raygun.io',
    'services/github.gist',
    'services/inject.script',
    'services/bigmir.net',
    'services/yahoo.flurry'
], function defineWorkspaceSEO(GoogleAnalyticsPreferences, SnapEngagePreferences, RaygunIOPreferences, GithubGistPreferences, InjectScriptPreferences, BigmirNetPreferences, YahooFlurryPreferences) {

    /**
     * Define WorkspaceServices
     * @class WorkspaceServices
     * @extends BaseController
     * @extends GoogleAnalyticsPreferences
     * @extends SnapEngagePreferences
     * @extends RaygunIOPreferences
     * @extends GithubGistPreferences
     * @extends InjectScriptPreferences
     * @extends BigmirNetPreferences
     * @extends YahooFlurryPreferences
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
        YahooFlurryPreferences.prototype
    );
});
