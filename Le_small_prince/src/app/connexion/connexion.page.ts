import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ModalController } from '@ionic/angular';
import { NavParams } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.page.html',
  styleUrls: ['./connexion.page.scss'],
})


export class ConnexionPage implements OnInit {
  public email: string;
  public password: string;
  public checkbox: boolean ;

  constructor(public toastController: ToastController,private activatedRoute: ActivatedRoute, private http: HttpClient, private modalCtrl: ModalController, private navParams: NavParams) { }

  ngOnInit() {
  }


  dismiss() {
 
    this.modalCtrl.dismiss({
      'dismissed': true,
      'email':this.email,
      'password':this.password,
      'checkbox': this.checkbox
    });
  }

  
  connexion()
  {
    fetch('http://www.sebastien-thon.fr/cours/M4104Cip/projet/index.php?connexion&login='+this.email+'&mdp='+this.password)
    .then(response => response.json())
    .then(data => { if(data.resultat=='OK')
      {
          this.dismiss()
      }
      else
      {
        this.presentToast()
      }
    }) 
    .catch(error => {
      return false
    })
  } 
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Identifiant de connection invalide',
      duration: 2000
    });
    toast.present();
  }
}
