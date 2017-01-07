import { browser, element, by } from 'protractor';

export class FormioPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('formio-root h1')).getText();
  }
}
