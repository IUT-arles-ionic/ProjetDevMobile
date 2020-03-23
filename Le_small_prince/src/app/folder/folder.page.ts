import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ModalController } from '@ionic/angular';
import { ConnexionPage } from '../connexion/connexion.page';
import { Input } from '@angular/core';




@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})


export class FolderPage implements OnInit {
  public folder: string;
  public email: string;
  public password: string;
  public articles: [];
  public galeries: [];
  public dates: [];
  public arraytemp : string;
  private verifconnection: boolean;

  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient,public modalController: ModalController) { }

  
    async presentModal() {
    const modal = await this.modalController.create({
      component: ConnexionPage,
      cssClass: 'my-custom-modal-css',
    });

    modal.onDidDismiss().then((data) => {
     if(data['data'].dismissed==true)
     {
      console.log(data)
       this.password=data['data'].password
       this.email=data['data'].email
       this.verifconnection=true
       this.getData()
     }
    })
    return await modal.present();
  }

  ngOnInit() { 
    this.presentModal()
  }

   getVerif()
  {
    return this.verifconnection
  }
  getData()
  {
    fetch('http://www.sebastien-thon.fr/cours/M4104Cip/projet/index.php?&login='+this.email+'&mdp='+this.password)
    .then(response => response.json())
    .then(data => {
      console.log(data)
        this.articles=data.articles
        this.galeries=data.galeries
        this.dates=data.dates
    }) 
    .catch(error => {
      console.log('Serveur non accessible')
    })
  }
}
