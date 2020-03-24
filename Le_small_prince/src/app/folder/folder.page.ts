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
  public firstco: boolean;
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

  ngOnChanges(){
    
  }

  async ngOnInit() {
    
    await this.storage.get('email').then((val) => this.email = val)
    await this.storage.get('password').then((val) => this.password = val)
    await this.storage.get('firstco').then((val) => {this.firstco = val })
    await this.storage.get('connecter').then((val) => this.verifconnection = val)
    await this.getData()
    if(this.firstco===null || this.firstco===undefined)
    {
       this.router.navigate(['slide'])
    }
   
    if(this.email=='' || this.email===null || this.email===undefined || this.verifconnection === null || this.verifconnection === false)
       {
          this.presentModal();
       }
  }

   async getVerif() {
    if(this.email!==null || this.email!==undefined)
    {
      return false
    }
    else
    {  
      return true
    }
  }

  async rafraichirListe(event) {
    this.getData()
    event.target.complete();
  }

 async opengalerie(){
  
    await this.storage.get('email').then((val) => this.user.email = val)
    await this.storage.get('password').then((val) => this.user.password = val)
    await this.getData()
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

  async openarticle(){
    await this.storage.get('email').then((val) => this.user.email = val)
    await this.storage.get('password').then((val) => this.user.password = val)
    await this.getData()
    this.user.email=this.email;
    this.user.password=this.password
    this.user.connection=this.verifconnection
    this.user.articles=this.dates
    let navigationExtras : NavigationExtras ={
      state : {
        user: this.user,
      }
    }
    this.router.navigate(['article'], navigationExtras );
  }


 async opendates(){
    await this.storage.get('email').then((val) => this.user.email = val)
    await this.storage.get('password').then((val) => this.user.password = val)
    await this.getData()
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

  async deconnection(){
    await this.storage.set('connecter', false)
    await this.storage.remove('email')
    await this.storage.remove('password')
    this.presentModal()
  }


  async getData()
  {
    await fetch('http://www.sebastien-thon.fr/cours/M4104Cip/projet/index.php?&login='+this.user.email+'&mdp='+this.user.password)
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
