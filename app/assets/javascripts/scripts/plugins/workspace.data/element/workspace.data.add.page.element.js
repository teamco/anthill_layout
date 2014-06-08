/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define(

    ['modules/Element'],

    /**
     * Define WorkspaceDataAddPageElement
     * @param {BaseElement} BaseElement
     * @returns {*}
     */
        function defineWorkspaceDataAddPageElement(BaseElement) {

        /**
         * Define WorkspaceData AddPage Element
         * @constructor
         * @class WorkspaceDataAddPageElement
         * @extends BaseElement
         * @param {WorkspaceDataView} view
         * @param opts
         * @returns {WorkspaceDataAddPageElement}
         */
        var WorkspaceDataAddPageElement = function WorkspaceDataAddPageElement(view, opts) {

            this._config(view, opts, $('<li />')).build({
                $container: opts.$container,
                destroy: false
            });

            return this.init();
        };

        return WorkspaceDataAddPageElement.extend('WorkspaceDataAddPageElement', {

            /**
             * Define Init
             * @member WorkspaceDataAddPageElement
             * @returns {WorkspaceDataAddPageElement}
             */
            init: function init() {

                this.setText('Create new page');
                this.setTitle('Create new page');

                return this;
            }

        }, BaseElement.prototype);
    }
);