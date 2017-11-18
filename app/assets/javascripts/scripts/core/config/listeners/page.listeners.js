/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/15
 * Time: 10:33 PM
 */

defineP(['config/page'], function definePageListeners(Page) {

  /**
   * Define Page Local listeners
   * @memberOf Page
   * @type {{
     *      successCreated: {name: string, callback: Function},
     *      successRendered: {name: string, callback: Function},
     *      createWidget: {name: string, callback: Function}
     *      resizeWidget: {name: string, callback: Function}
     * }}
   */
  Page.prototype.localListeners = {

    successCreated: {
      name: "success.created",
      callback: function successCreatedCallback() {
      }
    },

    successRendered: {
      name: "success.rendered",
      callback: function successRenderedCallback() {

        this.view.renderPage();
        this.controller.updateLayout();

        this.observer.batchPublish(
            this.eventmanager.eventList.updateItemInteractions
        );
      }
    },

    createWidget: {
      name: 'create.widget',
      callback: function createWidgetCallback() {

        if (this.controller.root().model.getConfig('loading')) {
          return false;
        }

        /**
         * Get current widget
         * @type {Widget}
         */
        var widget = this.model.getCurrentItem();

        widget.model.setOverlapping(
            this.model.getConfig('widget/overlapping')
        );

        this.observer.publish(
            this.eventmanager.eventList.updateHeight
        );
      }
    },

    resizeWidget: {
      name: 'resize.widget',
      callback: function resizeWidgetCallback(widget) {

        widget.observer.publish(
            widget.eventmanager.eventList.adoptDimensions,
            true
        );

        this.observer.publish(
            this.eventmanager.eventList.updateHeight
        );
      }
    }
  };

  return Page;
});