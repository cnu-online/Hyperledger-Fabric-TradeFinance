import { Component, OnInit, ViewChild, EventEmitter, Output, Input, SimpleChanges } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { CarlistDataSource } from './carlist-datasource';
import { FabcarService } from '../fabcar.service';
import { Key } from 'protractor';

@Component({
  selector: 'app-carlist',
  templateUrl: './carlist.component.html',
  styleUrls: ['./carlist.component.css']
})
export class CarlistComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: CarlistDataSource;
  @Input() updatelist: Date;
  @Output() selectcar: EventEmitter<any> = new EventEmitter();
  constructor(private service: FabcarService) {
    this.loadCars();
  }
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['key', 'owner', 'make', 'model', 'colour', "actions"];

  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['updatelist'])
      this.loadCars();
  }
  editCar(car) {
    this.selectcar.emit(car);
  }
 
  loadCars() {
    this.service.getCarList().subscribe(res => {
      let cars = [];
      JSON.parse(res).forEach(element => {
        cars.push({          
          key: element.Key
          , owner: element.Record.owner
          , make: element.Record.make
          , model: element.Record.model
          , colour: element.Record.colour
        });
      });
      this.service.updatedAssetCount(cars.length);

      this.dataSource = new CarlistDataSource(this.paginator, this.sort, cars);
      this.dataSource.connect()
    });
  }
}
