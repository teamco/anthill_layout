/**
 * Created by teamco on 27/05/2017.
 */
import {PageRulesVisualizer} from './page.rules.visualizer';

/**
 * @class GenerateRules
 * @type {GenerateRules}
 */
export class GenerateRules extends PageRulesVisualizer {

  /**
   * GenerateRules
   * @class GenerateRules
   * @param {string} id
   * @param {Page} page
   * @constructor
   */
  constructor(id, page) {
    super();

    /**
     * @property GenerateRules
     * @type {string}
     */
    this.id = id;

    /**
     * @property GenerateRules
     * @type {Page}
     */
    this.page = page;

    /**
     * @property GenerateRules
     * @type {{}}
     */
    this.cache = {};
  }

  /**
   * updateConnectivity
   * @method updateConnectivity
   * @memberOf GenerateRules
   * @param node
   * @static
   */
  static updateConnectivity(node) {
    const shape = node.findObject(node.data.name),
        condition = node.findLinksInto().count;
    shape.stroke = condition ? 'lightcoral' : 'green';
    shape.strokeWidth = 2;
  }

  /**
   * Whenever a GoJS transaction has finished modifying the model
   * @method modelChanged
   * @memberOf GenerateRules
   * @param {Event|{isTransactionFinished}} e
   * @static
   */
  static modelChanged(e) {
    if (e.isTransactionFinished) {
      //saveModel();
    }
  }

  /**
   * @method ruleDiagramDoubleClick
   * @memberOf GenerateRules
   * @static
   * @param {Page} page
   * @param data
   */
  static ruleDiagramDoubleClick() {
    // TODO (teamco): Do something.
  }

  /**
   * @method defineTemplate
   * @memberOf GenerateRules
   * @param go
   * @returns {window.go.Part}
   * @static
   */
  static defineTemplate(go) {
    const _make = go.GraphObject.make;
    const node = _make(go.Node, 'Auto', {click: GenerateRules.showConnections},
        _make(go.Shape,
            new go.Binding('figure', 'figure'), {
              // name: 'shape',
              strokeWidth: 0.5,
              portId: '',
              cursor: 'pointer',
              fromLinkable: true,
              toLinkable: true,
              fromLinkableSelfNode: true,
              toLinkableSelfNode: true,
              fromLinkableDuplicates: true,
              toLinkableDuplicates: true
            },
            new go.Binding('name', 'name'),
            new go.Binding('fill', 'color'),
            new go.Binding('stroke', 'isHighlighted', h => h ? 'red' : 'gray').ofObject()
        )
    );

    node.linkConnected = GenerateRules.updateConnectivity;
    node.linkDisconnected = GenerateRules.updateConnectivity;

    node.add(_make(go.Picture, {
          width: 32,
          height: 32,
          alignment: go.Spot.Center,
          opacity: 0.5,
          margin: new go.Margin(10, 10)
        },
        {sourceCrossOrigin: () => 'use-credentials'},
        new go.Binding('source', 'path'))
    );

    node.add(_make(go.TextBlock, {
          margin: new go.Margin(5, 10),
          font: 'normal 14px Tahoma',
          cursor: 'pointer'
        },
        {
          toolTip: _make('ToolTip', _make(go.TextBlock, {margin: 4},
              new go.Binding('text', '', data => data.key)))
        },
        new go.Binding('text', 'title'))
    );

    return node;
  }

  /**
   * createDiagram
   * @method createDiagram
   * @memberOf GenerateRules
   * @param {go} go
   */
  createDiagram(go) {

    if (!go) {
      this.scope.logger.warn('Go.js should be initialized');
      return false;
    }

    const _make = window.go.GraphObject.make;

    /**
     * @constant
     * @type {HTMLDivElement|HTMLElement}
     */
    const div = document.getElementById(this.id);

    if (!div) {
      this.scope.logger.warn('<DIV> should be in DOM');
      return false;
    }

    /**
     * @property GenerateRules
     * @type {window.go.Diagram}
     */
    this.diagram = _make(window.go.Diagram, this.id, {
      layout: _make(window.go.LayeredDigraphLayout),
      initialDocumentSpot: window.go.Spot.TopCenter,
      initialViewportSpot: window.go.Spot.TopCenter,
      initialAutoScale: window.go.Diagram.Uniform
    });

    this.diagram.initialContentAlignment = window.go.Spot.Center;
    this.diagram.nodeTemplate = GenerateRules.defineTemplate(go);
    this.diagram.model = this.updateModel(go);
    this.diagram.undoManager.isEnabled = true;

    this.diagram.addDiagramListener('ObjectSingleClicked', this.objectSingleClicked.bind(this));
    this.diagram.ModelChanged = GenerateRules.modelChanged.bind(this);
    this.diagram.addDiagramListener('ChangedSelection', this.changedSelection.bind(this));

    this.updatePublishedRules();
    this.updateSubscriberRules();
    this.handleNodeDblClick(this.page);
  }

  /**
   * @method handleNodeDblClick
   * @memberOf GenerateRules
   * @param {Page} page
   */
  handleNodeDblClick(page) {
    this.diagram.addDiagramListener('ObjectDoubleClicked', function(e) {
      const data = e.subject.part.data || {};

      /**
       * @constant method
       * @type {GenerateRules.widgetDiagramDoubleClick|GenerateRules.ruleDiagramDoubleClick|Function}
       */
      const method = GenerateRules[`${data.name}DiagramDoubleClick`];
      if (typeof GenerateRules[`${data.name}DiagramDoubleClick`] === 'function') {
        method(page, data);
      } else {
        page.logger.warn('Undefined diagram element method', data.name);
      }
    });
  }

  /**
   * @method widgetDiagramDoubleClick
   * @memberOf GenerateRules
   * @static
   * @param {Page} page
   * @param data
   */
  static widgetDiagramDoubleClick(page, data) {

    /**
     * @constant widget
     * @type {Widget}
     */
    const widget = page.model.getItemByUUID(data.key);

    /**
     * @constant workspace
     * @type {Workspace}
     */
    const workspace = page.controller.getContainment();

    /**
     * @constant panel
     * @type {Panel}
     */
    const panel = workspace.controller.getDesignTimePanel();

    /**
     * @constant widgetRules
     * @type {WidgetRules}
     */
    const widgetRules = panel.model.getModuleBy('name', 'widget-rules');

    /**
     * @type {{setActiveContent, prepareActiveComponent}}
     */
    const eventList = widgetRules.eventManager.eventList;
    const config = widget.model.getConfig();

    // Set active widget
    widgetRules.observer.publish(eventList.setActiveContent, data.key);
    widgetRules.observer.publish(eventList.prepareActiveComponent, [config, true]);
  }

  /**
   * Update model when the Diagram.selection changes
   * @method changedSelection
   * @memberOf GenerateRules
   */
  changedSelection() {
    this.diagram.model.selectedNodeData = null;
    const it = this.diagram.selection.iterator;
    while (it.next()) {
      const node = it.value;
      // Ignore a selected link or a deleted node
      if (node instanceof window.go.Node && node.data) {
        this.diagram.model.selectedNodeData = node.data;
        break;
      }
    }
  }

  /**
   * @method objectSingleClicked
   * @memberOf GenerateRules
   * @param {Event|{subject}} e
   */
  objectSingleClicked(e) {
    const part = e.subject.part;
    if (part instanceof window.go.Link) {
      // TODO (teamco): Do something.
    } else {
      this.diagram.clearHighlighteds();
    }
  }

  /**
   * @method updateModel
   * @memberOf GenerateRules
   * @param go
   * @returns {window.go.GraphLinksModel}
   */
  updateModel(go) {
    return new go.GraphLinksModel(GenerateRules.getWidgets(this.page));
  }

  /**
   * updateDiagram
   * @method updateDiagram
   * @memberOf GenerateRules
   * @param {Object} rule
   */
  updateDiagram(rule) {
    this.diagram.model.addNodeData({
      key: rule.key,
      name: 'rule',
      figure: 'Ellipse',
      color: rule.color,
      title: `${rule.title}: (${rule.count})`,
      description: rule.title.humanize()
    });
    this.updateLink(
        this.diagram.findNodeForKey(rule.uuid),
        this.diagram.findNodeForKey(rule.key), {event: false}
    );
  }

  /**
   * @method updateLink
   * @memberOf GenerateRules
   * @param from
   * @param to
   * @param opts
   */
  updateLink(from, to, opts) {
    opts = opts || {};
    const color = opts.color || 'black',
        event = opts.event,
        _make = window.go.GraphObject.make;

    const _fKey = from.data.key,
        _tKey = to.data.key;

    if (event) {
      const _from = this.cache[_fKey];
      if (_from) {
        if (_from.indexOf(_tKey) > -1) {
          return false;
        } else {
          this.cache[_fKey].push(_tKey);
        }
      } else {
        this.cache[_fKey] = [_tKey];
      }
    }

    this.diagram.add(
        _make(window.go.Link, {
              fromNode: from,
              toNode: to,
              adjusting: window.go.Link.Stretch,
              routing: window.go.Link.AvoidsNodes,
              curve: window.go.Link.JumpOver,
              toShortLength: 3,
              corner: 5,
              reshapable: true,
              relinkableFrom: true,
              relinkableTo: true
            },
            _make(window.go.Shape, {
              isPanelMain: true,
              stroke: color,
              strokeWidth: 1
            }),
            _make(window.go.Shape, {
              toArrow: 'Standard',
              stroke: null,
              strokeWidth: 0
            })
        )
    );
  }

  /**
   * updatePublishedRules
   * @method updatePublishedRules
   * @memberOf GenerateRules
   */
  updatePublishedRules() {
    const published = this.getWidgetPublishedRules(this.page);
    const that = this;
    window._.each(published, rules => window._.each(rules, rule => that.updateDiagram(rule)));
  }

  /**
   * updateSubscriberRules
   * @method updateSubscriberRules
   * @memberOf GenerateRules
   */
  updateSubscriberRules() {
    const subscribed = this.getWidgetSubscriberRules(this.page);
    const that = this;
    window._.each(subscribed, sData =>
        window._.each(sData, data =>
            window._.each(data.subscribers, uuids =>
                window._.each(uuids, uuid =>
                    that.updateLink(
                        that.diagram.findNodeForKey(data.key),
                        that.diagram.findNodeForKey(uuid), {event: true})))));
  }

  /**
   * Highlight all Links and Nodes coming out of a given Node
   * @method showConnections
   * @memberOf GenerateRules
   * @param e
   * @param node
   * @static
   */
  static showConnections(e, node) {
    const diagram = node.diagram;
    diagram.startTransaction('highlight');
    // remove any previous highlighting
    diagram.clearHighlighteds();
    // for each Link coming out of the Node, set Link.isHighlighted
    node.findLinksOutOf().each(l => l.isHighlighted = true);
    // for each Node destination for the Node, set Node.isHighlighted
    node.findNodesOutOf().each(n => n.isHighlighted = true);
    diagram.commitTransaction('highlight');
  }
}