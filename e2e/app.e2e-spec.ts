import { NgWorkshopPage } from './app.po';

describe('ng-workshop App', () => {
  let page: NgWorkshopPage;

  beforeEach(() => {
    page = new NgWorkshopPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
