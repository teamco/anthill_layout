/**
 * @class PageRulesVisualizer
 * @type {PageRulesVisualizer}
 */
export class PageRulesVisualizer {

  /**
   * getWidgets
   * @memberOf PageRulesVisualizer
   * @method getWidgets
   * @param {Page} page
   * @static
   */
  static getWidgets(page) {
    const widgets = page.model.getItems();
    return _.map(widgets, widget => {
      const prefs = widget.model.getConfig('preferences'),
          imgPath = widget.content.image;
      return {
        key: widget.model.getUUID(),
        figure: 'RoundedRectangle',
        title: prefs.title,
        description: prefs.description,
        color: '#dedede',
        name: 'widget',
        path: imgPath
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
     *  key: string,
     *  title: *,
     *  uuid: (*|String),
     *  color: *,
     *  count: (number|Number)
     * }}
     * @private
     */
    function _node(widget, rule, color, subscribers) {
      return {
        key: `${rule}:${widget.model.getUUID()}`,
        title: rule,
        uuid: widget.model.getUUID(),
        color: color,
        count: (subscribers[rule] || []).length
      };
    }

    const widgets = page.model.getItems();
    return _.filter(_.map(widgets, widget => {
      const rules = widget.model.getConfig('rules'),
          publish = rules.publish || {},
          subscribers = rules.subscribers || {},
          resource = widget.model.getConfig('preferences/resource'),
          resourceRules = publish[resource.toCamelCase().toLowerCase()];
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
          resource = widget.model.getConfig('preferences/resource'),
          subscribers = rules.subscribers,
          publish = rules.publish || {},
          resourceRules = publish[resource.toCamelCase().toLowerCase()];
      if (subscribers) {
        const publishedRules = publish.widget ? publish.widget : resourceRules;
        return _.map(publishedRules, rule => ({
          key: `${rule}:${widget.model.getUUID()}`,
          subscribers: subscribers
        }));
      }
    }), Boolean);
  }
}
  