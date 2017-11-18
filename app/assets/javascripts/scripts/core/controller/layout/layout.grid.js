defineP(function defineLayoutGrid() {

  /**
   * Define LayoutGrid
   * @class LayoutGrid
   * @param {Layout} layout
   * @constructor
   */
  var LayoutGrid = function LayoutGrid(layout) {

    /**
     * Define layout
     * @property LayoutGrid
     * @type {Layout}
     */
    this.layout = layout;
  };

  return LayoutGrid.extend('LayoutGrid', {

    /**
     * toggleGrid
     * @method toggleGrid
     * @property LayoutGrid
     * @param {Page} page
     * @param {number} cellWidth
     */
    toggleGrid: function toggleGrid(page, cellWidth) {
      var $page = page.view.get$item().$,
          remove = $page.hasClass('grid');
      $page[(remove ? 'remove' : 'add') + 'Class']('grid');
      $page.css({backgroundSize: cellWidth + 'px ' + cellWidth + 'px'})
    }

  });
});