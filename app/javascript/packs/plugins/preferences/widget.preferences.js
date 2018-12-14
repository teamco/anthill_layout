/**
 * Created with RubyMine.
 * User: teamco
 * Date: 3/7/14
 * Time: 7:39 PM
 */

import {BasePreferencesElement} from './preferences';

/**
 * @class WidgetPreferences
 * @extends BasePreferencesElement
 * @type {WidgetPreferences}
 */
export class WidgetPreferences extends BasePreferencesElement {

  /**
   * @constructor
   */
  constructor() {
    super('WidgetPreferences');
  }

  /**
   * Render form element
   * @param hash
   * @param {string} title
   * @memberOf WidgetPreferences
   * @return {Array}
   */
  renderPrefsForm(hash, title) {

    /**
     * Define dom nodes
     * @type {Array}
     */
    let nodes = [];

    for (let index in hash) {
      if (hash.hasOwnProperty(index)) {

        // Define node
        const node = hash[index];

        /**
         * Define text
         * @type {string}
         */
        const text = index.replace(title.replace(/ /g, '').toLowerCase(), '').toPoint().humanize();

        /**
         * @constant nodeRenderer
         */
        const nodeRenderer = this.view.dataView.getNodeRenderer(this.view, node, text, index);

        nodes.push($('<div />').addClass([
          title.humanize().toClassName() + '-prefs',
          node.type,
          node.visible ? '' : 'hidden',
          node.separator ? 'separator' : ''
        ].join(' ')).append(nodeRenderer));
      }
    }

    return nodes;
  }

  /**
   * Merge prefs
   * @memberOf WidgetPreferences
   * @param defaults
   * @param prefs
   * @returns {{}}
   * @static
   */
  static mergeWidgetPrefs(defaults, prefs) {
    for (let index in prefs) {
      if (prefs.hasOwnProperty(index)) {
        if (defaults.hasOwnProperty(index)) {
          defaults[index].value = prefs[index];
        } else {

          // Reset checked
          for (let key in defaults) {
            if (defaults.hasOwnProperty(key)) {
              if (defaults[key].group === index) {
                defaults[key].checked = false;
              }
            }
          }

          if (defaults.hasOwnProperty(prefs[index])) {

            // check input-radio
            defaults[prefs[index]].checked = true;
          }
        }
      }
    }

    return defaults;
  }

  /**
   * Render prefs data
   * @memberOf WidgetPreferences
   * @param data
   */
  renderBasePrefsData(data) {

    // Get scope
    const scope = this.view.scope;

    /**
     * Get widget
     * @type {Widget}
     */
    const widget = scope.controller.getContainment();

    // Get default prefs
    const defaultPrefs = widget.controller.getPreferences().defaults;

    const $tabs = this.renderTabs(),
        $container = this.renderTabItemsContent();

    let text = 'Widget';
    let form = WidgetPreferences.mergeWidgetPrefs(defaultPrefs, widget.model.getConfig('preferences'));

    this.$.append($tabs, $container);

    this.addTabItem($tabs, {
      uuid: 'widget',
      text: text,
      $container: $container,
      content: this.renderPrefsForm(form, text)
    }, true);

    if (widget.content.controller.isMetamorphic()) {
      text = 'Metamorphic';
      form = widget.content.controller.fetchGalleryWidgets(widget.content.model.getMetamorphicPreferences(true));
      this.addTabItem($tabs, {
        uuid: text.toLowerCase(),
        text: text,
        $container: $container,
        content: this.renderPrefsForm(form, text)
      });
    }

    text = scope.name.humanize();
    this.addTabItem($tabs, {
      uuid: 'content',
      text: text,
      $container: $container,
      content: this.renderPrefsForm(data, text)
    });

    text = 'Interactions';
    this.addTabItem($tabs, {
      uuid: 'widget-interactions',
      text: text,
      $container: $container,
      content: this.renderPrefsForm(this.renderWidgetInteractions(widget), text)
    });

    text = 'Parallax';
    this.addTabItem($tabs, {
      uuid: 'widget-parallax',
      text: text,
      $container: $container,
      content: this.renderPrefsForm(this.renderWidgetParallax(widget), text)
    });

    text = 'Layout';
    this.addTabItem($tabs, {
      uuid: 'layout',
      text: text,
      $container: $container,
      content: this.renderPrefsForm(this.renderLayoutInteractions(widget), text)
    });

    text = 'Source';
    this.addTabItem($tabs, {
      uuid: 'source',
      text: text,
      $container: $container,
      content: this.renderSource(this.view.get$item().$.parent().html(), 'xml', {visible: true})
    });
  }

  /**
   * Render widget interactions
   * @memberOf WidgetPreferences
   * @param {Widget|{permission}} widget
   * @returns {*}
   */
  renderWidgetInteractions(widget) {
    const preferences = widget.model.getConfig('preferences'),

        maximizablePermission = !!widget.permission.getCapability('maximizable'),
        zoomablePermission = !!widget.permission.getCapability('zoomable'),
        draggablePermission = !!widget.permission.getCapability('draggable'),
        resizablePermission = !!widget.permission.getCapability('resizable'),

        maximizable = maximizablePermission ? !!preferences.maximizable : false,
        zoomable = zoomablePermission ? !!preferences.zoomable : false,
        draggable = draggablePermission ? !!preferences.draggable : false,
        resizable = resizablePermission ? !!preferences.resizable : false;

    // Get interaction prefs
    const interactions = widget.controller.getPreferences().interactions;

    interactions.overlapping.checked = preferences.overlapping;
    interactions.maximizable.disabled = !maximizablePermission;
    interactions.maximizable.checked = maximizable;
    interactions.zoomable.disabled = !zoomablePermission;
    interactions.zoomable.checked = zoomable;
    interactions.draggable.disabled = !draggablePermission;
    interactions.draggable.checked = draggable;
    interactions.resizable.disabled = !resizablePermission;
    interactions.resizable.checked = resizable;

    return WidgetPreferences.mergeWidgetPrefs(interactions, preferences);
  }

  /**
   * Render widget parallax
   * @memberOf WidgetPreferences
   * @param {Widget} widget
   * @returns {*}
   */
  renderWidgetParallax(widget) {

    // Get parallax prefs
    const parallax = widget.controller.getPreferences().parallax;

    return WidgetPreferences.mergeWidgetPrefs(parallax, widget.model.getConfig('preferences'));
  }

  /**
   * Render Layout interactions
   * @memberOf WidgetPreferences
   * @param {Widget} widget
   * @returns {*}
   */
  renderLayoutInteractions(widget) {

    // Get layout prefs
    const layout = widget.controller.getPreferences().layout;

    /**
     * Define controller
     * @type {*}
     */
    const controller = this.view.controller;

    // Define dom prefs
    const column = controller.getDOMPreferences('column'),
        row = controller.getDOMPreferences('row'),
        width = controller.getDOMPreferences('relWidth'),
        height = controller.getDOMPreferences('relHeight');

    layout.column.value = column;
    layout.row.value = row;
    layout.width.value = width;
    layout.height.value = height;

    return WidgetPreferences.mergeWidgetPrefs(layout, widget.model.getConfig('preferences'));
  }
}
