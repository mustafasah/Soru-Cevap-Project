import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatStepperModule } from '@angular/material/stepper';
import { User } from 'src/app/models/User';
import { DotnetService } from 'src/app/services/dotnet.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false }
  }]
})
export class RegisterComponent implements OnInit {

  hide = true;
  profilePhoto = "default.jpg"
  isLinearvarient = true;
  varientfirstFormGroup: FormGroup = Object.create(null);
  varientsecondFormGroup: FormGroup = Object.create(null);
  varientthreeFormGroup: FormGroup = Object.create(null);

  constructor(private _formBuilder: FormBuilder, public dotnetservice: DotnetService, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.varientfirstFormGroup = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
    this.varientsecondFormGroup = this._formBuilder.group({
      username: ['', Validators.required]
    });
    this.varientthreeFormGroup = this._formBuilder.group({
      password: ['', Validators.required]
    });

  }

  newRegister() {
    const user = new User()
    user.email = this.varientfirstFormGroup.value.email
    user.userName = this.varientsecondFormGroup.value.username
    user.password = this.varientthreeFormGroup.value.password
    user.photo = this.profilePhoto

    this.dotnetservice.addUser(user).subscribe((res: any) => {
      if (res.control) {
        this.snackBar.open(res.message, "Tamam", {
          duration: 3000
        })
        location.href = "/login"
      }
      else {
        this.snackBar.open(res.message, "Tamam", {
          duration: 3000
        })
      }
    })
  }

  getErrorMessage() {
    if (this.varientfirstFormGroup.controls.email.hasError('required')) {
      return 'E-Posta Girin';
    }
    return this.varientfirstFormGroup.controls.email.hasError('email') ? 'Geçerli Bir E-Posta Girin' : '';
  }
}