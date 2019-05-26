import {Workspace} from 'config/workspace';
import {mvcExpectation, shouldBeRendered} from '../helpers/utils';

import {Application} from 'config/application';

describe('Application', () => {

  /**
   * @constant
   * @type {Promise<void>}
   */
  const appPromise = Application.init({resource: 'shared'});

  appPromise.then(app => {
    mvcExpectation(app);
  });
});

describe('Workspace', () => {

  /**
   * @constant
   * @type {Workspace}
   */
  const workspace = new Workspace({});
  workspace.view.render(true);
  mvcExpectation(workspace);

  it('Render workspace', async () => shouldBeRendered(workspace, '$workspace', '$pages'));

  describe('Page 1', () => {

    /**
     * @constant page
     * @type {Page}
     */
    const page = workspace.api.createPage([], true);
    mvcExpectation(page);

    it('Render page', async () => shouldBeRendered(page, '$page', '$widgets'));
    it('Create Empty widget', async () => {
      page.controller.createWidgetFromResource({
        width: 100,
        height: 100,
        resource: 'empty',
        external_resource: false,
        title: 'data.name',
        description: 'data.description'
      }, true, false);
    });
  });

  describe('Page 2', () => {

    /**
     * @constant page
     * @type {Page}
     */
    const page = workspace.api.createPage([], true);
    mvcExpectation(page, 1);

    it('Render page', async () => shouldBeRendered(page, '$page', '$widgets'));
  });
});