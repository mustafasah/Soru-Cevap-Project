import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Answer } from '../models/Answer';
import { Question } from '../models/Question';
import { User } from '../models/User';
import { UserPhoto } from '../models/UserPhoto';

@Injectable({
  providedIn: 'root'
})
export class DotnetService {
  endpoint = "http://localhost:8748/api/"
  domainUrl = "http://localhost:8748/"
  constructor(
    public http: HttpClient
  ) { }

  getToken(uname: string, password: string) {
    var data = "username=" + uname + "&password=" + password + "&grant_type=password";
    var reqHeader = new HttpHeaders({ "Content-Type": "application/x-www-form-urlencoded" });
    return this.http.post(this.endpoint + "token", data, { headers: reqHeader });
  }

  checkLogin() {
    if (localStorage.getItem("token")) {
      return true;
    }
    else {
      return false;
    }
  }

  authControl(auths: any) {
    // let userAuths: string[] = JSON.parse(localStorage.getItem("userAuths"));
    let userAuths: any = localStorage.getItem("userAuths")
    let control: boolean = false;
    if (userAuths) {
      auths.forEach((element: any) => {
        if (userAuths.indexOf(element) > -1) {
          control = true;
          return false;
        }
      });

    }

    return control;
  }

  questionList() {
    return this.http.get(this.endpoint + "questionlist")
  }

  addQuestion(question: Question) {
    return this.http.post(this.endpoint + "addquestion" , question)
  }

  questionById(questionId: string) {
    return this.http.get(this.endpoint + "questionbyid/" + questionId)
  }

  questionListByUserId(userId: string) {
    return this.http.get(this.endpoint + "questionlistbyuserid/" + userId)
  }
  
  editQuestion(question: Question) {
    return this.http.put(this.endpoint + "editquestion", question);
  }

  deleteQuestion(questionId: number){
    return this.http.delete(this.endpoint + "deletequestion/" + questionId);
  }

  addUser(user: User) {
    return this.http.post(this.endpoint + "adduser" , user)
  }

  editUser(user: User) {
    return this.http.put(this.endpoint + "edituser", user);
  }

  deleteUser(userId: string){
    return this.http.delete(this.endpoint + "deleteuser/" + userId);
  }

  userList():any {
    return this.http.get(this.endpoint + "userlist")
  }

  userById(uid: string): Observable<any>{
    return this.http.get(this.endpoint + "userbyid/" + uid);
  }

  editUserPhoto(userPhoto: UserPhoto) {
    return this.http.post(this.endpoint + "updateuserphoto", userPhoto);
  }

  listAnswers() {
    return this.http.get(this.endpoint + "answerlist")
  }

  addAnswer(answer: Answer) {
    return this.http.post(this.endpoint + "addanswer", answer);
  }

  deleteAnswer(answerId: string){
    return this.http.delete(this.endpoint + "deleteanswer/" + answerId);
  }

  answerListByUserId(userId: string) {
    return this.http.get(this.endpoint + "answerlistbyuserid/" + userId)
  }
  
  listAnswerByQuestionId(questionId: number) {
    return this.http.get(this.endpoint + "answerlistbyquestionid/" + questionId)
  }
}
