/**
 * Created by i061485 on 8/12/15.
 */

define(function defineFixVulnerabilities() {

    /**
     * Define fixes for vulnerabilities
     * @class BehaviorFixVulnerabilities
     * @constructor
     * @extends AntHill
     */
    var BehaviorFixVulnerabilities = function BehaviorFixVulnerabilities() {

        // Scope hook
        this.scope = undefined;
    };

    return BehaviorFixVulnerabilities.extend('BehaviorFixVulnerabilities', {

        /**
         * Define fix for ClickJacking
         * @memberOf BehaviorFixVulnerabilities
         */
        fixClickJacking: function fixClickJacking() {

            if (window.top !== window) {

                // Redirect to window.location
                window.top.location = window.location;

                this.scope.observer.publish(
                    this.scope.eventmanager.eventList.handleVulnerabilities,
                    'ClickJacking'
                );
            }
        },

        /**
         * Define after Handle Vulnerabilities
         * @memberOf BehaviorFixVulnerabilities
         * @param data
         */
        afterHandleVulnerabilities: function afterHandleVulnerabilities(data) {

            // TODO
            debugger
        },

        /**
         * Define fix for ClickJacking
         * @memberOf BehaviorFixVulnerabilities
         * @param {string} type
         */
        handleVulnerabilities: function handleVulnerabilities(type) {

            var route = this.model.getConfig('routes/handleVulnerabilities'),
                appName = this.model.getConfig('appName');

            $.ajax({

                dataType: 'json',

                url: route[0],
                method: route[1],

                data: this.controller.prepareXhrData({
                    key: appName,
                    type: type
                })

            }).done(
                function done(data, type, xhr) {

                    this.logger.debug(arguments);
                    this.observer.publish(
                        this.eventmanager.eventList.afterHandleVulnerabilities,
                        data
                    );

                }.bind(this)
            );
        }
    });
});