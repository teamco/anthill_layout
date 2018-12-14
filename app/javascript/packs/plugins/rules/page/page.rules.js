/**
 * Created by teamco on 27/05/2017.
 */

import {PageRulesVisualizer} from './page.rules.visualizer';
import go from 'gojs';

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
  }

  /**
   * createDiagram
   * @method createDiagram
   * @memberOf GenerateRules
   */
  createDiagram() {

    if (!go) {
      this.scope.logger.warn('Go.js should be initialized');
      return false;
    }

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
     * @type {go.Diagram}
     */
    this.diagram = new go.Diagram(div);

    this.diagram.initialContentAlignment = go.Spot.Center;
    this.diagram.nodeTemplate = GenerateRules.defineTemplate(go);
    this.diagram.model = this.updateModel(go);
    this.diagram.undoManager.isEnabled = true;

    this.diagram.addDiagramListener('ObjectSingleClicked', this.objectSingleClicked.bind(this));
    this.diagram.ModelChanged = GenerateRules.modelChanged.bind(this);
    this.diagram.addDiagramListener('ChangedSelection', this.changedSelection.bind(this));

    this.updatePublishedRules();
    this.updateSubscriberRules();
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
      if (node instanceof go.Node && node.data) {
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
    if (part instanceof go.Link) {
    } else {
      this.diagram.clearHighlighteds();
    }
  }

  /**
   * updateConnectivity
   * @method updateConnectivity
   * @memberOf GenerateRules
   * @param node
   * @param link
   * @param port
   * @static
   */
  static updateConnectivity(node, link, port) {
    const shape = node.findObject('shape'),
        condition = node.findLinksInto().count;
    shape.stroke = condition ? 'lightcoral' : 'green';
    shape.strokeWidth = 2;
  }

  /**
   * @method defineTemplate
   * @memberOf GenerateRules
   * @param go
   * @returns {go.Part}
   * @static
   */
  static defineTemplate(go) {
    const _make = go.GraphObject.make;
    const node = _make(go.Node, 'Auto', {click: GenerateRules.showConnections},
        _make(go.Shape, new go.Binding('figure', 'figure'), {
              name: 'shape',
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
            new go.Binding('fill', 'color'),
            new go.Binding('stroke', 'isHighlighted', h => h ? 'red' : 'black').ofObject()));

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
        new go.Binding('text', 'title'))
    );

    return node;
  }

  /**
   * @method updateModel
   * @memberOf GenerateRules
   * @param go
   * @returns {go.GraphLinksModel}
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
      figure: 'Rectangle',
      color: rule.color,
      title: rule.title + ' (' + rule.count + ')',
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
        _make = go.GraphObject.make;

    if (event && from.findLinksOutOf().count === 1) {
      return false;
    }

    this.diagram.add(
        _make(go.Link, {
              fromNode: from,
              toNode: to,
              routing: go.Link.Normal,
              curve: go.Link.Bezier,
              relinkableFrom: true,
              relinkableTo: true
            },
            _make(go.Shape, {
              isPanelMain: true,
              stroke: color,
              strokeWidth: 2
            }),
            _make(go.Shape, {
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
    const _ = this.page.utils._;
    _.each(published, rules => _.each(rules, rule => that.updateDiagram(rule)));
  }

  /**
   * updateSubscriberRules
   * @method updateSubscriberRules
   * @memberOf GenerateRules
   */
  updateSubscriberRules() {
    const subscribed = this.getWidgetSubscriberRules(this.page);
    const that = this;
    const _ = this.page.utils._;
    _.each(subscribed, sData =>
        _.each(sData, data =>
            _.each(data.subscribers, uuids =>
                _.each(uuids, uuid => that.updateLink(
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