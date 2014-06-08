/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 2/13/13
 * Time: 11:34 PM
 */

define([
    'config/anthill',
    'modules/Debugger/debugger.config',
    'modules/Debugger/debugger.component',
    'modules/Debugger/debugger.tabs',
    'modules/Debugger/debugger.grid',
    'modules/Debugger/debugger.application',
    'modules/Debugger/debugger.workspace',
    'modules/Debugger/debugger.page',
    'modules/Debugger/debugger.layout',
    'modules/Debugger/debugger.widget'
], function defineDebugger(AntHill, DebuggerConfig, DebuggerComponent, DebuggerTabs, DebuggerGrid, DebuggerApp, DebuggerWorkspace, DebuggerPage, DebuggerLayout, DebuggerWidget) {

    /**
     * Define Debugger
     * @param scope
     * @class Debugger
     * @constructor
     */
    var Debugger = function Debugger(scope) {

        this.scope = scope;

        this.placeholders = '#placeholders';
        this.info = '#debug-mode';

        this.links = [
            'Logger',
            'Application',
            'Workspace',
            'Page',
            'Widget'
        ];

        this.showTab = 5;
        this.pinTabs = true;

        this.opacityOff = 0.8;

        this.rows = 25;
        this.scopes = {};

        this.init();

    };

    return Debugger.extend('Debugger', {

        /**
         * Init debugger components
         */
        init: function init() {

            /**
             * Define no widget scope
             * @type {Boolean}
             */
            this.noWidget = false;

            /**
             * Define config
             * @type {DebuggerConfig}
             */
            this.config = new DebuggerConfig(this);

            /**
             * Define component
             * @type {DebuggerComponent}
             */
            this.component = new DebuggerComponent(this);

            /**
             * Define tabs
             * @type {DebuggerTabs}
             */
            this.tabs = new DebuggerTabs(this, this.pinTabs, this.opacityOff);

            /**
             * Define app
             * @type {DebuggerApp}
             */
            this.app = new DebuggerApp(this, this.scope);

            /**
             * Define workspace
             * @type {DebuggerWorkspace}
             */
            this.workspace = new DebuggerWorkspace(this, this.scopes.workspace);

            /**
             * Define page
             * @type {DebuggerPage}
             */
            this.page = new DebuggerPage(this, this.scopes.page);

            /**
             * Define layout
             * @type {DebuggerLayout}
             */
            this.layout = new DebuggerLayout(this);

            /**
             * Define grid
             * @type {DebuggerGrid}
             */
            this.grid = new DebuggerGrid(this);

            /**
             * Define widget
             * @type {DebuggerWidget}
             */
            this.widget = new DebuggerWidget(this);

            this.renderDebugger();
        },

        /**
         * Destroy debugger
         */
        destroy: function destroy() {
            this.grid.destroyGrid();
            this.destroyDebuggerDOM();
            this.scope.bugger = undefined;
            delete this.scope.bugger;
        },

        /**
         * Destroy info window
         */
        destroyDebuggerDOM: function destroyDebuggerDOM() {
            $(this.info).stop().fadeOut(300, function fadeOt() {
                $(this).unbind().remove();
            });
        },

        /**
         * Render Info window
         * @param {{type, timeStamp}} [event]
         * @param {{originalPosition, offset, position, helper}} [ui]
         */
        renderDebugger: function renderDebugger(event, ui) {

            var scope = this.scope,
                scopes = this.scopes,
                base = this.base,

                $div = $(this.info),
                opacityOff = this.opacityOff;

            if ($div.length === 0) {
                $div = $('<div />');
                $div.attr({
                    id: this.info.replace(/#/, '')
                }).css({
                        opacity: opacityOff
                    }).draggable({
                        handle: '.handler',
                        cancel: '.plus, .minus, .pin, .debug-clear'
                    });
                $(scope.config.html.container).append($div);
            }

            if (!(scopes.widget instanceof Object)) {
                this.scope.logger.debug('Debugger undefined widget', scopes, this);
                this.noWidget = true;
            }

            var workspace = scopes.workspace || {},
                page = scopes.page || {},
                layout = page.layout || {},
                logger = scope.config.logger,
                c = this.component;

            event = base.define(event, {}, true);
            ui = base.define(ui, {}, true);

            $div.html(
                [
                    '<ul class="handler">',
                    c.renderInput('Show Grid', false),
                    '<li class="debug-clear">Clear data</li>',
                    '</ul>',
                    '<div class="debug-container">',

                    c.renderBlock('Widget', [
                        this.widget.renderWidgetInfo(event, ui)
                    ], false),

                    c.renderBlock('Page', [
                        c.renderInline('UUID', (page.config || {}).uuid),
                        this.layout.renderPageLayout(layout),
                        this.page.renderItemsInfo(page)
                    ], false),

                    c.renderBlock('Workspace', [
                        c.renderInline('UUID', (workspace.config || {}).uuid),
                        this.workspace.renderItemsInfo(workspace)
                    ], false),

                    c.renderBlock('Application', [
                        c.renderInline('UUID', scope.config.uuid),
                        c.renderInline('Mode', scope.config.mode),
                        this.app.renderItemsInfo(scope)
                    ], false),

                    c.renderBlock('Logger', [
                        c.renderInline('Namespaces', logger.namespaces),
                        c.renderInput('Show', logger.show),
                        c.renderInput('console.debug', logger.type.debug),
                        c.renderInput('console.log', logger.type.log),
                        c.renderInput('console.info', logger.type.info),
                        c.renderInput('console.error', logger.type.error),
                        c.renderInput('console.warn', logger.type.warn)
                    ], false),

                    '</div><div class="debug-close">Hide</div>'

                ].join('')

            ).show();

            this.tabs.renderTabs($div);

            c.bindCollapse();
            c.bindDebugClose();
            c.bindClearData();

            this.grid.bindToggleGrid();

            this.layout.bindAllowOverlapping();
            this.layout.bindChangeOverlappingMode();
            this.layout.bindChangeEmptySpacesMode();

            this.page.bindEnableItemsEditMode(page);
            this.workspace.bindEnableItemsEditMode(workspace);
            this.app.bindEnableItemsEditMode(this.scope);

            this.tabs.openTab({
                target: $div.find('li[title="' + this.links[this.showTab - 2] + '"]')
            });
        }

    }, AntHill.prototype);
});