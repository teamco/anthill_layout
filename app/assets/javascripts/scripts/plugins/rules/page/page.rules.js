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
         */
        onClick: function onClick() {
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
          var node = _make(go.Node, 'Auto',
              {click: this.showConnections},
              _make(go.Shape, new go.Binding('figure', 'figure'),
                  {strokeWidth: 0.5},
                  new go.Binding('fill', 'color'),
                  new go.Binding('stroke', 'isHighlighted', function(h) {
                    return h ? 'red' : 'black';
                  }).ofObject())
          );

          node.add(_make(go.Picture, {
                width: 32,
                height: 32,
                alignment: go.Spot.Center,
                opacity: 0.5,
                margin: new go.Margin(10, 10)
              }, {
                sourceCrossOrigin: function() {
                  return 'use-credentials';
                }
              },
              new go.Binding('source', 'path'))
          );

          node.add(_make(go.TextBlock, {
                margin: new go.Margin(5, 10),
                font: 'normal 14px Tahoma'
              },
              new go.Binding('text', 'title'))
          );

          return node;
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
          this.diagram.model.addNodeData({
            key: rule.key,
            figure: 'Rectangle',
            color: rule.color,
            title: rule.title + ' (' + rule.count + ')',
            description: rule.title.humanize()
          });
          this.updateLink(
              this.diagram.findNodeForKey(rule.uuid),
              this.diagram.findNodeForKey(rule.key),
              'blue'
          );
        },

        updateLink: function updateLink(from, to, opts) {
          opts = opts || {};
          var color = opts.color || 'black';
          var _make = go.GraphObject.make;
          this.diagram.add(
              _make(go.Link, {
                    fromNode: from,
                    toNode: to,
                    routing: go.Link.Normal,
                    curve: go.Link.Bezier
                  },
                  _make(go.Shape, {
                    isPanelMain: true,
                    stroke: color,
                    strokeWidth: 2
                  }),
                  _make(go.Shape, {
                    toArrow: 'standard',
                    stroke: null,
                    strokeWidth: 0
                  })
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
          var subscribed = this.getWidgetSubscriberRules(this.page);
          var that = this;
          _.each(subscribed, function(sData) {
            _.each(sData, function(data) {
              _.each(data.subscribers, function(uuids) {
                _.each(uuids, function(uuid) {
                  that.updateLink(
                      that.diagram.findNodeForKey(data.key),
                      that.diagram.findNodeForKey(uuid)
                  );
                });
              });
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
