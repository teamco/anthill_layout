/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

import './workspace.data.css';
import '../preferences/preferences.css';

import {AntHill} from '../../core/config/anthill';
import {MVC} from '../../modules/MVC';
import {WorkspaceDataController} from './mvc/workspace.data.controller';
import {WorkspaceDataModel} from './mvc/workspace.data.model';
import {WorkspaceDataView} from './mvc/workspace.data.view';
import {WorkspaceDataEventManager} from './mvc/workspace.data.event.manager';
import {WorkspaceDataPermission} from './mvc/workspace.data.permission';

/**
 * @class WorkspaceData
 * @extends AntHill
 */
export class WorkspaceData extends AntHill {

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
     * Define MVC
     * @property WorkspaceData
     * @type {MVC}
     */
    new MVC({
      scope: this,
      config: [DEFAULTS],
      components: [
        WorkspaceDataController,
        WorkspaceDataModel,
        WorkspaceDataView,
        WorkspaceDataEventManager,
        WorkspaceDataPermission
      ],
      render: true
    });

    this.observer.publish(this.eventManager.eventList.successCreated);
    this.observer.publish(this.eventManager.eventList.updateTranslations,
        ['plugins/workspace.data/translations/en-us']);
  }
}