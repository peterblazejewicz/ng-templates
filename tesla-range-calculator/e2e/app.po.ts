import { browser, element, by } from 'protractor';

export class TeslaRangeCalculatorPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('tesla-root h1')).getText();
  }
}
