/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

import './widget.rules.css';
import '../rules/widget/rules.css';

import {AntHill} from '../../core/config/anthill';
import {WidgetRulesController} from './mvc/widget.rules.controller';
import {WidgetRulesModel} from './mvc/widget.rules.model';
import {WidgetRulesView} from './mvc/widget.rules.view';
import {WidgetRulesEventManager} from './mvc/widget.rules.event.manager';
import {WidgetRulesPermission} from './mvc/widget.rules.permission';
import {MVC} from '../../modules/MVC';

/**
 * @class WidgetRules
 * @extends AntHill
 */
export class WidgetRules extends AntHill {

  /**
   * @param containment
   * @constructor
   */
  constructor(containment) {
    super('WidgetRules', null, true);

    /**
     * Define containment
     * @property WidgetRules
     */
    this.containment = containment;

    /**
     * Define active content
     * @property WidgetRules
     * @type {*}
     */
    this.activeContent = undefined;

    /**
     * Allow to locate element
     * @property WidgetRules
     * @type {boolean}
     */
    this.allowToLocate = true;

    /**
     * Define defaults
     * @type {{
     *  plugin: boolean,
     *  getter: boolean,
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
     * @property WidgetRules
     * @type {MVC}
     */
    new MVC({
      scope: this,
      config: [DEFAULTS],
      components: [
        WidgetRulesController,
        WidgetRulesModel,
        WidgetRulesView,
        WidgetRulesEventManager,
        WidgetRulesPermission
      ],
      render: true
    });

    this.observer.publish(this.eventManager.eventList.successCreated);
    this.observer.publish(this.eventManager.eventList.updateTranslations, ['plugins/widget.rules/translations/en-us']);

    this.utils.waitFor(
        () => this.controller.getPage().eventManager,
        () => {
          this.controller.subscribeRefreshContentAfterDestroyItems();
          this.controller.subscribeRefreshContentSwitchPage();
        },
        () => scope.logger.warn('Page should rendered.')
    );
  }
}