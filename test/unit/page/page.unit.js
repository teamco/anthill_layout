import {Page} from 'config/page';
import {mvcExpectation} from '../helpers/utils';

describe('Page', () => {
  it('Page should be created', async () => {
    const page = await new Page({});
    mvcExpectation(page);
    expect(page instanceof Page).toBeTruthy();
  });
});