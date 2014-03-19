/**
 * Created by i061485 on 3/19/14.
 */

define([], function defineBasePreferences() {

    /**
     * Define base prefs
     * @constructor
     */
    var BasePreferences = function BasePreferences() {

    };

    return BasePreferences.extend({

        /**
         * Open preferences
         * @member BasePreferences
         * @param opts
         */
        openPreferences: function openPreferences(opts) {

            /**
             * Define $container
             * @type {$}
             */
            var $container = this.controller.getPage().view.elements.$page.$;

            this.modalDialog({
                style: opts.style,
                $container: $container,
                type: opts.type || 'info',
                title: opts.title,
                text: opts.config.uuid,
                html: opts.$html,
                cover: true,
                buttons: {
                    approve: {
                        text: 'OK',
                        events: {
                            click: 'approveUpdatePreferences'
                        }
                    },
                    reject: {
                        text: 'Cancel',
                        events: {
                            click: 'rejectModalEvent'
                        }
                    }
                }
            });
        }

    });

});