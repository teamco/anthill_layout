define(function definePageRulesVisualizer() {

  /**
   * PageRulesVisualizer
   * @class PageRulesVisualizer
   * @constructor
   */
  var PageRulesVisualizer = function PageRulesVisualizer() {
  };

  return PageRulesVisualizer.extend('PageRulesVisualizer', {

    /**
     * getWidgets
     * @memberOf PageRulesVisualizer
     * @method getWidgets
     * @param {Page} page
     */
    getWidgets: function getWidgets(page) {
      var widgets = page.model.getItems();
      return _.map(widgets, function(widget) {
        var prefs = widget.model.getConfig('preferences'),
            imgPath = '/assets/scripts/plugins/stylesheets/images/';
        return {
          key: widget.model.getUUID(),
          figure: 'RoundedRectangle',
          title: prefs.title,
          description: prefs.description,
          color: '#dedede',
          path: imgPath + prefs.resource + '.png'
        };
      });
    },

    /**
     * getWidgetPublishedRules
     * @method getWidgetPublishedRules
     * @memberOf PageRulesVisualizer
     * @param {Page} page
     */
    getWidgetPublishedRules: function getWidgetPublishedRules(page) {

      /**
       * _node
       * @param widget
       * @param rule
       * @param {string} color
       * @param {array} subscribers
       * @returns {{
       *    key: string,
       *    title: *,
       *    uuid: (*|String),
       *    color: *,
       *    count: (number|Number)
       * }}
       * @private
       */
      function _node(widget, rule, color, subscribers) {
        return {
          key: rule + ':' + widget.model.getUUID(),
          title: rule,
          uuid: widget.model.getUUID(),
          color: color,
          count: (subscribers[rule] || []).length
        };
      }

      var widgets = page.model.getItems();
      return _.filter(_.map(widgets, function(widget) {
        var rules = widget.model.getConfig('rules'),
            publish = rules.publish || {},
            subscribers = rules.subscribers || {},
            resource = widget.model.getConfig('preferences/resource'),
            resourceRules = publish[resource.toCamel().toLowerCase()],
            data = [];
        if (publish.widget) {
          data = _.map(publish.widget, function(rule) {
            return _node(widget, rule, 'lightgreen', subscribers);
          });
        }
        if (resourceRules) {
          return data.concat(_.map(resourceRules, function(rule) {
            return _node(widget, rule, 'lightblue', subscribers);
          }));
        }
        return data;
      }), Boolean);
    },

    /**
     * getWidgetSubscriberRules
     * @method getWidgetSubscriberRules
     * @memberOf PageRulesVisualizer
     * @param {Page} page
     */
    getWidgetSubscriberRules: function getWidgetSubscriberRules(page) {
      var widgets = page.model.getItems();
      return _.filter(_.map(widgets, function(widget) {
        var rules = widget.model.getConfig('rules'),
            subscribers = rules.subscribers,
            publish = rules.publish || {};
        if (subscribers) {
          return _.map(publish.widget, function(rule) {
            return {
              key: rule + ':' + widget.model.getUUID(),
              subscribers: subscribers
            };
          });
        }
      }), Boolean);
    }
  });
});