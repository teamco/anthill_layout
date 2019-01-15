/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/15
 * Time: 10:33 PM
 */
import {Page} from '../../../../core/config/page';

export const pageGlobalListeners = () => {

  /**
   * Define Page Global listeners
   * @memberOf Page
   * @type {{afterCreateItem: {name: string, callback(*=): void}}}
   */
  Page.prototype.globalListeners = {
    afterCreateItem: {
      name: 'after.create.item',
      callback(item) {
        this.logger.debug('Global listener: afterCreateItem', item);

        /**
         * @constant
         * @type {Workspace}
         */
        const workspace = this.controller.getContainment();

        /**
         * @constant
         * @type {Panel}
         */
        const panel = workspace.controller.getDesignTimePanel();
        const items = this.model.getItems();
        panel.controller.updateContentCounter('widget-rules', items);
        panel.controller.updateContentCounter('page-data', items);
      }
    },
  };
};