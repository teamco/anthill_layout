/**
 * Created by i061485 on 3/19/14.
 */

define([], function defineBasePreferences() {

    /**
     * Define base prefs
     * @class BasePreferences
     * @constructor
     */
    var BasePreferences = function BasePreferences() {

    };

    return BasePreferences.extend({

        /**
         * Toggle fieldset
         * @member BasePreferences
         */
        toggleFieldset: function toggleFieldset() {

            /**
             * Define $el
             * @type {*|jQuery|HTMLElement}
             */
            var $el = $(this);

            $el.parents('div.html').
                find('.open').
                removeClass('open');

            $el.addClass('open');
        },

        /**
         * Open preferences
         * @member BasePreferences
         * @param opts
         */
        openPreferences: function openPreferences(opts) {

            /**
             * Define buttons
             * @type {*}
             */
            var buttons = opts.buttons || {};

            $.extend(true, buttons, {
                locate: {
                    text: 'Locate',
                    events: {
                        click: 'locate' + this.scope.constructor.name
                    }
                },
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
            });

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
                buttons: buttons
            });
        }
    });

});