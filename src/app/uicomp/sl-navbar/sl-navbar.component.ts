import { Component, OnInit } from '@angular/core';
import { FunctionGuard } from '../../guards/function-guard';
import { AuthStore } from '../../stores/auth.store';

@Component({
  selector: 'app-sl-navbar',
  templateUrl: './sl-navbar.component.html',
  styleUrls: ['./sl-navbar.component.css']
})
export class SlNavbarComponent implements OnInit {

  isAdmin = false;

  constructor(private functionGuard: FunctionGuard,
    private authStore: AuthStore) { }

  ngOnInit() {
    this.isAdmin = this.functionGuard.isAdmin();
    this.authStore.roleEvent$.subscribe(role => {
      if (role) {
        this.isAdmin = this.functionGuard.isAdmin();
      }
    });
  }

}
