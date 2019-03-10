import {Workspace} from 'config/workspace';
import {mvcExpectation, shouldBeRendered} from '../helpers/utils';

describe('Workspace', () => {

  /**
   * @constant
   * @type {Workspace}
   */
  const workspace = new Workspace({});
  workspace.view.render(true);
  mvcExpectation(workspace);

  it('Render workspace', async () => {
    shouldBeRendered(workspace, '$workspace', '$pages');
  });

  describe('Page 1', () => {

    /**
     * @constant page
     * @type {Page}
     */
    const page = workspace.api.createPage([], true);
    mvcExpectation(page);

    it('Render page', async () => {
      shouldBeRendered(page, '$page', '$widgets');
    });
  });

  describe('Page 2', () => {

    /**
     * @constant page
     * @type {Page}
     */
    const page = workspace.api.createPage([], true);
    mvcExpectation(page, 1);

    it('Render page', async () => {
      shouldBeRendered(page, '$page', '$widgets');
    });
  });
});