/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element'
], function defineDashboardElement(PluginElement) {

    /**
     * Define Dashboard Element
     * @param view
     * @param opts
     * @returns {DashboardElement}
     * @constructor
     * @class DashboardElement
     * @extends PluginElement
     */
    var DashboardElement = function DashboardElement(view, opts) {

        this._config(view, opts, $()).build({
            $container: opts.$container
        });

        /**
         * Define opener
         * @property DashboardElement
         */
        this.opener = undefined;

        return this;
    };

    return DashboardElement.extend(
        'DashboardElement', {

            /**
             * Bind open dashboard
             * @memberOf DashboardElement
             */
            openDashboard: function openDashboard() {

                if (this.opener && !this.opener.closed) {
                    this.opener.focus();
                    return false;
                }

                /**
                 * Define window open
                 * @type {Window}
                 */
                this.opener = window.open('/');
            }
        },
        PluginElement.prototype
    );
});