/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

import {PluginElement} from '../../plugin.element';
import {GenerateRules} from '../../rules/page/page.rules';

/**
 * @class PageDataRulesElement
 * @extends PluginElement
 */
export class PageDataRulesElement extends PluginElement {

  /**
   * @param {BaseView|PageDataView} view
   * @param opts
   * @constructor
   */
  constructor(view, opts) {
    super('PageDataRulesElement', view, false);
    this._config(view, opts, $('<li class="nav-item content" />')).build(opts);

    /**
     * Define title
     * @property PageDataRulesElement
     * @type {string}
     */
    this.title = 'Show page content visual rules';

    /**
     * Define description
     * @property PageDataRulesElement
     * @type {string}
     */
    this.description = 'Clicking a button will take you to the show page content rules';

    this.init();
  }

  /**
   * Define inner content
   * @memberOf WorkspaceDataContentElement
   */
  getTemplate() {
    $(`<a class="nav-link" data-uuid="page-rules" data-toggle="modal" data-target="#page-rules">
         <span class="glyphicon glyphicon-eye-open" aria-hidden="true"></span>
         <span class="widget page-rules">${this.title}</span> 
       </a>`).appendTo(this.$);
  }

  /**
   * Define Init
   * @memberOf PageDataRulesElement
   * @returns {PageDataRulesElement}
   */
  init() {
    this.setTitle(this.title);
    this.renderTooltip({
      title: this.title,
      description: this.description,
      selector: this.$,
      customCss: `widget page-rules`
    });

    this.getTemplate();
  }

  /**
   * Render content rules wizard
   * @memberOf PageDataRulesElement
   * @param {Page} page
   * @returns {*|jQuery|HTMLElement}
   */
  renderWizard(page) {
    const uuid = this.utils.gen.UUID();
    const $html = $('<div class="canvas-rules" />').attr({id: uuid});

    /**
     * @property PageDataRulesElement
     * @type {GenerateRules}
     */
    this.canvas = new GenerateRules(uuid, page);

    return $html;
  }
}