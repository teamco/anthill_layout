import {Workspace} from 'config/workspace';
import {mvcExpectation} from '../helpers/utils';

describe('Workspace', () => {

  /**
   * @constant
   * @type {Workspace}
   */
  const workspace = new Workspace({});
  let page, widget;

  mvcExpectation(workspace);

  it('Render workspace', async () => {
    workspace.view.render(true);
    expect(workspace.view.elements.$workspace).toBeDefined();
    expect(workspace.view.elements.$pages).toBeDefined();
  });

  it('Create page', async () => {

    /**
     * @constant page
     * @type {Page}
     */
    page = workspace.api.createPage([], true);
    //workspace.observer.publish(workspace.eventManager.eventList.switchToPage, [page, true]);
  });

  mvcExpectation(page);
});