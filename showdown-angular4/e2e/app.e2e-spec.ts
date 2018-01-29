import { AppPage } from './app.po';

describe('showdown-angular4 App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('check left nav bar visibility', () => {
    page.navigateTo();
    page.getToggleLink().click();
    page.getLeftNavBar().isDisplayed().then( displayed => {
      page.wait(!displayed, 0.5);
      expect(displayed).toEqual(false);
    });
  });

  it('show hash modal', () => {
    page.navigateTo();
    page.getHashLink().click();
    page.getHashModal().isPresent().then( present => {
      expect(present).toBe(true);
    });
  });
});
