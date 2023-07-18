import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-notifier',
  templateUrl: './notifier.component.html',
  styleUrls: ['./notifier.component.scss']
})
export class NotifierComponent {
  
  warning:string ="warning"
  error:string = "error"
  success:string ="success"
constructor(@Inject(MAT_SNACK_BAR_DATA) public data:any, public snackBarRef:MatSnackBarRef<NotifierComponent>){}
}