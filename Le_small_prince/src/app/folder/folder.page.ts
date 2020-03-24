import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ConnexionPage } from '../connexion/connexion.page';
import { Storage } from '@ionic/storage';




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
  user ={
    password:'',
    email:'',
    connection: false,
    dates: [],
    articles: [],
    galeries: [],
  }

  constructor(public modalController: ModalController, private router: Router, private storage: Storage) { }

  
    async presentModal() {
    const modal = await this.modalController.create({
      component: ConnexionPage,
      cssClass: 'my-custom-modal-css',
    });

    modal.onDidDismiss().then((data) => {
      console.log(data);
      
     if(data['data'].dismissed==true)
     {
       this.storage.set('password', data['data'].password)
       this.storage.set('email', data['data'].email)
       this.storage.set('connecter', data['data'].checkbox)
       this.verifconnection=true
       this.getData()
     }
    })
    return await modal.present();
  }

  ngOnInit() {
    this.storage.get('email').then((val) => this.email = val)
    this.storage.get('password').then((val) => this.password = val)
    this.storage.get('firstco').then( data =>{
          if(data)
          {
            this.storage.get('connecter').then((val) => {if(val) {
              if(val == true){                
              }else {
                this.presentModal();
              }
            }})
          }
          else
          {
            this.router.navigate(['slide'])
          }
      })          
  }

   getVerif() {
    console.log(this.storage.get('connection').then((val) => {return val}));
    return this.storage.get('connection').then((val) => {return val})
  }


  async rafraichirListe(event) {
    this.getData()
    event.target.complete();
  }

  opengalerie(){
    this.storage.get('email').then((val) => this.user.email = val)
    this.storage.get('password').then((val) => this.user.password = val)
    this.user.connection=this.verifconnection
    this.user.dates=this.dates
    this.user.galeries=this.galeries
    let navigationExtras : NavigationExtras ={
      state : {
        user: this.user,
      }
    }
    this.router.navigate(['galerie'], navigationExtras );
  }

  opendates(){
    this.user.email=this.email;
    this.user.password=this.password
    this.user.connection=this.verifconnection
    this.user.dates=this.dates
    this.user.galeries=this.galeries
    let navigationExtras : NavigationExtras ={
      state : {
        user: this.user,
      }
    }
    this.router.navigate(['dates'], navigationExtras );
  }



  getData()
  {
    fetch('http://www.sebastien-thon.fr/cours/M4104Cip/projet/index.php?&login='+this.email+'&mdp='+this.password)
    .then(response => response.json())
    .then(data => {
        this.articles=data.articles
        this.galeries=data.galeries
        this.dates=data.dates
    }) 
    .catch(error => {
      console.log('Serveur non accessible')
    })
  }
}
