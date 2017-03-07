import { ShareBnbPage } from './app.po';

describe('share-bnb App', () => {
  let page: ShareBnbPage;

  beforeEach(() => {
    page = new ShareBnbPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
