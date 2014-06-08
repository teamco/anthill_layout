/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/element'
], function defineWorkspaceDataElement(BaseElement) {

    /**
     * Define WorkspaceData Element
     * @param view
     * @param opts
     * @constructor
     * @class WorkspaceDataElement
     * @type {Function}
     * @extends BaseElement
     * @returns {WorkspaceDataElement}
     */
    var WorkspaceDataElement = function WorkspaceDataElement(view, opts) {

        this._config(view, opts, $('<ul />')).build({
            $container: opts.$container,
            destroy: false
        });

        this.addCSS('workspace.data');
        this.addCSS('preferences');

        return this;
    };

    return WorkspaceDataElement.extend('WorkspaceDataElement', {

        /**
         * Get footer html
         * @member WorkspaceDataElement
         * @returns {*|jQuery}
         */
        getFooter: function getFooter() {
            return $('<div />').text([
                this.base.lib.hash.hashLength(
                    this.view.scope.controller.getData()
                ),
                'items'
            ].join(' '));
        }

    }, BaseElement.prototype);

});