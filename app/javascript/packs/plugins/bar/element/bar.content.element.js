/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

import {PluginElement} from '../../plugin.element';

/**
 * Define BarContent Element
 * @class BarContentElement
 * @extends PluginElement
 */
export class BarContentElement extends PluginElement {

  /**
   * @param {BarView} view
   * @param opts
   * @constructor
   */
  constructor(view, opts) {
    super('BarContentElement', view, false);

    /**
     * Define resource
     * @property BarContentElement
     */
    this.resource = opts.resource;

    this._config(view, opts, $(this.getTemplate())).build(opts);
    this.attachEvent(opts.cname);
  };

  /**
   * Define template
   * @memberOf BarContentElement
   * @returns {string}
   */
  getTemplate() {
    const module = this.resource.module;
    const humanized = module.name.humanize();

    return `<li class="nav-item">
      <a class="nav-link" title="${humanized}">
        <i class="nav-icon fa fa-${module.model.getConfig('icon')}"></i>
        ${humanized}
      </a>
    </li>`;
  }

  /**
   * Open tab
   * @memberOf BarContentElement
   * @param resource
   */
  attachEvent(resource) {

    /**
     * Define panel instance
     * @type {Panel}
     */
    const panel = this.view.scope.containment;

    const publish = panel.observer.publish.bind(panel.observer),
        event = panel.eventManager.eventList;

    this.$.on('click.toggle', () => {
      panel.view.controller.isOpened(resource) ?
          publish(event.closePanel, [resource, true]) :
          publish(event.openPanel, resource);
    });
  }
}