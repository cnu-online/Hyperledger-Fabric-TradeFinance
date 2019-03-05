import { Component, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NullTemplateVisitor } from '@angular/compiler';
import { FabcarService } from '../fabcar.service';
import { CarlistItem } from '../carlist/carlist-datasource';
import { MatDialog } from '@angular/material';
import { CarHistoryDialogComponent } from '../car-history-dialog/car-history-dialog.component';

@Component({
  selector: 'app-cardetail',
  templateUrl: './cardetail.component.html',
  styleUrls: ['./cardetail.component.css']
})
export class CardetailComponent {
  @Input() carfromlist: any;
  carcount:number=0;
  tx_id:string;
  car = { isnew: true, key: '', owner: '', make: '', model: '', colour: '' };
  formTitle = "New Car";
  @Output() savecar: EventEmitter<any> = new EventEmitter();

  carForm = this.fb.group({
    key: [null, Validators.required],
    owner: [null, Validators.required],
    make: [null, Validators.required],
    model: [null, Validators.required],
    colour: [null, Validators.required],
  });
  constructor(private fb: FormBuilder, private service: FabcarService,public dialog: MatDialog) { 
    this.service.AssetCount.subscribe(count=>{
      this.carcount=count;
    })
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['carfromlist']) {
      this.car.isnew = false;
      this.car.key = this.carfromlist.key;
      this.car.owner = this.carfromlist.owner;
      this.car.make = this.carfromlist.make;
      this.car.model = this.carfromlist.model;
      this.car.colour = this.carfromlist.colour;

      this.formTitle = "Car Detail";
    }
    else
      this.formTitle = "New Car";
  }
  deleteCar() {
    this.service.deleteCar(this.car.key).subscribe((res:any) => {
      this.tx_id=res.tx_id;
      this.service.updatedLastTransId(res.tx_id)
      this.savecar.emit({ key: this.car.key });
    });
  }
  
  info() {
    this.service.HistoryInfo(this.car.key).subscribe((res:string) => {
      this.openDialog(JSON.parse(res));
    });
  }
  onSubmit(e) {
    if (this.carForm.valid) {
      this.service.updateCar(this.car).subscribe(res => {
        this.tx_id=res.result2.tx_id;
        this.service.updatedLastTransId(this.tx_id)
        this.savecar.emit({ car: this.car });
      });
    }
  }
  clear() {
    this.tx_id="";
    this.formTitle = "New Car";
    this.car = { isnew: true, key: 'CAR' + this.carcount.toString(), owner: '', make: '', model: '', colour: '' };
  }

  openDialog(res): void {
    const dialogRef = this.dialog.open(CarHistoryDialogComponent, {
      width: '250px',
      data:res
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.car = result;
    });
  }
}
