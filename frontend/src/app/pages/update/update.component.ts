import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent {
  constructor(public dialogRef: MatDialogRef<UpdateComponent>){

  }
  closeDialog() {
    this.dialogRef.close();
  }

}
