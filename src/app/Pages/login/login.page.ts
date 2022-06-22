import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user;

  constructor(
    private fireauth: AngularFireAuth,
    public alertController: AlertController
  ) {



  }

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

  async loginWithGoogle(){
    this.fireauth.signInWithPopup(new firebase.auth.GoogleAuthProvider());

    this.fireauth.authState.subscribe((user) => {
      this.user = user ? user : null;
      console.log(this.user);
      console.log("uID" + this.user.uid);
      console.log(this.user.email);
      console.log(this.user.displayName)
      this.presentAlertMultipleButtons(this.user.displayName);
    });


  }

  async  presentAlertMultipleButtons(message) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'YOUR NAME',
      subHeader: 'Subtitle',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }


}
