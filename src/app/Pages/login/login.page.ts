import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private fireauth: AngularFireAuth,
    private fb: Facebook,

  ) { }

  ngOnInit() {
  }


  signin() {
    this.fireauth.signInWithEmailAndPassword('mohammed@gmail.com','zakariadaoudi123' )
      .then(res => {
        if (res.user) {
          console.log(res.user);

        }
      })
      .catch(err => {
        console.log(`login failed ${err}`);
      });
  }

  signup() {
    this.fireauth
      .createUserWithEmailAndPassword('mohammed@gmail.com','zakariadaoudi123' )
      .then(res => {
        if (res.user) {
          console.log(res.user);
        }
      })
      .catch(err => {
        console.log(`login failed ${err}`);
      });
  }

  async loginWithFacebook(){
    this.fb.login(['email'])
      .then((response: FacebookLoginResponse) => {
        console.log(response.authResponse.accessToken);
      }).catch((error) => {
      console.log(error);
    });
  }


}
