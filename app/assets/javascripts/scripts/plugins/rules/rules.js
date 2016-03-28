/**
 * Created by teamco on 3/19/14.
 */
define(function defineBaseRules() {

    /**
     * Define base prefs
     * @class BaseRules
     * @extends BaseView
     * @extends PluginElement
     * @constructor
     */
    var BaseRules = function BaseRules() {
    };

    return BaseRules.extend('BaseRules', {
        
        /**
         * Open preferences
         * @memberOf BaseRules
         * @param opts
         */
        openRules: function openRules(opts) {

            /**
             * Define buttons
             * @type {*}
             */
            var buttons = $.extend(true, {}, {
                locate: {
                    text: 'Locate',
                    type: 'default',
                    events: {
                        click: 'locateWidget'
                    }
                },
                approve: {
                    text: 'OK',
                    type: 'success',
                    events: {
                        click: 'approveUpdateRules'
                    }
                },
                reject: {
                    text: 'Cancel',
                    type: 'default',
                    events: {
                        click: 'rejectModalEvent'
                    }
                }
            }, opts.buttons || {});

            this.modalDialog({
                style: opts.style,
                type: opts.type || 'info',
                title: opts.title,
                text: opts.config.uuid,
                html: opts.$html,
                cover: true,
                buttons: buttons
            });
        }
    });
});