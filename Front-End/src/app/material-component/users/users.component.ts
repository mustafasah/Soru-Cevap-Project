import { Component, OnInit } from '@angular/core';
import { DotnetService } from 'src/app/services/dotnet.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(public dotnetservice: DotnetService) { }
  userList: any 

  ngOnInit(): void {
    this.dotnetservice.userList().subscribe((res:any[])=>{
      this.userList = res
    })
  }

}
