/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/15
 * Time: 10:35 PM
 */

define(['config/widget'], function defineWidgetListeners(Widget) {

    /**
     * Define Widget Local listeners
     * @member Widget
     * @type {{
     *      successCreated: {name: string, callback: Function},
     *      successRendered: {name: string, callback: Function},
     *      afterSetContent: {name: string, callback: Function},
     *      stopResizable: {name: string, callback: Function}
     * }}
     */
    Widget.prototype.localListeners = {

        successCreated: {
            name: "success.created",
            callback: function successCreatedCallback() {
            }
        },

        successRendered: {
            name: "success.rendered",
            callback: function successRenderedCallback(silent) {

                /**
                 * Define silent
                 * @type {boolean}
                 */
                silent = this.base.defineBoolean(silent, false, true);

                /**
                 * Define event
                 * @type {stopResizable|string}
                 */
                var event = this.eventmanager.eventList.stopResizable;

                this.view.renderWidget();
                this.controller.setupInteractions();

                this.observer.publish(event, [
                    event, {
                        organize: !silent,
                        animate: false
                    },
                    arguments
                ]);

                /**
                 * Get root
                 * @type {Application}
                 */
                var root = this.controller.root();

                if (!silent && !root.model.getConfig('loading')) {
                    this.observer.batchPublish(
                        this.eventmanager.eventList.loadContent,
                        this.eventmanager.eventList.loadPreferences
                    );
                }
            }
        },

        afterSetContent: {
            name: "after.set.content",
            callback: function afterSetContentCallback() {
            }
        },

        stopResizable: {
            name: "stop.resizable",
            callback: function stopResizableCallback() {
                this.observer.publish(
                    this.eventmanager.eventList.toggleContentExpander,
                    this.controller.isExpandable()
                );
            }
        }
    };

    return Widget;
});