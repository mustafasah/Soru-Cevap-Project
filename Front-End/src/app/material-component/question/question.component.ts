import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Answer } from 'src/app/models/Answer';
import { Question } from 'src/app/models/Question';
import { DotnetService } from 'src/app/services/dotnet.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  question: Question = new Question()
  questionId: any
  answers: any
  wantEdit: boolean = false
  onlyQuestionOwnerEdit: boolean = false

  constructor(public dotnetservice: DotnetService, private aroute: ActivatedRoute, public snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.aroute.params.subscribe(res => {
        this.questionId = res.questionId
        this.questionById()
        this.listAnswers()
    })
  }

  questionById() {
    this.dotnetservice.questionById(this.questionId).subscribe((res: any) => {
      this.question = res
      this.questionAddOneView()
      if (localStorage.getItem("uid") == this.question.userId) {
        this.onlyQuestionOwnerEdit = true
      }
    })
  }

  questionAddOneView() {
    this.question.view += 1;
    this.dotnetservice.editQuestion(this.question).subscribe();
  }

  deleteQuestion() {
    if(confirm('Soruyu Silmek İstediğinizden Emin misiniz?')) {
      this.dotnetservice.deleteQuestion(this.questionId).subscribe((res: any) => {
        if (res.control) {
          location.href = "/questions"
        }
        else {
          this.snackBar.open(res.message, "Tamam", {
            duration: 3000,
          });
        }
      })
    }
  }

  editQuestion(title: any, description: any) {
    if (title && description) {
      let editedQuestion = new Question()
      editedQuestion.questionId = this.questionId
      editedQuestion.date = new Date()
      editedQuestion.title = title
      editedQuestion.description = description
      editedQuestion.userId = localStorage.getItem("uid")
      editedQuestion.photo = localStorage.getItem("uphoto")
      this.dotnetservice.editQuestion(editedQuestion).subscribe((res: any) => {
        this.snackBar.open(res.message, "Tamam", {
          duration: 3000,
        })
        this.questionById()
        this.wantEdit = false
      })
    }
  }

  listAnswers() {
    this.dotnetservice.listAnswerByQuestionId(this.questionId).subscribe((res: any) => {
      this.answers = res
    });
  }

  onlyAnswerOwnerEdit(answerUId: string){
    if (localStorage.getItem("uid") == answerUId) {
      return true
    }
  }

  addAnswer(answerText: string) {
    if (answerText) {
      let userId: any = localStorage.getItem("uid")
      let answer: Answer = new Answer();
      answer.description = answerText;
      answer.questionId = this.questionId;
      answer.userId = userId;
      answer.date = new Date();

      this.dotnetservice.addAnswer(answer).subscribe((res: any) => {
        if (res.control) {
          this.listAnswers();
        }
      });
    }

  }

  deleteAnswer(answerId: any){
    if(confirm('Cevabı Silmek İstediğinizden Emin misiniz?')) {
      this.dotnetservice.deleteAnswer(answerId).subscribe((res: any)=>{
        this.snackBar.open(res.message, "Tamam", {
          duration: 3000,
        })
        this.listAnswers();
      })
    }
  }

  clicled() {
    if (this.wantEdit) {
      this.wantEdit = false
    } else {
      this.wantEdit = true
    }
  }
}
