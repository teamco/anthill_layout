/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

import './panel.css';

import {AntHill} from '../../core/config/anthill';
import {MVC} from '../../modules/MVC';
import {PanelController} from './mvc/panel.controller';
import {PanelModel} from './mvc/panel.model';
import {PanelView} from './mvc/panel.view';
import {PanelEventManager} from './mvc/panel.event.manager';
import {PanelPermission} from './mvc/panel.permission';

/**
 * Define Panel
 * @class Panel
 * @extends AntHill
 */
export class Panel extends AntHill {

  /**
   * Define Panel
   * @param opts
   * @param containment
   * @constructor
   */
  constructor(opts, containment) {
    super('Panel', null, true);

    /**
     * Define containment
     * @property Panel
     */
    this.containment = containment;

    /**
     * Define opened
     * @property Panel
     * @type {Object}
     */
    this.opened = {};

    /**
     * Define active module
     * @property Panel
     * @type {string}
     */
    this.active = undefined;

    /**
     * Render side
     * @type {{top: string, right: string, bottom: string, left: string}}
     */
    const RENDER_AT = {
      top: 'top',
      right: 'right',
      bottom: 'bottom',
      left: 'left'
    };

    /**
     * @constant DEFAULTS
     * @type {{
     *  plugin: boolean,
     *  renderAt: string,
     *  html: {resizable: boolean, style: string, header: boolean, footer: boolean, floating: boolean,
     *    padding: {top: number, right: number, bottom: number, left: number}}
     * }}
     */
    const DEFAULTS = {
      plugin: true,
      renderAt: RENDER_AT.right,
      html: {
        resizable: false,
        style: 'default',
        header: true,
        footer: false,
        floating: false,
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
     * @property Panel
     * @type {MVC}
     */
    new MVC({
      scope: this,
      config: [(opts || {}).config, DEFAULTS],
      components: [
        PanelController,
        PanelModel,
        PanelView,
        PanelEventManager,
        PanelPermission
      ],
      render: true
    });

    this.observer.publish(this.eventManager.eventList.successCreated);
    this.observer.publish(this.eventManager.eventList.updateTranslations, require('./translations/en-us.js'));
    this.observer.publish(this.eventManager.eventList.defineModules, [opts.modules]);
    this.observer.publish(this.eventManager.eventList.definePackages, [opts.packages]);
    this.observer.publish(this.eventManager.eventList.subscribeGenericEvent);
  }
}