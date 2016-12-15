import { browser, element, by } from 'protractor';

export class PrimeNgTemplatePage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('png-root h1')).getText();
  }
}
