import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { NotifierComponent } from "src/app/pages/notifier/notifier.component";


@Injectable({
  providedIn: "root",
})
export class SnackbarService {
  constructor(private snackBar: MatSnackBar) {}

  showSnackBar(
    message: string,
    action?: string,
    messageType?: "error" | "success" |"warning"
  ) {
    console.log("MESSAGE TYPE",messageType)
    this.snackBar.openFromComponent(NotifierComponent, {
      data: {
        message: message,
        buttonText: action,
        type:messageType

      },
      duration: 50000,
      horizontalPosition: "center",
      verticalPosition: "top",
      panelClass: messageType
    });
  }
}