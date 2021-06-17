import { RouterModule, Routes } from '@angular/router';

import { QuestionsComponent } from './questions/questions.component';
import { RegisterComponent } from './register/register.component';
import { UsersComponent } from './users/users.component';
import { QuestionComponent } from './question/question.component';
import { AddQuestionComponent } from './add-question/add-question.component';
import { NgModule } from '@angular/core';
import { UserComponent } from './user/user.component';
import { AuthGuard } from '../services/auth-guard.service';

export const MaterialRoutes: Routes = [
  {
    path: 'questions',
    component: QuestionsComponent
  },
  {
    path: 'question',
    component: QuestionComponent
  },
  {
    path: 'question/:questionId',
    component: QuestionComponent
  },
  {
    path: 'addquestion',
    component: AddQuestionComponent,
    canActivate: [AuthGuard],
    data: {
      auths: ["User", "Admin"],
      goback: "/login"
    }
  },
  {
    path: 'users',
    component: UsersComponent
  },
  {
    path: 'user/:userId',
    component: UserComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(MaterialRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }