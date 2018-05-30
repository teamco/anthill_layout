/**
 * @class PageRulesVisualizer
 * @type {module.PageRulesVisualizer}
 */
module.exports = class PageRulesVisualizer {

  /**
   * getWidgets
   * @memberOf PageRulesVisualizer
   * @method getWidgets
   * @param {Page} page
   */
  getWidgets(page) {
    const widgets = page.model.getItems();
    return _.map(widgets, function(widget) {
      const prefs = widget.model.getConfig('preferences'),
          imgPath = '/assets/scripts/plugins/widgets/{0}/images/{1}';
      return {
        key: widget.model.getUUID(),
        figure: 'RoundedRectangle',
        title: prefs.title,
        description: prefs.description,
        color: '#dedede',
        path: imgPath.replace(/\{0}/, prefs.resource).replace(/\{1}/, prefs.resource + '.png')
      };
    });
  }

  /**
   * getWidgetPublishedRules
   * @method getWidgetPublishedRules
   * @memberOf PageRulesVisualizer
   * @param {Page} page
   */
  getWidgetPublishedRules(page) {

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

    const widgets = page.model.getItems();
    return _.filter(_.map(widgets, function(widget) {
      const rules = widget.model.getConfig('rules'),
          publish = rules.publish || {},
          subscribers = rules.subscribers || {},
          resource = widget.model.getConfig('preferences/resource'),
          resourceRules = publish[resource.toCamel().toLowerCase()];
      let data = [];
      if (publish.widget) {
        data = _.map(publish.widget, rule => _node(widget, rule, 'lightgreen', subscribers));
      }
      if (resourceRules) {
        return data.concat(_.map(resourceRules, rule => _node(widget, rule, 'lightblue', subscribers)));
      }
      return data;
    }), Boolean);
  }

  /**
   * getWidgetSubscriberRules
   * @method getWidgetSubscriberRules
   * @memberOf PageRulesVisualizer
   * @param {Page} page
   */
  getWidgetSubscriberRules(page) {
    const widgets = page.model.getItems();
    return _.filter(_.map(widgets, widget => {
      const rules = widget.model.getConfig('rules'),
          subscribers = rules.subscribers,
          publish = rules.publish || {};
      if (subscribers) {
        return _.map(publish.widget, rule => ({
          key: rule + ':' + widget.model.getUUID(),
          subscribers: subscribers
        }));
      }
    }), Boolean);
  }
};
  