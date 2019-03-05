import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FabcarService } from '../fabcar.service';

@Component({
  selector: 'app-carmain',
  templateUrl: './carmain.component.html',
  styleUrls: ['./carmain.component.css']
})
export class CarmainComponent implements OnInit {
  selectedCar: any;
  updatelist: Date;
  carcount: number;
  blockHeight: number;
  lastTransId: string;
  constructor(private service: FabcarService) {
    this.service.getBlockchainInfo().subscribe((res: any) => {
      this.service.updatedBlockHeight(res.height.low)
    })
    this.service.AssetCount.subscribe(count => {
      this.carcount = count;
    })

    this.service.BlockHeight.subscribe(count => {
      this.blockHeight = count;
    })

    this.service.LastTransId.subscribe(transid => {
      this.lastTransId = transid;
    })


  }

  ngOnInit() {

  }
  selectCar(car) {
    //alert(JSON.stringify(car));
    this.selectedCar = car;
  }
  saveCar(e) {
    this.updatelist = new Date();
  }
}
