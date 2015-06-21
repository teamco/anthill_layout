/**
 * Created by i061485 on 11/4/14.
 */

define(function defineSiteConfigActivate() {

    /**
     * Define SiteConfig Activate
     * @class SiteConfigActivate
     * @extends AntHill
     * @extends BaseController
     * @extends Routes
     * @constructor
     */
    var SiteConfigActivate = function SiteConfigActivate() {
    };

    return SiteConfigActivate.extend('SiteConfigActivate', {

        /**
         * Define activate storage
         * @memberOf SiteConfigActivate
         */
        activateStorage: function activateStorage() {
            this.view.activateConfirmation();
        },

        /**
         * Define approve activate storage
         * @memberOf SiteConfigActivate
         */
        approveActivate: function approveActivate() {

            /**
             * Get scope
             * @type {SiteConfig}
             */
            var scope = this.scope;

            /**
             * Get root config
             * @type {{activate: boolean, mode: string}}
             */
            var config = this.root().model.getConfig();

            /**
             * Define $modal
             * @type {ModalElement}
             */
            var $modal = scope.view.elements.$modal;

            if (!scope.base.isDefined($modal)) {
                scope.logger.warn('Undefined $modal');
                return false;
            }

            /**
             * Get modal inputs
             * @type {string|*}
             */
            var inputs = $modal.collectInputFields(),
                data = this.prepareXhrData({
                    author_site_version: {
                        version: config.version
                    }
                });

            for (var i = 0, l = inputs.length; i < l; i++) {

                var input = inputs[i],
                    name = input.name,
                    value = input.value;

                var regex = name.match(/(\w+)\[(\w+)]/);

                if (regex[1] && regex[2]) {
                    data[regex[1]] = data[regex[1]] || {};
                    data[regex[1]][regex[2]] = value;
                }
            }

            /**
             * Get create update site route
             * @type {Array}
             */
            var route = scope.config.routes.activateSiteStorage,
                key = config.appName,
                opts = {
                    dataType: 'json',
                    url: route[0] + key,
                    method: route[1],
                    data: data
                };

            $.ajax(opts).done(function (data, type, xhr) {

                scope.logger.debug(data.notice, arguments);
                $modal.selfDestroy();
            });
        }
    });
});