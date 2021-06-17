import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/User';
import { UserPhoto } from 'src/app/models/UserPhoto';
import { DotnetService } from 'src/app/services/dotnet.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  userId: any
  questions: any
  user: User = new User()
  answers: any
  localControl: boolean = false
  selectedPhoto: any
  userPhoto: UserPhoto = new UserPhoto()

  constructor(public dotnetservice: DotnetService, private aroute: ActivatedRoute, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.aroute.params.subscribe(res => {
        this.userId = res.userId
        this.questionListByUserId()
        this.dotnetservice.userById(this.userId).subscribe(res => this.user = res)
        this.dotnetservice.answerListByUserId(this.userId).subscribe(res => this.answers = res)
    })
    if (localStorage.getItem("uid") == this.userId) {
      this.localControl = true
    }
  }

  questionListByUserId() {
    this.dotnetservice.questionListByUserId(this.userId).subscribe(res => {
      this.questions = res
    })
  }

  editUser(uname: any, email: any, password: any) {
    if (uname && email && password) {
      let editedUser: User = new User()
      editedUser.userId = this.userId
      editedUser.userName = uname
      editedUser.email = email
      editedUser.password = password
  
      this.dotnetservice.editUser(editedUser).subscribe((res: any) => {
        this.snackBar.open(res.message, "Tamam", {
          duration: 3000,
        })
        this.dotnetservice.userById(this.userId).subscribe(res => this.user = res)
      })
  
    } else {
      this.snackBar.open('Lütfen Tüm Alanları Doldurun', "Tamam", {
        duration: 3000,
      })
    }
  }

  deleteUser() {
    confirm("Kişi Silinecektir Onaylıyor musunuz?")
    this.dotnetservice.deleteUser(this.userId).subscribe((res: any) => {
      this.snackBar.open(res.message, "Tamam", {
        duration: 3000,
      })
    })
  }

  selectPhoto(e: any) {
    var firstPhoto = e.target.files[0]
    var fr = new FileReader();
    fr.onloadend = () => {
      this.selectedPhoto = fr.result
      this.userPhoto.photoData = fr.result
      this.userPhoto.photoExtention = firstPhoto.type;
    };
    fr.readAsDataURL(firstPhoto)
  }

  savePhoto(){
    this.userPhoto.userId = this.userId
    this.dotnetservice.editUserPhoto(this.userPhoto).subscribe((res: any) => {
      this.snackBar.open(res.message, "Tamam", {
        duration: 3000,
      })
      this.ngOnInit()
    })
  }

}
