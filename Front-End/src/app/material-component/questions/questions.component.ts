import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Question } from 'src/app/models/Question';
import { DotnetService } from 'src/app/services/dotnet.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  constructor(
    public dotnetservice : DotnetService,
    public snackBar: MatSnackBar
  ) { }
  
  questionlist : any

  ngOnInit(): void {
    this.dotnetservice.questionList().subscribe(res => {
      this.questionlist = res
    })
  }

  askQuestion(){
    if (this.dotnetservice.checkLogin()) {
      location.href ='/addquestion'
    }
    else {
      this.snackBar.open("Sadece Üyeler Soru Sorabilir", "Tamam", {
        duration: 3000,
      })
    }
  }

}
