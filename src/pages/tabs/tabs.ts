import { Component } from '@angular/core';

import { IframePage } from '../iframe/iframe';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = IframePage;
  tab3Root = ContactPage;

  constructor() {

  }
}
