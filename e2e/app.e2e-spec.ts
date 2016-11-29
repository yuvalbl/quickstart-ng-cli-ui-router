import { QuickstartNgCliUiRouterPage } from './app.po';

describe('quickstart-ng-cli-ui-router App', function() {
  let page: QuickstartNgCliUiRouterPage;

  beforeEach(() => {
    page = new QuickstartNgCliUiRouterPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
