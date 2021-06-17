import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DotnetService } from 'src/app/services/dotnet.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public dotnetservice: DotnetService, public snackBar: MatSnackBar) { }

  hide = true;

  ngOnInit(): void {
  }

  login(uname: string, password: string) {
    if (uname && password)
      this.dotnetservice.getToken(uname, password).subscribe((res: any) => {
        localStorage.setItem("token", res.access_token);
        localStorage.setItem("uid", res.userId);
        localStorage.setItem("uname", res.userName);
        localStorage.setItem("uphoto", res.photo);
        localStorage.setItem("userAuths", res.userAuths);
        location.href = "/";
      }, err => {
        this.snackBar.open(err.error.error, err.error.error_description, {
          duration: 3000,
        });
      });

  }

}
