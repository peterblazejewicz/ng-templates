import { TeslaRangeCalculatorPage } from './app.po';

describe('tesla-range-calculator App', function() {
  let page: TeslaRangeCalculatorPage;

  beforeEach(() => {
    page = new TeslaRangeCalculatorPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('tesla works!');
  });
});
