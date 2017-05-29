/**
 * Created by teamco on 27/05/2017.
 */

define(['plugins/rules/page/page.rules.visualizer'],
    function definePageRules(PageRulesVisualizer) {

      /**
       * GenerateRules
       * @class GenerateRules
       * @param {string} id
       * @constructor
       */
      var GenerateRules = function GenerateRules(id, page) {

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

        this.createDiagram();
      };

      return GenerateRules.extend('GenerateRules', {

        /**
         * createDiagram
         * @method createDiagram
         * @memberOf GenerateRules
         */
        createDiagram: function createDiagram() {

          /**
           * @property GenerateRules
           * @type {go.Diagram}
           */
          this.diagram = new go.Diagram(document.getElementById(this.id));

          this.diagram.initialContentAlignment = go.Spot.Center;
          this.diagram.nodeTemplate = this.defineTemplate();
          this.diagram.model = this.updateModel();
          this.diagram.click = this.onClick.bind(this);

          this.updatePublishedRules();
          this.updateSubscriberRules();
        },

        /**
         * @method onClick
         * @memberOf GenerateRules
         * @param e
         */
        onClick: function onClick(e) {
          this.diagram.startTransaction('no highlighteds');
          this.diagram.clearHighlighteds();
          this.diagram.commitTransaction('no highlighteds');
        },

        /**
         * @method defineTemplate
         * @memberOf GenerateRules
         * @returns {go.GraphObject.make}
         */
        defineTemplate: function defineTemplate() {
          var _make = go.GraphObject.make;
          return _make(go.Node, 'Auto',
              {click: this.showConnections},
              _make(go.Shape, new go.Binding('figure', 'figure'),
                  {strokeWidth: 1, stroke: null},
                  new go.Binding('fill', 'color'),
                  new go.Binding('stroke', 'isHighlighted', function(h) {
                    return h ? 'red' : 'black';
                  }).ofObject()),
              _make(go.Picture,
                  {width: 32, height: 32, alignment: go.Spot.Left, margin: 5}, {
                    sourceCrossOrigin: function() {
                      return 'use-credentials';
                    }
                  },
                  new go.Binding('source', 'path')),
              _make(go.TextBlock, {
                    margin: new go.Margin(10, 10, 10, 40),
                    font: 'normal 14px Tahoma'
                  },
                  new go.Binding('text', 'title'))
          );
        },

        /**
         * @method updateModel
         * @memberOf GenerateRules
         * @returns {go.GraphLinksModel}
         */
        updateModel: function updateModel() {
          return new go.GraphLinksModel(this.getWidgets(this.page));
        },

        /**
         * updateDiagram
         * @method updateDiagram
         * @memberOf GenerateRules
         * @param {Object} rule
         */
        updateDiagram: function(rule) {
          var _make = go.GraphObject.make;
          var node = _make(go.Node, 'Auto',
              {click: this.showConnections},
              _make(go.Shape, 'Rectangle',
                  {strokeWidth: 1, stroke: null, fill: rule.color},
                  {click: this.showConnections}
              ),
              _make(go.TextBlock, {
                margin: 10,
                font: 'normal 12px Tahoma',
                text: rule.key
              }));

          this.diagram.add(node);
          this.updateLink(this.diagram.findNodeForKey(rule.uuid), node);
        },

        updateLink: function updateLink(from, to) {
          var _make = go.GraphObject.make;
          this.diagram.add(
              _make(go.Link, {fromNode: from, toNode: to},
                  _make(go.Shape,
                      {isPanelMain: true, stroke: 'black', strokeWidth: 1}),
                  _make(go.Shape,
                      {toArrow: 'standard', stroke: null, strokeWidth: 0})
              )
          );
        },

        /**
         * updatePublishedRules
         * @method updatePublishedRules
         * @memberOf GenerateRules
         */
        updatePublishedRules: function updatePublishedRules() {
          var published = this.getWidgetPublishedRules(this.page);
          var that = this;
          _.each(published, function(rules) {
            _.each(rules, function(rule) {
              that.updateDiagram(rule);
            });
          });
        },

        /**
         * updateSubscriberRules
         * @method updateSubscriberRules
         * @memberOf GenerateRules
         */
        updateSubscriberRules: function updatePublishedRules() {
          var subscribers = this.getWidgetSubscriberRules(this.page);
          var that = this;
          _.each(subscribers, function(subscriber) {
            _.each(subscriber, function(event, index) {
              that.updateLink(this.diagram.findNodeForKey(uuid), node);
            });
          });
        },

        /**
         * Highlight all Links and Nodes coming out of a given Node
         * @method showConnections
         * @memberOf GenerateRules
         * @param e
         * @param node
         */
        showConnections: function showConnections(e, node) {
          var diagram = node.diagram;
          diagram.startTransaction('highlight');
          // remove any previous highlighting
          diagram.clearHighlighteds();
          // for each Link coming out of the Node, set Link.isHighlighted
          node.findLinksOutOf().each(function(l) {
            l.isHighlighted = true;
          });
          // for each Node destination for the Node, set Node.isHighlighted
          node.findNodesOutOf().each(function(n) {
            n.isHighlighted = true;
          });
          diagram.commitTransaction('highlight');
        }

      }, PageRulesVisualizer.prototype);
    }
);
