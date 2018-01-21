import { AppPage } from './app.po';

describe('Faqapp App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should have header', () => {
    page.navigateTo();
    expect(page.getHeadingText()).toEqual('FAQ App');
  });

  it('add question answer', () => {
    page.enterQuestion();
    page.enterAnswer();
    page.submit();

    page.getQuestion()
      .then(question => {
        expect(question).toEqual('How are you?');
    });

    page.getAnswer()
      .then(answer => {
        expect(answer).toEqual('');
    });

  });

  it('show/hide answer', () => {
    page.showHideAnswer();
    page.getAnswer()
    .then(answer => {
      expect(answer).toEqual('I am doing great!');
    });

    page.showHideAnswer();
    page.getAnswer()
    .then(answer => {
      expect(answer).toEqual('');
    });

  });

  it('remove question answer', () => {
    page.removeQuestion();

    page.getQuestion()
      .then( question => {
        expect(question).toEqual('');
      });

    page.getAnswer()
    .then( answer => {
      expect(answer).toEqual('');
    });

  });
});
