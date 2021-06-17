import { Component, OnInit } from '@angular/core';
import { DotnetService } from 'src/app/services/dotnet.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class AppHeaderComponent implements OnInit {
  
  constructor(
    public dotnetservice: DotnetService
  ){}

  uphoto: any
  localUId: any

  ngOnInit() {
    this.uphoto = localStorage.getItem("uphoto")
    this.localUId = localStorage.getItem("uid")
  }

  routeLogin(){
    location.href = "/login"
  }

  logOut() {
    localStorage.clear();
    location.href = "/";
  }
}
