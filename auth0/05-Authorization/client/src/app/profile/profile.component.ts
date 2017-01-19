import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'auth0-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profile: any;

  constructor(public auth: AuthService, public sanitizer: DomSanitizer) { }

  ngOnInit() {
    if (this.auth.userProfile) {
      this.profile = this.auth.userProfile;
      if (this.profile.email) {
        this.profile.email = this.sanitizer.bypassSecurityTrustUrl(`eamilto:${this.profile.email}`);
      }
    } else {
      this.auth.getProfile((err, profile) => {
        this.profile = profile;
        if (this.profile.email) {
          this.profile.email = this.sanitizer.bypassSecurityTrustUrl(`eamilto:${this.profile.email}`);
        }
      });
    }
  }

}
