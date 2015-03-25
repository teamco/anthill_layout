/**
 * Created by i061485 on 7/10/14.
 */

define([], function defineCommentsRenderer() {

    /**
     * Define CommentsRenderer
     * @class CommentsRenderer
     * @constructor
     */
    var CommentsRenderer = function CommentsRenderer() {
    };

    return CommentsRenderer.extend('CommentsRenderer', {

        /**
         * Render comments form
         * @member CommentsRenderer
         * @param {{events: *|string[]}} [opts]
         */
        renderCommentsForm: function renderCommentsForm(opts) {

            opts = opts || {};

            if (!opts.visible) {

                this.view.scope.logger.debug('Restrict to render comments');
                return false;
            }

            /**
             * Define default events
             * @type {string[]}
             */
            var defaultEvents = ['focus', 'blur'];

            /**
             * Define events
             * @type {*|string[]}
             */
            var events = this.base.isDefined(opts.events) ?
                (this.base.isArray(opts.events) ?
                    opts.events : [opts.events]).concat(defaultEvents) : defaultEvents;

            this.$.append(
                this.renderTextArea({
                    name: 'comment',
                    placeholder: 'Add a comment...',
                    disabled: false,
                    visible: true,
                    validate: false,
                    monitor: {
                        events: events,
                        callback: this.doActionEvent.bind({
                            scope: this,
                            events: events
                        })
                    }
                })
            );
        },

        /**
         * Define action event
         * @member CommentsRenderer
         * @param {Event} e
         */
        doActionEvent: function doActionEvent(e) {

            /**
             * Get method name
             * @type {string}
             */
            var methodName = '_' + e.type + 'CommentsEvent';

            if (this.scope[methodName]) {
                this.scope[methodName](e)
            }
        },

        /**
         * Define on focus event
         * @member CommentsRenderer
         * @param {Event} e
         * @private
         */
        _focusCommentsEvent: function _focusCommentsEvent(e) {
debugger
        },

        /**
         * Define on blur event
         * @member CommentsRenderer
         * @param {Event} e
         * @private
         */
        _blurCommentsEvent: function _blurCommentsEvent(e) {
            debugger
        }
    });
});