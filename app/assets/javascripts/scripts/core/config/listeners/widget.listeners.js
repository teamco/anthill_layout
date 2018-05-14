/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/15
 * Time: 10:35 PM
 */

/**
 * @constant Widget
 * @type {module.Widget}
 */
const Widget = require('../widget.js');

module.exports = () => {

  /**
   * Define Widget Local listeners
   * @memberOf Widget
   * @type {{
   *  successCreated: {name: string, callback: Function},
   *  successRendered: {name: string, callback: Function},
   *  afterSetContent: {name: string, callback: Function},
   *  startResizable: {name: string, callback: Function},
   *  stopResizable: {name: string, callback: Function},
   *  startDraggable: {name: string, callback: Function},
   *  stopDraggable: {name: string, callback: Function}
   * }}
   */
  Widget.prototype.localListeners = {

    successCreated: {
      name: 'success.created',
      callback() {
      }
    },

    successRendered: {
      name: 'success.rendered',
      callback(silent) {

        /**
         * Define silent
         * @type {boolean}
         */
        silent = this.utils.setBoolean(silent, false);

        /**
         * Define event
         * @type {stopResizable|string}
         */
        const event = this.eventManager.eventList.stopResizable;

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
         * @type {module.Application|{model}}
         */
        const root = this.controller.root();

        if (!silent && !root.model.getConfig('loading')) {
          this.observer.batchPublish(this.eventManager.eventList.loadContent,
              this.eventManager.eventList.loadPreferences);
        }
      }
    },

    afterSetContent: {
      name: 'after.set.content',
      callback() {
      }
    },

    startDraggable: {
      name: 'start.draggable',
      callback() {
        this.controller.showContent(false);
      }
    },

    stopDraggable: {
      name: 'stop.draggable',
      callback() {
        this.controller.showContent(true);
        this.controller.updateContainmentDimensions();
      }
    },

    startResizable: {
      name: 'start.resizable',
      callback() {
        this.controller.showContent(false);
      }
    },

    stopResizable: {
      name: 'stop.resizable',
      callback() {
        this.observer.publish(this.eventManager.eventList.toggleContentExpander, this.controller.isExpandable());
        this.controller.showContent(true);
        this.controller.updateContainmentDimensions();
      }
    }
  };
};