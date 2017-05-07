/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 11:06 PM
 * To change this template use File | Settings | File Templates.
 */
define([
  'modules/Model'
], function defineWorkspaceDataModel(BaseModel) {

  /**
   * Define WorkspaceData model
   * @class WorkspaceDataModel
   * @constructor
   * @extends BaseModel
   */
  var WorkspaceDataModel = function WorkspaceDataModel() {

    /**
     * Define preferences
     * @property WorkspaceDataModel
     * @type {{}}
     */
    this.preferences = {};
  };

  return WorkspaceDataModel.extend('WorkspaceDataModel', {

    /**
     * Get data items
     * @memberOf WorkspaceDataModel
     */
    getDataItems: function getDataItems(workspace) {

      var items = workspace.model.getItems(),
          item, index, sorted = [],
          sort;

      for (index in items) {

        if (items.hasOwnProperty(index)) {

          /**
           * Get page
           * @type {Page}
           */
          item = items[index];
          sort = item.model.getConfig('preferences').order;

          if (typeof(sort) === 'number') {

            if (sorted[sort]) {
              this.scope.logger.warn('Unable to sort pages', sort);
              return false;
            }

            sorted[sort] = item;

          } else {

            sorted.push(item);
          }
        }
      }

      return sorted;
    }

  }, BaseModel.prototype);
});