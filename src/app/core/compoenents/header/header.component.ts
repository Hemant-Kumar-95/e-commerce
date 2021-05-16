import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { UsersService } from 'src/app/user/services/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    public usersService: UsersService,
    private messageService: MessageService) { }

  ngOnInit() {
  }

  onSignOut() {
    this.usersService.signOut();
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'You have been signed out successfully.'
    })
  }

}
