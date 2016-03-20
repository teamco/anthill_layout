/**
 * Created by teamco on 3/19/14.
 */
define(function defineBaseRules() {

    /**
     * Define base prefs
     * @class BaseRules
     * @extends BaseView
     * @extends BaseElement
     * @constructor
     */
    var BaseRules = function BaseRules() {
    };

    return BaseRules.extend('BaseRules', {

        /**
         * Toggle fieldset
         * @memberOf BaseRules
         * @param e
         */
        toggleFieldset: function toggleFieldset(e) {

            /**
             * Define $li
             * @type {*|jQuery|HTMLElement}
             */
            var $li = $(e.target);

            $li.hasClass('open') ?
                $li.removeClass('open') :
                $li.addClass('open');

            this.adoptModalDialogPosition();
        },

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
                        click: 'locate' + this.scope.name
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