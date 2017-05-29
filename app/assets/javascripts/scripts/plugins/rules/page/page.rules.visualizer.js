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
          desc: prefs.description,
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
      var widgets = page.model.getItems();
      return _.filter(_.map(widgets, function(widget) {
        var publish = widget.model.getConfig('rules').publish || {};
        if (publish.widget) {
          return _.map(publish.widget, function(rule) {
            return {
              key: rule,
              uuid: widget.model.getUUID(),
              color: 'lightgreen'
            };
          });
        }
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
        var subscribers = widget.model.getConfig('rules').subscribers;
        var publish = widget.model.getConfig('rules').publish || {};
        if (subscribers) {
          return _.map(publish.widget, function(rule) {
            return {
              key: rule,
              subscribers: subscribers
            };
          });
        }
      }), Boolean);
    }
  });
});