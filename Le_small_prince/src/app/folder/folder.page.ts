import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ConnexionPage } from '../connexion/connexion.page';




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

  constructor(public modalController: ModalController, private router: Router) { }

  
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
    if(false)
    {
     this.router.navigate(['slide'])
    }
    else{
      if(this.verifconnection==true)
    {

    }
    else
    {
      this.presentModal()
    }}
    
  }

   getVerif()
  {
    return this.verifconnection
  }


  async rafraichirListe(event){
    this.getData()
    event.target.complete();
  }

  opengalerie(){
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
    this.router.navigate(['galerie'], navigationExtras );
  }

  openarticle(){
    this.user.email=this.email;
    this.user.password=this.password
    this.user.connection=this.verifconnection
    this.user.dates=this.dates
    this.user.articles=this.articles
    let navigationExtras : NavigationExtras ={
      state : {
        user: this.user,
      }
    }
    this.router.navigate(['article'], navigationExtras );
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
