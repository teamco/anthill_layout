/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/15
 * Time: 10:33 PM
 */

import {Page} from '../page';

export const pageLocalListeners = () => {

  /**
   * Define Page Local listeners
   * @memberOf Page
   * @type {{
   * successCreated: {name: string, callback: Function},
   *  successRendered: {name: string, callback: Function},
   *  createWidget: {name: string, callback: Function}
   *  resizeWidget: {name: string, callback: Function}
   * }}
   */
  Page.prototype.localListeners = {

    successCreated: {
      name: 'success.created',
      callback() {
      }
    },

    successRendered: {
      name: 'success.rendered',
      callback() {
        this.view.renderPage();
        this.controller.updateLayout();
        this.observer.batchPublish(this.eventManager.eventList.updateItemInteractions);
      }
    },

    createWidget: {
      name: 'create.widget',
      callback() {
        if (this.controller.root().model.getConfig('loading')) {
          return false;
        }

        /**
         * Get current widget
         * @type {Widget|{model}}
         */
        const widget = this.model.getCurrentItem();

        widget.model.setOverlapping(this.model.getConfig('widget/overlapping'));
        this.observer.publish(this.eventManager.eventList.updateHeight);
      }
    },

    resizeWidget: {
      name: 'resize.widget',
      callback(widget) {
        widget.observer.publish(widget.eventManager.eventList.adoptDimensions, true);
        this.observer.publish(this.eventManager.eventList.updateHeight);
      }
    }
  };
};