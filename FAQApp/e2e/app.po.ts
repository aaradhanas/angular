import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getHeadingText() {
    return element(by.css('app-root a')).getText();
  }

  enterQuestion() {
    element(by.css('app-add-question .question')).sendKeys('How are you?');
  }

  enterAnswer() {
    element(by.css('app-add-question .answer')).sendKeys('I am doing great!');
  }

  submit() {
    element(by.css('app-add-question .btn')).click();
  }

  getQuestion() {
    return element(by.css('app-question .card-header span')).isPresent()
            .then( present => {
              if (present) {
                return element(by.css('app-question .card-header span')).getText();
              } else {
                return '';
              }
          });
  }

  showHideAnswer() {
    element(by.css('app-question .show-hide')).click();
  }

  getAnswer() {
    return element(by.css('app-question .card-block .card-text')).isPresent()
        .then(present => {
          if (present) {
            return element(by.css('app-question .card-block')).getText();
          } else {
            return '';
          }
        });
  }

  removeQuestion() {
    element(by.css('app-question .remove')).click();
   }
}
