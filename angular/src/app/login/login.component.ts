import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import Swal from 'sweetalert2';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  // Bron: https://www.itsolutionstuff.com/post/angular-11-google-oauth-social-login-exampleexample.html

  auth2: any;

  @ViewChild('loginRef', { static: true }) loginElement: ElementRef;

  constructor(private loginSvc: LoginService) {}

  ngOnInit() {
    this.googleSDK();
  }

  prepareLoginButton() {
    this.auth2.attachClickHandler(
      this.loginElement.nativeElement,
      {},
      (googleUser) => {
        let profile = googleUser.getBasicProfile();
        let token = googleUser.getAuthResponse().id_token;
        console.log('Token || ' + token);
        console.log('ID: ' + profile.getId());
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());

        this.loginSvc.jwtToken = token;
        Swal.fire('Succes!', 'You are now logged in.', 'success');
      },
      (error) => {
        alert(JSON.stringify(error, undefined, 2));
      }
    );
  }
  googleSDK() {
    window['googleSDKLoaded'] = () => {
      window['gapi'].load('auth2', () => {
        this.auth2 = window['gapi'].auth2.init({
          client_id:
            '136990248878-ne0h4skpitopua95ldsjkpfo2up1slvo.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
          scope: 'profile',
        });
        this.prepareLoginButton();
      });
    };

    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = 'https://apis.google.com/js/platform.js?onload=googleSDKLoaded';
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'google-jssdk');
  }
}
