/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

/**
 * @constant AntHill
 * @type {module.AntHill}
 */
const AntHill = require('../../core/config/anthill.js');

/**
 * @class WorkspaceData
 * @extends AntHill
 */
module.exports = class WorkspaceData extends AntHill {

  /**
   * @param containment
   * @constructor
   */
  constructor(containment) {
    super('WorkspaceData', null, true);

    /**
     * Define containment
     * @property WorkspaceData
     */
    this.containment = containment;

    /**
     * Define active content
     * @property WorkspaceData
     * @type {Page}
     */
    this.activeContent = undefined;

    /**
     * Allow to locate element
     * @property WorkspaceData
     * @type {boolean}
     */
    this.allowToLocate = true;

    /**
     * Define defaults
     * @type {{
     *  plugin: boolean,
     *  getter: boolean,
     *  switch: boolean,
     *  html: {
     *    style: string,
     *    header: boolean,
     *    footer: boolean,
     *    floating: boolean,
     *    padding: {top: number, right: number, bottom: number, left: number}
     *  }
     * }}
     */
    const DEFAULTS = {
      plugin: true,
      getter: true,
      switch: false,
      html: {
        style: 'default',
        header: true,
        footer: true,
        floating: true,
        padding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        }
      }
    };

    /**
     * @constant WorkspaceController
     * @type {module.WorkspaceController|*}
     */
    const WorkspaceController = require('./mvc/workspace.data.controller.js');

    /**
     * @constant WorkspaceModel
     * @type {module.WorkspaceModel|*}
     */
    const WorkspaceModel = require('./mvc/workspace.data.model.js');

    /**
     * @constant WorkspaceView
     * @type {module.WorkspaceView|*}
     */
    const WorkspaceView = require('./mvc/workspace.data.view.js');

    /**
     * @constant WorkspaceEventManager
     * @type {module.WorkspaceEventManager|*}
     */
    const WorkspaceEventManager = require('./mvc/workspace.data.event.manager.js');

    /**
     * @constant WorkspacePermission
     * @type {module.WorkspacePermission|*}
     */
    const WorkspacePermission = require('./mvc/workspace.data.permission.js');

    /**
     * @constant MVC
     * @type {module.MVC}
     */
    const MVC = require('../../core/lib/modules/MVC.js');
    
    /**
     * Define MVC
     * @property WorkspaceData
     * @type {MVC}
     */
    new MVC({
      scope: this,
      config: [DEFAULTS],
      components: [
        WorkspaceController,
        WorkspaceModel,
        WorkspaceView,
        WorkspaceEventManager,
        WorkspacePermission
      ],
      render: true
    });

    this.observer.publish(this.eventManager.eventList.successCreated);
    this.observer.publish(this.eventManager.eventList.updateTranslations,
        ['plugins/workspace.data/translations/en-us']);
  }
};