import { Component } from '@angular/core';

//Model
import { ScanData } from "../../models/Scan-data.model";

//Servicio
import { HistorialServiceProvider } from "../../providers/historial-service/historial-service";

@Component({
  selector: 'page-historial',
  templateUrl: 'historial.html',
})
export class HistorialPage {

  historia:ScanData[] = [];

  constructor(private historialService: HistorialServiceProvider) {
  }

  ionViewDidLoad() {
    this.historia = this.historialService.cargarHistorial();
  }

  abrirScan( index:number){
    this.historialService.abrirScan(index);

  }

}
