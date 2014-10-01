/**
 * Created by i061485 on 3/19/14.
 */

define(['jquery'], function defineBasePreferences($) {

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
         * @param e
         */
        toggleFieldset: function toggleFieldset(e) {

            /**
             * Define $el
             * @type {*|jQuery|HTMLElement}
             */
            var $el = $(e.target);

            $el.parents('div.html').
                find('.open').
                removeClass('open');

            $el.addClass('open');

            this.adoptModalDialogPosition();
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
            var buttons = $.extend(true, {}, {
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
                        click: ['rejectModalEvent']
                    }
                }
            }, opts.buttons || {});

            /**
             * Define current page
             * @type {Page}
             */
            var current = this.controller.getPage();

            /**
             * Define page
             * @type {Page}
             */
            var page = opts.current ? current : this.scope.base.define(
                this.controller.getPage(opts.config.uuid),
                current
            );

            this.modalDialog({
                style: opts.style,
                $container: page.view.get$item().$,
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