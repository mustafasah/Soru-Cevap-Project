import 'hammerjs';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { DemoMaterialModule } from '../demo-material-module';
import { CdkTableModule } from '@angular/cdk/table';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialRoutes } from './material.routing';

import { QuestionsComponent } from './questions/questions.component';
import { RegisterComponent } from './register/register.component';
import { UsersComponent } from './users/users.component';
import { QuestionComponent } from './question/question.component';
import { AddQuestionComponent } from './add-question/add-question.component';
import { DateAgoPipe } from './pipe/date-ago.pipe';
import { UserComponent } from './user/user.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(MaterialRoutes),
    DemoMaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CdkTableModule
  ],
  providers: [DateAgoPipe],
  entryComponents: [],
  declarations: [
    QuestionsComponent,
    RegisterComponent,
    UsersComponent,
    QuestionComponent,
    AddQuestionComponent,
    DateAgoPipe,
    UserComponent
  ],
  exports: [DateAgoPipe]
})
export class MaterialComponentsModule {}
