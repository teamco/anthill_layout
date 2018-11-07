/**
 * Created with RubyMine.
 * User: teamco
 * Date: 3/7/14
 * Time: 7:39 PM
 */

/**
 * @constant BasePreferencesElement
 * @type {module.BasePreferencesElement}
 */
const BasePreferencesElement = require('./preferences.js');

/**
 * @class PagesPreferences
 * @extends BasePreferencesElement
 * @type {module.PagesPreferences}
 */
module.exports = class PagesPreferences extends BasePreferencesElement {

  /**
   * @constructor
   */
  constructor() {
    super('PagesPreferences');
  }

  /**
   * Render data
   * @memberOf PagesPreferences
   * @param {{data, page}} opts
   */
  renderData(opts) {

    /**
     * Get workspace
     * @type {module.Workspace}
     */
    const ws = this.view.controller.getWorkspace();

    // Get ws default page config
    const config = ws.model.getConfig('page');

    // Get page prefs
    const pagePrefs = opts.page.model.getConfig('preferences');

    ws.utils.isUrl();

    /**
     * Get page
     * @type {Page}
     */
    const page = opts.page;

    // Get default prefs
    const defaultPrefs = page.controller.getPreferences();

    defaultPrefs.pageUrl.monitor.callback = this.toggleOpenUrlInDialog.bind(this);
    defaultPrefs.pageUrl.validate.mask = ws.utils.isUrl.regex;

    defaultPrefs.uuid.value = page.model.getUUID();
    defaultPrefs.pageOpenUrlInDialog.disabled = !(pagePrefs.pageUrl && pagePrefs.pageUrl.length);
    defaultPrefs.animateSwipe.value = config.animateSwipe;
    defaultPrefs.showInTabs.value = config.showInTabs;

    /**
     * Define dom nodes
     * @type {Array}
     */
    const nodes = [];

    /**
     * Merge prefs
     * @param defaults
     * @param prefs
     * @returns {{}}
     * @private
     */
    function _mergePrefs(defaults, prefs) {
      for (const index in prefs) {
        if (prefs.hasOwnProperty(index)) {
          if (defaults.hasOwnProperty(index)) {
            defaults[index].value = prefs[index];
          } else if (defaults.hasOwnProperty(prefs[index])) {

            // input-radio
            defaults[prefs[index]].value = true;
          }
        }
      }

      return defaults;
    }

    /**
     * Merge prefs with default data
     * @type {{}}
     */
    opts.data = _mergePrefs(defaultPrefs, $.extend(opts.data, {}, true));

    for (const index in opts.data) {
      if (opts.data.hasOwnProperty(index)) {

        /**
         * Define isCheckBox
         * @type {boolean}
         */
        const isCheckBox = opts.data[index].type === 'checkbox';

        /**
         * Define class name
         * @type {string}
         */
        const className = 'page-prefs' + (isCheckBox ? ' checkbox' : '');
        const nodeRenderer = this.view.getNodeRenderer(opts.data[index], index.toPoint().humanize(), index);

        nodes.push($('<li />').append(nodeRenderer).addClass(className));
      }
    }

    const $tabs = this.renderTabs(),
        $container = this.renderTabItemsContent();

    this.$.append($tabs, $container);

    this.renderMetaData($tabs, $container, nodes);
    this.renderLayout($tabs, $container, opts.page);
    this.renderWidgets($tabs, $container, opts.page);
  }

  /**
   * @memberOf PagesPreferences
   * @param $tabs
   * @param $container
   * @param nodes
   */
  renderMetaData($tabs, $container, nodes) {
    this.addTabItem($tabs, {
      uuid: 'meta_data',
      text: 'Meta Data',
      $container: $container,
      content: $('<ul class="default" />').append(nodes)
    }, true);
  }

  /**
   * @memberOf PagesPreferences
   * @param $tabs
   * @param $container
   * @param page
   */
  renderLayout($tabs, $container, page) {
    this.addTabItem($tabs, {
      uuid: 'layout',
      text: 'Layout',
      $container: $container,
      content: this.renderLayoutPrefs(page)
    });
  }

  /**
   * @memberOf PagesPreferences
   * @param $tabs
   * @param $container
   * @param page
   */
  renderWidgets($tabs, $container, page) {
    const node = this.renderWidgetsPrefs(page);
    this.addTabItem($tabs, {
      uuid: 'widgets',
      text: node[1],
      $container: $container,
      content: node[0]
    });
  }

  /**
   * Render Layout prefs
   * @memberOf PagesPreferences
   * @param {Event} e
   * @returns {*}
   */
  toggleOpenUrlInDialog(e) {
    const url = e.target.value,
        $toggleDialog = $('input[name="pageOpenUrlInDialog"]');

    $toggleDialog.prop({disabled: !url.length});
  }

  /**
   * Render Layout prefs
   * @memberOf PagesPreferences
   * @param {Page} page
   * @returns {*}
   */
  renderLayoutPrefs(page) {

    /**
     * Define layout
     * @type {module.Layout}
     */
    const layout = page.controller.getLayout();

    const workspace = page.controller.getContainment();
    const modes = page.LAYOUT_MODES;

    /**
     * Define layout container
     * @type {*|jQuery}
     */
    const $ul = $('<ul class="page-layout-prefs" />');

    /**
     * Define dom prefs
     * @type {Number}
     */
    const cellWidth = layout.controller.minCellWidth();

    /**
     * Get static width value
     * @type {boolean|*}
     */
    const staticWidth = workspace.model.getConfig('preferences').staticWidth;

    /**
     * Get page scroll height
     * @type {string}
     */
    const pageScrollHeight = page.model.getConfig(
        'preferences').pageScrollHeight;

    /**
     * Get page width
     * @type {number|string}
     */
    const width = staticWidth ? page.view.get$item().getWidth() : 'Flexible';

    // Get padding
    const padding = page.model.getConfig('html/padding');

    const text = 'Mode',
        $combo = $([
          '<div class="input-group">',
          '<span class="input-group-addon">', text, '</span>',
          '</div>'
        ].join(''));

    return $ul.append([

      $('<li class="layout-behavior" />').append(
          $combo.append(
              this.renderCombobox([
                    {
                      type: 'text',
                      value: modes.freeStyle
                    },
                    {
                      type: 'text',
                      value: modes.jqUIGrid
                    },
                    {
                      type: 'text',
                      value: modes.snap2grid
                    }
                  ],
                  layout.controller.getBehaviorMode(),
                  'Mode',
                  'layoutMode',
                  undefined,
                  true)
          )
      ),

      $('<li class="layout-cell-width" />').append(
          this.renderTextField({
            name: 'layout-cell-width',
            text: 'Cell size',
            value: cellWidth.toFixed(3),
            visible: true,
            disabled: true
          })
      ),

      $('<li class="page-width" />').append(
          this.renderTextField({
            name: 'page-width',
            text: 'Page width',
            value: width,
            visible: true,
            disabled: true
          })
      ),

      $('<li class="page-scroll-height" />').append(
          this.renderNumberField({
            name: 'pageScrollHeight',
            text: 'Scroll height',
            value: parseInt(pageScrollHeight, 10) || 0,
            visible: true,
            disabled: false
          })
      ),

      $('<li class="page-layout-columns" />').append(
          this.renderNumberField({
            name: 'layoutColumns',
            text: 'Columns',
            value: layout.config.grid.columns,
            visible: true,
            disabled: true
          })
      ),

      $('<li class="page-padding" />').append(
          this.renderNumberField({
            name: 'pagePaddingTop',
            text: 'Padding top',
            value: padding.top,
            visible: true,
            disabled: false
          })
      ),

      $('<li class="page-padding" />').append(
          this.renderNumberField({
            name: 'pagePaddingLeft',
            text: 'Padding left',
            value: padding.left,
            visible: true,
            disabled: false
          })
      ),

      $('<li class="page-padding" />').append(
          this.renderNumberField({
            name: 'pagePaddingBottom',
            text: 'Padding bottom',
            value: padding.bottom,
            visible: true,
            disabled: false
          })
      ),

      $('<li class="page-padding" />').append(
          this.renderNumberField({
            name: 'pagePaddingRight',
            text: 'Padding right',
            value: padding.right,
            visible: true,
            disabled: false
          })
      )
    ]);
  }

  /**
   * Render widgets prefs
   * @memberOf PagesPreferences
   * @param {Page} page
   * @returns {*}
   */
  renderWidgetsPrefs(page) {

    /**
     * Get page items
     * @type {*}
     */
    const widgets = page.model.getItems();

    /**
     * Render widgets
     * @returns {Array}
     * @private
     */
    function _renderWidgets() {
      const list = [];

      for (let index in widgets) {
        if (widgets.hasOwnProperty(index)) {

          /**
           * Define widget
           * @type {Widget}
           */
          const widget = widgets[index];

          /**
           * Define uuid
           * @type {string}
           */
          const uuid = widget.model.getUUID();

          /**
           * Get widget preferences
           * @type {*}
           */
          const preferences = widget.model.getConfig('preferences');

          const locateOn = 'mouseenter.widgetPrefs mouseleave.widgetPrefs click.widgetPrefs',
              thumbnail = preferences.thumbnail || '',
              css = thumbnail.length > 0 ? {backgroundImage: 'url("' + thumbnail + '")'} : {};

          /**
           * Get title
           * @type {*|String}
           */
          const title = widget.model.getItemTitle();

          /**
           * Define widget element
           * @type {*|jQuery}
           */
          const $li = $('<li class="widget widget-prefs" />').addClass(
              this.view.controller.getResourceClassName(preferences.resource)
          ).attr({
            rel: uuid,
            title: title
          }).css(css).off(locateOn).on(locateOn, this.showWidgetPrefs.bind(this));

          this.renderTooltip({
            title: title,
            description: preferences.description || '',
            selector: $li
          });

          list.push($li);
        }
      }

      return list.length > 0 ? list : '<li class="no-content">No content available</li>';
    }

    /**
     * Define widgets container
     * @type {*|jQuery}
     */
    const $ul = $('<ul class="default widgets-prefs" />'),
        cname = 'Widgets: ' + Object.keys(widgets).length + ' items';

    return [
      $ul.append(
          this.renderPageWidgetsGlobalPrefs(),
          '<li class="separator" />',
          _renderWidgets.bind(this)()
      ),
      cname
    ];
  }

  /**
   * Render page widgets global preferences
   * @memberOf PagesPreferences
   * @returns {Array}
   */
  renderPageWidgetsGlobalPrefs() {

    /**
     * Get active page
     * @type {Page}
     */
    const page = this.view.scope.activeContent;

    /**
     * Define page widgets global prefs
     * @type {{overlapping: {type: string, disabled: boolean, checked: boolean, visible: boolean}}}
     */
    const globalPrefs = {
      overlapping: {
        type: 'checkbox',
        disabled: false,
        checked: page.model.getConfig('widget/overlapping'),
        visible: true
      }
    };

    /**
     * Define List node
     * @type {Array}
     */
    const nodes = [];
    let $element;

    for (const index in globalPrefs) {
      if (globalPrefs.hasOwnProperty(index)) {
        const node = globalPrefs[index];

        /**
         * Define text
         * @type {string}
         */
        const text = index.toPoint().humanize();

        if (node.type === 'checkbox') {

          /**
           * Get checkbox
           * @type {*[]}
           */
          $element = this.renderCheckbox({
            name: index,
            text: text.trim(),
            checked: node.checked,
            value: node.checked,
            disabled: node.disabled,
            visible: node.visible
          });
        }

        nodes.push(
            $('<li class="page-widget-prefs" />').addClass([
              [page.name.toClassName(), index].join('-'),
              node.type,
              node.visible ? '' : 'hidden'
            ].join(' ')).append($element)
        );
      }
    }

    return nodes;
  }

  /**
   * Show Widget prefs
   * @memberOf PagesPreferences
   * @param {Event} e
   */
  showWidgetPrefs(e) {

    /**
     * Get view
     * @type {BaseView}
     */
    const view = this.view;

    // Get $widget item ui
    const $widget = $(e.target);

    /**
     * Get uuid
     * @type {*|jQuery}
     */
    const uuid = $widget.attr('rel');

    /**
     * Define panel
     * @type {Panel}
     */
    const panel = view.controller.getDesignTimePanel();

    /**
     * Define module name
     * @type {string}
     */
    const module = 'page-data';

    /**
     * Define page data
     * @type {*|module.PageData}
     */
    const pageData = panel.controller.getModuleByName('page-data');

    /**
     * Get scope
     * @type {WorkspaceData}
     */
    const scope = view.scope;

    /**
     * Open panel
     * @param {function} callback
     * @private
     */
    function _openPanel(callback) {
      $widget.popover('hide');
      scope.observer.publish(scope.eventManager.eventList.switchToActivePage);
      panel.observer.publish(panel.eventManager.eventList.openPanel, [module, e]);
      panel.observer.publish(panel.eventManager.eventList.openPanel, [module, e, callback]);
    }

    if (e.type === 'mouseenter' || e.type === 'mouseleave') {
      _openPanel(pageData.view.controller.locateElementItem.bind({
        scope: pageData,
        uuid: uuid
      }));
    }
  }
};
