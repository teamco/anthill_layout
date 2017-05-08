/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:13 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'modules/View',
  'element/header.element',
  'element/footer.element',
  'plugins/bar/element/bar.element',
  'plugins/bar/element/bar.content.element'
], function defineBarView(BaseView, Header, Footer, BarElement,
    BarContentElement) {

  /**
   * Define view
   * @class BarView
   * @constructor
   * @extends BaseView
   */
  var BarView = function BarView() {
  };

  return BarView.extend('BarView', {

    /**
     * Render Bar
     * @memberOf BarView
     */
    renderBar: function renderBar() {

      if (this.isCached('$bar', BarElement)) {
        return false;
      }

      this.header(Header, this.get$container());

      /**
       * Define container
       * @type {BarElement}
       */
      this.elements.$bar = new BarElement(this, {
        $container: this.get$container().$,
        style: 'panel-bar'
      });

      this.footer(Footer, this.get$container());
    },

    /**
     * Render bar content
     * @param data
     * @param {Boolean} force
     * @memberOf BarView
     * @returns {boolean}
     */
    renderContent: function renderContent(data, force) {

      if (this.isCachedItems() && !force) {
        return false;
      }

      this.updateElementItems();

      for (var index in data) {

        if (data.hasOwnProperty(index)) {

          /**
           * Define item
           */
          var item = data[index];

          /**
           * Define module resource
           * @type {string}
           */
          var moduleResource = item.module.name.toDash();

          /**
           * Render item
           * @type {BarContentElement}
           */
          var $item = new BarContentElement(this, {
            style: _.compact([
              'content',
              item.activated ? 'activated' : null,
              moduleResource
            ]).join(' '),
            resource: item,
            cname: moduleResource,
            $container: this.get$item().$
          });

          this.updateElementItems($item);
        }
      }
    },

    /**
     * Render bar
     * @memberOf BarView
     */
    render: function render() {

      this.scope.observer.publish(
          this.scope.eventmanager.eventList.successRendered,
          this.renderBar.bind(this)
      );
    }

  }, BaseView.prototype)

});