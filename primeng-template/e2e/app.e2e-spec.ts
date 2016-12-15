import { PrimeNgTemplatePage } from './app.po';

describe('prime-ng-template App', function() {
  let page: PrimeNgTemplatePage;

  beforeEach(() => {
    page = new PrimeNgTemplatePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('png works!');
  });
});
