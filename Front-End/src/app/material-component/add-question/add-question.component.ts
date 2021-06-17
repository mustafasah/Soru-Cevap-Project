import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Question } from 'src/app/models/Question';
import { DotnetService } from 'src/app/services/dotnet.service';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {

  userId: any
  userPhoto: any
  userName: any

  constructor(public dotnetservice: DotnetService, public snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.userId = localStorage.getItem("uid")
    this.userPhoto = localStorage.getItem("uphoto")
    this.userName = localStorage.getItem("uname")
  }

  addQuestionButton(title: string, textarea: string) {
    if (title && textarea) {
      const questionvr = new Question()
      questionvr.date = new Date()
      questionvr.description = textarea
      questionvr.title = title
      questionvr.userId = this.userId
      questionvr.photo = this.userPhoto
      questionvr.userName = this.userName
      questionvr.view = 0

      this.dotnetservice.addQuestion(questionvr).subscribe((res: any) => {
        this.snackBar.open(res.message, "Tamam", {
          duration: 3000,
        })
        location.href = "questions"
      })
    }
  }
}
