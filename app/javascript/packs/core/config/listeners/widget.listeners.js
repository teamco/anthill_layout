/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/15
 * Time: 10:35 PM
 */
import {Widget} from '../widget';

export const widgetLocalListeners = () => {

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
         * @type {Application|{model}}
         */
        const root = this.controller.root();

        if (!silent && !root.model.getConfig('loading')) {
          this.observer.publish(this.eventManager.eventList.loadContent);
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
        this.controller.showContent(false, 'startDraggable');
      }
    },

    stopDraggable: {
      name: 'stop.draggable',
      callback() {
        this.controller.showContent(true, 'stopDraggable');
        this.controller.updateContainmentDimensions();
      }
    },

    startResizable: {
      name: 'start.resizable',
      callback() {
        this.controller.showContent(false, 'startResizable');
      }
    },

    stopResizable: {
      name: 'stop.resizable',
      callback() {
        const method = this.controller.isExpandable;
        method ?
            this.observer.publish(this.eventManager.eventList.toggleContentExpander, method.call(this)) :
            this.logger.warn('Expandable capability should be imported');
        this.controller.showContent(true, 'stopResizable');
        this.controller.updateContainmentDimensions();
      }
    }
  };
};