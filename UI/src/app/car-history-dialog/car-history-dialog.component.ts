import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
export interface DialogData {
  animal: string;
  name: string;
}
@Component({
  selector: 'app-car-history-dialog',
  templateUrl: './car-history-dialog.component.html',
  styleUrls: ['./car-history-dialog.component.css']
})
export class CarHistoryDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CarHistoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      console.log(data);
    }

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {
  }

}
