import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {

// Do: login check karse k user login che k nai kyare jyare ngDoCheck hase tyare 
  logged_in: boolean = false;

  // Do: user nu role session storage ma store karavse 
  user_role!: any;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  // this hook is use for component ni inputs k bijo state je change kari sakiye user role get karave che session mathi.
  ngDoCheck() {
    this.user_role = sessionStorage.getItem('role');
    const user_sesson_id = sessionStorage.getItem('user_session_id');
    if (user_sesson_id) {
      this.logged_in = true;
    }
  }

  logout() {
    sessionStorage.removeItem('user_session_id');
    sessionStorage.removeItem('role');
    this.router.navigateByUrl('/sign-in');
    location.reload();// full page refresh thase
  }
}


