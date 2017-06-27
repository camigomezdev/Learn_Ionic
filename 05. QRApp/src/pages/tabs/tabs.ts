import { Component } from '@angular/core';

import { HomePage, HistorialPage } from "../index.paginas"

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  home:any = HomePage;
  historial:any = HistorialPage;

  constructor() {
  }

}
