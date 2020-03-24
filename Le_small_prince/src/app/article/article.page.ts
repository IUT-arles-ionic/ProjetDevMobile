import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute, NavigationExtras } from '@angular/router';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-article',
  templateUrl: './article.page.html',
  styleUrls: ['./article.page.scss'],
})
export class ArticlePage implements OnInit {

  data:any;
  article:[]
  email:''
  password:''
  theSate: []
  favoris: []
  articlefav:any;
  tempoverif:false


  constructor(private route: ActivatedRoute, private router: Router,private storage: Storage) { 
    this.route.queryParams.subscribe(params => {

        if(this.router.getCurrentNavigation().extras.state)
        {
          this.data=this.router.getCurrentNavigation().extras.state.user;
        }
      
    })
  }

  ngOnInit() {
     this.getData()
    this.storage.get('email').then((val) => {this.email = val })
    this.storage.get('password').then((val) => {this.password= val })
    this.email=this.data.email
    this.password=this.data.password
  }

  async rafraichirListe(event){
    this.getData()
    event.target.complete();
  }


  async stateChange(id,event)
  {
    var tempo
    await this.storage.get(id.titre).then((val) => {tempo = val })

    if(event==true)
    {
      if(tempo===null || tempo===undefined)
      {
        this.storage.set(id.titre, id)
      }
      else{

        await this.storage.remove(id.titre)
      }
    }
    else{
       if(tempo===null || tempo===undefined)
    {

       this.storage.remove(id.titre)
    }
    else{

      this.storage.set(id.titre, id)
    }
    }
  }
  
  getData()
  {
    fetch('http://www.sebastien-thon.fr/cours/M4104Cip/projet/index.php?&login='+this.email+'&mdp='+this.password)
    .then(response => response.json())
    .then(data => {
        this.article=data.article
    }) 
    .catch(error => {
      console.log('Serveur non accessible')
    })
  }

  async retour(){
    this.router.navigate(['folder']);
  }

}
