import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { CarstableDataSource } from './carstable-datasource';

@Component({
  selector: 'app-carstable',
  templateUrl: './carstable.component.html',
  styleUrls: ['./carstable.component.css']
})
export class CarstableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: CarstableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

  ngOnInit() {
    this.dataSource = new CarstableDataSource(this.paginator, this.sort);
  }
}
