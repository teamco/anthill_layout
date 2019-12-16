/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

import {PluginElement} from '../../plugin.element';

/**
 * @class WorkspaceDataAddPageElement
 * @extends {PluginElement, Renderer}
 */
export class WorkspaceDataAddPageElement extends PluginElement {

  /**
   * @param {BaseView|WorkspaceDataView} view
   * @param opts
   * @constructor
   */
  constructor(view, opts) {
    super('WorkspaceDataAddPageElement', view, false);
    this._config(view, opts, window.$('<li class="nav-item content" />')).build(opts);

    /**
     * Define title
     * @property WorkspaceDataAddPageElement
     * @type {string}
     */
    this.title = 'Create new page';

    /**
     * Define description
     * @property WorkspaceDataAddPageElement
     * @type {string}
     */
    this.description = 'Clicking a button will take you to the edit page for the new widgets';

    this.init();
  }

  /**
   * Define inner content
   * @memberOf WorkspaceDataContentElement
   */
  getTemplate() {
    window.$(`<a class="nav-link" href="#">
        <i class="fas fa-folder-plus"></i>
        window.${this.title}
       </a>`).appendTo(this.window.$);
  }

  /**
   * Define Init
   * @memberOf WorkspaceDataAddPageElement
   * @returns {WorkspaceDataAddPageElement}
   */
  init() {
    this.setTitle(this.title);
    this.renderTooltip({
      title: this.title,
      description: this.description,
      selector: this.window.$
    });

    this.getTemplate();
  }

  /**
   * Render add wizard
   * @memberOf WorkspaceDataAddPageElement
   * @param {Workspace} workspace
   * @returns {*|jQuery|HTMLElement}
   */
  renderWizard(workspace) {

    /**
     * Define element
     * @type {WorkspaceDataAddPageElement}
     */
    const element = this;

    /**
     * Define _selectPageItems
     * @param {string} puuid
     * @private
     */
    function _selectPageItems(puuid) {

      /**
       * Fetch page
       * @type {Page}
       */
      const page = workspace.model.getItemByUUID(puuid);

      // Clean container
      $items.empty();

      if (!page) {
        element.view.scope.logger.debug('Empty page selected');
        return false;
      }

      const items = page.model.getItems();
      const list = [];

      for (let index in items) {
        if (Object.prototype.hasOwnProperty.call(items, index)) {
          list.push(window.$.extend({uuid: items[index].model.getUUID()}, items[index].model.getConfig('preferences')));

          $items.append(element.renderListBox({
            name: index,
            text: text.trim(),
            list: list,
            disabled: false,
            visible: true,
            tooltip: true,
            label: true,
            multiple: true,
            monitor: {
              events: ['select.preview'],
              _updateSelected() {
                //debugger;
              }
            }
          }));
        }
      }
    }

    const $ul = window.$('<ul />');
    const items = workspace.model.getItems();

    /**
     * Define clone pages
     * @type {Array}
     */
    const clonePages = window.$.map(items, page => {
      const uuid = page.model.getUUID(),
          title = page.model.getItemTitle(),
          counter = page.model.getConfig('widget/counter'),
          description = (uuid === title ? '' : title) + '<br />',
          pluralize = 'items: ' + counter;

      return {
        type: 'text',
        value: uuid,
        tooltip: description + pluralize
      };
    });

    // Add empty page
    clonePages.unshift({
      type: 'text',
      value: 'Empty page'
    });

    /**
     * Define title
     * @type {*|jQuery}
     */
    const $title = window.$('<li class="page-title-prefs" />').append(
        element.renderTextField({
          name: 'title',
          text: 'Page title',
          placeholder: 'Enter title',
          disabled: false,
          visible: true
        })
    );

    const text = 'Clone from',
        $cloneTemplate = window.$([
          '<div class="input-group input-group-sm">',
          '<span class="input-group-addon">', text, '</span>',
          '</div>'
        ].join(''));

    /**
     * Define clone from
     * @type {*|jQuery}
     */
    const $clone = window.$('<li />').append($cloneTemplate.append(
        element.renderDropDown(
            clonePages,
            clonePages[0].value,
            text,
            'cloneItemContent', {
              type: 'click.selectItems',
              callback: _selectPageItems
            },
            true
        )));

    const $items = window.$('<div class="page-items-prefs" />');
    return $ul.append([$clone, $title, $items]);
  }
}