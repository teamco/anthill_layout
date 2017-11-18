/**
 * Created by teamco on 27/05/2017.
 */

defineP(['plugins/rules/page/page.rules.visualizer'],
    function definePageRules(PageRulesVisualizer) {

      /**
       * GenerateRules
       * @class GenerateRules
       * @param {string} id
       * @param {Page} page
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
          this.diagram.undoManager.isEnabled = true;

          this.diagram.addDiagramListener('ObjectSingleClicked',
              this.objectSingleClicked.bind(this));
          this.diagram.ModelChanged = this.modelChanged.bind(this);
          this.diagram.addDiagramListener('ChangedSelection',
              this.changedSelection.bind(this));

          this.updatePublishedRules();
          this.updateSubscriberRules();
        },

        /**
         * Whenever a GoJS transaction has finished modifying the model
         * @method modelChanged
         * @memberOf GenerateRules
         * @param {Event} e
         */
        modelChanged: function modelChanged(e) {
          if (e.isTransactionFinished) {
            //saveModel();
          }
        },

        /**
         * Update model when the Diagram.selection changes
         * @method changedSelection
         * @memberOf GenerateRules
         */
        changedSelection: function changedSelection() {
          this.diagram.model.selectedNodeData = null;
          var it = this.diagram.selection.iterator;
          while (it.next()) {
            var node = it.value;
            // Ignore a selected link or a deleted node
            if (node instanceof go.Node && node.data) {
              this.diagram.model.selectedNodeData = node.data;
              break;
            }
          }
        },

        /**
         * @method objectSingleClicked
         * @memberOf GenerateRules
         * @param {Event} e
         */
        objectSingleClicked: function objectSingleClicked(e) {
          var part = e.subject.part;
          if (part instanceof go.Link) {
          } else {
            this.diagram.clearHighlighteds();
          }
        },

        /**
         * updateConnectivity
         * @method updateConnectivity
         * @memberOf GenerateRules
         * @param node
         * @param link
         * @param port
         */
        updateConnectivity: function updateConnectivity(node, link, port) {
          var shape = node.findObject('shape'),
              condition = node.findLinksInto().count;
          shape.stroke = condition ? 'lightcoral' : 'green';
          shape.strokeWidth = 2;
        },

        /**
         * @method defineTemplate
         * @memberOf GenerateRules
         * @returns {go.GraphObject.make}
         */
        defineTemplate: function defineTemplate() {
          var _make = go.GraphObject.make;
          var node = _make(go.Node, 'Auto', {
                click: this.showConnections
              },
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
                  new go.Binding('stroke', 'isHighlighted', function(h) {
                    return h ? 'red' : 'black';
                  }).ofObject())
          );

          node.linkConnected = this.updateConnectivity;
          node.linkDisconnected = this.updateConnectivity;

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
                font: 'normal 14px Tahoma',
                cursor: 'pointer'
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
              this.diagram.findNodeForKey(rule.key), {
                event: false
              }
          );
        },

        /**
         * @method updateLink
         * @memberOf GenerateRules
         * @param from
         * @param to
         * @param opts
         */
        updateLink: function updateLink(from, to, opts) {
          opts = opts || {};
          var color = opts.color || 'black',
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
                      that.diagram.findNodeForKey(uuid), {
                        event: true
                      }
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
