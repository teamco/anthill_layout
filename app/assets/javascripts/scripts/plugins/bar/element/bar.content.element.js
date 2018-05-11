/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

/**
 * @constant PluginElement
 * @type {module.PluginElement}
 */
const PluginElement = require('../../plugin.element.js');

/**
 * Define BarContent Element
 * @class BarContentElement
 * @extends PluginElement
 */
module.exports = class BarContentElement extends PluginElement {

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

    // Get module name
    const name = this.resource.module.name;

    return [
      '<li><a title="', name.humanize(), '">',
      '<i class="fa ', name.toDash(), '"></i>',
      '<span>', name.humanize(), '</span></a></li>'
    ].join('');
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
};