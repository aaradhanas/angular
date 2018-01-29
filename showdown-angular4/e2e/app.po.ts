import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }
  
  getToggleLink() {
    return element(by.css('app-top-navbar .title-area a'));
  }

  getLeftNavBar() {
    return element(by.css('app-left-navbar .lateral-menu'));
  }

  getHashLink() {
    return element(by.css('app-top-navbar .top-bar-section a'));
  }

  getHashModal() {
    return element(by.css('app-top-navbar .modal-wrapper'));
  }
}
