import { FormioPage } from './app.po';

describe('formio App', function() {
  let page: FormioPage;

  beforeEach(() => {
    page = new FormioPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('formio works!');
  });
});
