/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/15
 * Time: 10:35 PM
 */

defineP(['config/widget'], function defineWidgetListeners(Widget) {

  /**
   * Define Widget Local listeners
   * @memberOf Widget
   * @type {{
     *      successCreated: {name: string, callback: Function},
     *      successRendered: {name: string, callback: Function},
     *      afterSetContent: {name: string, callback: Function},
     *      startResizable: {name: string, callback: Function},
     *      stopResizable: {name: string, callback: Function},
     *      startDraggable: {name: string, callback: Function},
     *      stopDraggable: {name: string, callback: Function}
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
        var event = this.eventManager.eventList.stopResizable;

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
         * @type {module.Application}
         */
        var root = this.controller.root();

        if (!silent && !root.model.getConfig('loading')) {
          this.observer.batchPublish(
              this.eventManager.eventList.loadContent,
              this.eventManager.eventList.loadPreferences
          );
        }
      }
    },

    afterSetContent: {
      name: "after.set.content",
      callback: function afterSetContentCallback() {
      }
    },

    startDraggable: {
      name: 'start.draggable',
      callback: function startDraggableCallback() {
        this.controller.showContent(false);
      }
    },

    stopDraggable: {
      name: 'stop.draggable',
      callback: function stopDraggableCallback() {
        this.controller.showContent(true);
        this.controller.updateContainmentDimensions();
      }
    },

    startResizable: {
      name: "start.resizable",
      callback: function startResizableCallback() {
        this.controller.showContent(false);
      }
    },

    stopResizable: {
      name: "stop.resizable",
      callback: function stopResizableCallback() {
        this.observer.publish(
            this.eventManager.eventList.toggleContentExpander,
            this.controller.isExpandable()
        );
        this.controller.showContent(true);
        this.controller.updateContainmentDimensions();
      }
    }
  };

  return Widget;
});